// AI Career Coach - Resume API Routes
const express = require("express");
const router = express.Router();
const resumeController = require("../controllers/resumeController");

let uploadMiddleware = (req, res, next) => next();

try {
    const multer = require("multer");
    const storage = multer.memoryStorage();
    const upload = multer({
        storage: storage,
        limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
    });
    uploadMiddleware = upload.single("file");
} catch (e) {
    console.warn("[Resume Router] Multer optional upload middleware fallback active.");
}

// POST /api/resume/analyze (Accepts JSON body or Multipart file upload)
router.post("/analyze", uploadMiddleware, resumeController.analyzeResume);

// Alias POST /api/resume/parse
router.post("/parse", uploadMiddleware, resumeController.analyzeResume);

module.exports = router;
