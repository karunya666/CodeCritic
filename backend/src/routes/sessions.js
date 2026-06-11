const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth");
const Session = require("../models/Session");

// Public route — no auth required
router.get("/public/:id", async (req, res, next) => {
  try {
    const session = await Session.findById(req.params.id)
    if (!session) {
      return res.status(404).json({ error: "Session not found" })
    }
    res.json(session)
  } catch (error) {
    next(error)
  }
})

// Get all sessions for logged in user
router.get("/", requireAuth, async (req, res, next) => {
  try {
    const sessions = await Session.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .select("_id title language createdAt");

    res.json(sessions);
  } catch (error) {
    next(error);
  }
});

// Get single session by id
router.get("/:id", requireAuth, async (req, res, next) => {
  try {
    const session = await Session.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    res.json(session);
  } catch (error) {
    next(error);
  }
});

// Delete session by id
router.delete("/:id", requireAuth, async (req, res, next) => {
  try {
    const session = await Session.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    res.json({ message: "Session deleted successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;