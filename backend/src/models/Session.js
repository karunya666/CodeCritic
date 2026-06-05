const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    title: {
      type: String,
      default: "Untitled Review",
    },
    language: {
      type: String,
      default: "javascript",
    },
    code: {
      type: String,
      required: true,
    },
    review: {
      errors: [
        {
          line: Number,
          message: String,
          severity: {
            type: String,
            enum: ["error", "warning"],
          },
        },
      ],
      improvements: [
        {
          message: String,
          category: {
            type: String,
            enum: ["performance", "readability", "security", "best-practice"],
          },
        },
      ],
      timeComplexity: String,
      spaceComplexity: String,
      explanation: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Session", sessionSchema);