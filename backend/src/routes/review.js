const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth");
const { reviewCode } = require("../services/claudeService");
const Session = require("../models/Session");

router.post("/", requireAuth, async (req, res, next) => {
  try {
    const { code } = req.body;

    if (!code || code.trim() === "") {
      return res.status(400).json({ error: "Code is required" });
    }

    // Get AI review
    const review = await reviewCode(code);

    // Save session to DB
    const session = await Session.create({
      userId: req.userId,
      title: review.title || "Untitled Review",
      language: review.language || "unknown",
      code,
      review: {
        errors: review.errors || [],
        improvements: review.improvements || [],
        timeComplexity: review.timeComplexity || "",
        spaceComplexity: review.spaceComplexity || "",
        explanation: review.explanation || "",
      },
    });

    res.status(201).json({
      sessionId: session._id,
      title: session.title,
      language: session.language,
      review: session.review,
      createdAt: session.createdAt,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;