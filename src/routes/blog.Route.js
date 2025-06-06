import express from "express";
import Blog from "../models/blog.Model.js";
import Highlight from "../models/highlight.Model.js";
import Sponser from "../models/sponser.Model.js";

import { fetchYouTubeStats } from "../service/YoutubeService.js";

const router = express.Router();

// Helper function for handling errors
const handleErrorResponse = (res, error, defaultMessage, statusCode = 500) => {
  console.error(error);
  res.status(statusCode).json({
    success: false,
    error: error.message || defaultMessage,
  });
};

// Get all blog posts
router.get("/blogs", async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    if (!blogs || blogs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No blog posts found",
      });
    }
    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    handleErrorResponse(res, error, "Failed to fetch blog posts");
  }
});

// Get a single blog post by ID
router.get("/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        error: `Blog not found with id ${req.params.id}`,
      });
    }
    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    handleErrorResponse(res, error, "Failed to fetch blog post");
  }
}); 

// Get all sponsors
router.get("/sponsors", async (req, res) => {
  try {
    const sponsors = await Sponser.findAll();
    if (!sponsors || sponsors.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No sponsors found",
      });
    }
    res.status(200).json({
      success: true,
      count: sponsors.length,
      data: sponsors,
    });
  } catch (error) {
    handleErrorResponse(res, error, "Failed to fetch sponsors");
  }
});

// Middleware to refresh YouTube data if needed
router.use(async (req, res, next) => {
  if (req.method === "GET" && req.query.refresh === "true") {
    try {
      const highlights = await Highlight.findAll();
      await Promise.all(
        highlights.map((h) =>
          h.videoUrl ? h.refreshYouTubeData() : Promise.resolve()
        )
      );
    } catch (error) {
      console.error("Failed to refresh YouTube data:", error);
    }
  }
  next();
});

// Get all highlights
router.get("/highlights", async (req, res) => {
  try {
    const highlights = await Highlight.findAll();
    res.status(200).json({
      success: true,
      count: highlights.length,
      data: highlights,
    });
  } catch (error) {
    console.error(error);
    handleErrorResponse(res, error, "Failed to fetch Highlights post");
  }
});

// Get single highlight with optional refresh
router.get("/highlights/:id", async (req, res) => {
  try {
    const highlight = await Highlight.findByPk(req.params.id);
    if (!highlight) {
      return res.status(404).json({
        success: false,
        message: `Highlight not found with id ${req.params.id}`,
      });
    }

    if (req.query.refresh === "true" && highlight.videoUrl) {
      await highlight.refreshYouTubeData();
    }

    res.status(200).json({
      success: true,
      data: highlight,
    });
  } catch (error) {
    console.error(error);
    handleErrorResponse(res, error, "Failed to fetch specific Highlights post");
  }
});

export default router;
