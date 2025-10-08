const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  addResource,
  updateResource,
  deleteResource,
  getResources,
} = require("../controllers/resourceController");
const { protect } = require("../middlewares/auth");

// ------------------------
// Multer setup for memory storage (before Cloudinary upload)
// ------------------------
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ------------------------
// Routes
// ------------------------

// GET all resources (protected)
router.get("/", protect, getResources);

// POST add a new resource for a specific topic
// Upload PDFs using 'pdfs' field
router.post("/:topicId", protect, upload.array("pdfs"), addResource);

// PUT update resource
router.put("/:resourceId", protect, upload.array("pdfs"), updateResource);

// DELETE resource
router.delete("/:resourceId", protect, deleteResource);

module.exports = router;
