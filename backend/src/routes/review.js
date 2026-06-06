const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth");
const { reviewCode, optimiseCode, detectLanguage } = require("../services/claudeService");
const Session = require("../models/Session");

// Analyse
router.post("/", requireAuth, async (req, res, next) => {
  try {
    const { code } = req.body;
    if (!code || code.trim() === "") {
      return res.status(400).json({ error: "Code is required" });
    }
    const review = await reviewCode(code);
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

// Detect language
router.post("/detect", requireAuth, async (req, res, next) => {
  try {
    const { code } = req.body;
    if (!code || code.trim() === "") return res.status(400).json({ language: 'plaintext' });
    const language = await detectLanguage(code);
    res.json({ language });
  } catch (error) {
    next(error);
  }
});

// Optimise
router.post("/optimise", requireAuth, async (req, res, next) => {
  try {
    const { code } = req.body;
    if (!code || code.trim() === "") {
      return res.status(400).json({ error: "Code is required" });
    }
    const optimisedCode = await optimiseCode(code);
    res.status(200).json({ optimisedCode });
  } catch (error) {
    next(error);
  }
});

// Update existing session
router.patch("/:id", requireAuth, async (req, res, next) => {
  try {
    const { code } = req.body;
    const review = await reviewCode(code);
    const session = await Session.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      {
        code,
        title: review.title,
        language: review.language,
        review: {
          errors: review.errors || [],
          improvements: review.improvements || [],
          timeComplexity: review.timeComplexity || "",
          spaceComplexity: review.spaceComplexity || "",
          explanation: review.explanation || "",
        }
      },
      { new: true }
    );
    if (!session) return res.status(404).json({ error: "Session not found" });
    res.json({
      sessionId: session._id,
      title: session.title,
      language: session.language,
      review: session.review,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;