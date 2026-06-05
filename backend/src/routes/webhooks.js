const express = require("express");
const router = express.Router();
const { Webhook } = require("svix");
const User = require("../models/User");

router.post("/clerk", async (req, res, next) => {
  try {
    const secret = process.env.CLERK_WEBHOOK_SECRET;

    if (!secret) {
      return res.status(500).json({ error: "Webhook secret not configured" });
    }

    // Verify webhook signature
    const wh = new Webhook(secret);
    const payload = wh.verify(req.body, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { type, data } = payload;

    if (type === "user.created") {
      await User.create({
        clerkId: data.id,
        email: data.email_addresses[0]?.email_address,
        firstName: data.first_name,
        lastName: data.last_name,
        imageUrl: data.image_url,
      });
    }

    if (type === "user.updated") {
      await User.findOneAndUpdate(
        { clerkId: data.id },
        {
          email: data.email_addresses[0]?.email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          imageUrl: data.image_url,
        }
      );
    }

    if (type === "user.deleted") {
      await User.findOneAndDelete({ clerkId: data.id });
    }

    res.json({ received: true });
  } catch (error) {
    next(error);
  }
});

module.exports = router;