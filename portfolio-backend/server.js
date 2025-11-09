// server.js - Node.js Express Server with MongoDB
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection String
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio_db";

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Portfolio Schema
const portfolioSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    phone: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    summary: {
      type: String,
      trim: true,
    },
    skills: {
      type: String,
      trim: true,
    },
    experience: {
      type: String,
      trim: true,
    },
    education: {
      type: String,
      trim: true,
    },
    linkedin: {
      type: String,
      trim: true,
    },
    github: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Portfolio Model
const Portfolio = mongoose.model("Portfolio", portfolioSchema);

// ==================== API ROUTES ====================

// Welcome Route
app.get("/", (req, res) => {
  res.json({
    message: "🎯 Welcome to Digital Portfolio & Resume Builder API",
    version: "1.0.0",
    endpoints: {
      "GET /api/portfolios": "Fetch all portfolios",
      "GET /api/portfolios/:id": "Fetch single portfolio",
      "POST /api/portfolios": "Create new portfolio",
      "PUT /api/portfolios/:id": "Update portfolio",
      "DELETE /api/portfolios/:id": "Delete portfolio",
      "GET /api/stats": "Get database statistics",
    },
  });
});

// CREATE - Insert new portfolio
app.post("/api/portfolios", async (req, res) => {
  try {
    const portfolio = new Portfolio(req.body);
    const savedPortfolio = await portfolio.save();

    res.status(201).json({
      success: true,
      message: "✅ Portfolio created successfully",
      data: savedPortfolio,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "❌ Error creating portfolio",
      error: error.message,
    });
  }
});

// READ - Fetch all portfolios
app.get("/api/portfolios", async (req, res) => {
  try {
    const portfolios = await Portfolio.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: portfolios.length,
      data: portfolios,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "❌ Error fetching portfolios",
      error: error.message,
    });
  }
});

// READ - Fetch single portfolio by ID
app.get("/api/portfolios/:id", async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "❌ Portfolio not found",
      });
    }

    res.status(200).json({
      success: true,
      data: portfolio,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "❌ Error fetching portfolio",
      error: error.message,
    });
  }
});

// UPDATE - Update portfolio by ID
app.put("/api/portfolios/:id", async (req, res) => {
  try {
    const portfolio = await Portfolio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "❌ Portfolio not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "✅ Portfolio updated successfully",
      data: portfolio,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "❌ Error updating portfolio",
      error: error.message,
    });
  }
});

// DELETE - Delete portfolio by ID
app.delete("/api/portfolios/:id", async (req, res) => {
  try {
    const portfolio = await Portfolio.findByIdAndDelete(req.params.id);

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "❌ Portfolio not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "🗑️ Portfolio deleted successfully",
      data: portfolio,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "❌ Error deleting portfolio",
      error: error.message,
    });
  }
});

// STATS - Get database statistics
app.get("/api/stats", async (req, res) => {
  try {
    const totalPortfolios = await Portfolio.countDocuments();
    const recentPortfolios = await Portfolio.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("fullName title createdAt");

    const uniqueTitles = await Portfolio.distinct("title");

    res.status(200).json({
      success: true,
      stats: {
        totalPortfolios,
        uniqueTitles: uniqueTitles.length,
        recentPortfolios,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "❌ Error fetching stats",
      error: error.message,
    });
  }
});

// Search portfolios by name or title
app.get("/api/portfolios/search/:query", async (req, res) => {
  try {
    const searchQuery = req.params.query;
    const portfolios = await Portfolio.find({
      $or: [
        { fullName: { $regex: searchQuery, $options: "i" } },
        { title: { $regex: searchQuery, $options: "i" } },
      ],
    });

    res.status(200).json({
      success: true,
      count: portfolios.length,
      data: portfolios,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "❌ Error searching portfolios",
      error: error.message,
    });
  }
});

// 404 Handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "❌ Route not found",
  });
});

// Error Handler Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "❌ Internal server error",
    error: err.message,
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`
  ╔════════════════════════════════════════════════════════╗
  ║  🚀 Server is running on http://localhost:${PORT}     ║
  ║  📊 MongoDB Database: portfolio_db                     ║
  ║  🎯 API Endpoints: http://localhost:${PORT}/api       ║
  ╚════════════════════════════════════════════════════════╝
  `);
});
