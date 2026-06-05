const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet());
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Important: webhooks need raw body, so register before express.json()
app.use(
  "/api/webhooks",
  express.raw({ type: "application/json" }),
  require("./routes/webhooks")
);

// JSON body parser for all other routes
app.use(express.json());

// Routes
app.use("/api/review", require("./routes/review"));
app.use("/api/sessions", require("./routes/sessions"));

// Health check
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "CodeLens API running" });
});

// Error handler (always last)
app.use(require("./middleware/errorHandler"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});