// src/middlewares/uploadCloud.js
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Function to sanitize filenames for Cloudinary
const sanitizeFilename = (filename) => {
  return filename
    .replace(/\s+/g, "_")        // Replace spaces with underscores
    .replace(/[^a-zA-Z0-9-_\.]/g, ""); // Remove special characters except -, _, .
};

// Multer storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "studybox_pdfs",      // Cloudinary folder
    resource_type: "raw",         // raw = for PDFs, docs, etc.
    format: async () => "pdf",    // Force PDF format
    public_id: (req, file) => {
      const safeName = sanitizeFilename(file.originalname);
      return `${Date.now()}-${safeName}`;
    },
  },
});

const upload = multer({ storage });

module.exports = upload;
