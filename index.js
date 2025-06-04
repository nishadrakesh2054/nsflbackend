import dotenv from "dotenv";
dotenv.config();
import "@babel/register";

// Core dependencies
import express from "express";
import cors from "cors";
import * as url from "url";
import path from "path";
import os from "os";
import fs from "fs";
import rateLimit from "express-rate-limit";
// import morgan from "morgan";
import session from "express-session";

// Application dependencies

import adminRouter from "./src/resources/app.js";
import sequelize from "./src/db/index.js";
import Match from "./src/routes/fixture.Route.js";
import Contact from "./src/routes/contact.Route.js";
import News from "./src/routes/blog.Route.js";
import Table from "./src/routes/table.Route.js";
import LiveStreaming from "./src/routes/LiveVideo.Route.js";

// Initialize express app
const app = express();
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

// ===== Configuration =====
// Environment setup
os.tmpdir = () => "D:\\temp";
const tempDir = "D:\\temp";
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// CORS configuration
const allowedOrigins = [
  "*",
  "http://localhost:3000",
  "http://localhost:5173",
  "https://nsflbackend.onrender.com",
  " https://nsfl-fullstack.vercel.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

// Rate limiting configuration
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes.",
});

// ===== Middleware Setup =====
// Security and logging middleware
// app.use(morgan("dev"));
app.use(cors(corsOptions));

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// Static file serving
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
app.use("/css", express.static(path.join(__dirname, "public/css")));
// ===== Routes Setup =====
// Admin routes (before body-parser)
app.use("/admin", adminRouter);

// Body parsing middleware (after AdminJS)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes with rate limiting
app.use("/api/", apiLimiter);
app.use("/api", Contact);
app.use("/api", News);
app.use("/api", Match);
app.use("/api", Table);
// app.use("/api", Match);
app.use("/api", LiveStreaming);

// Health check endpoint
app.get("/api/test", (req, res) => {
  res.send("API is working");
});

// ===== Server Initialization =====
const port = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Initialize database
    await sequelize.sync({ force: false });

    // Start server
    const server = app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

    // Handle server errors
    server.on("error", (error) => {
      console.error("Server error:", error);
      process.exit(1);
    });

    // Handle process termination
    process.on("SIGTERM", () => {
      console.log("SIGTERM received. Shutting down gracefully");
      server.close(() => {
        console.log("Process terminated");
      });
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
};

// Start the server
startServer();
