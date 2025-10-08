const asyncHandler = require("express-async-handler");
const Resource = require("../models/Resource");
const Topic = require("../models/Topic");
const { errorResponse, successResponse } = require("../utils/apiResponse");

// ------------------------
// Helper: Sanitize filenames for Cloudinary
// ------------------------
const sanitizeFilename = (name) => name.replace(/[^\w.-]/g, "_");

// ------------------------
// Add Resource
// ------------------------
const addResource = asyncHandler(async (req, res) => {
  const topic = await Topic.findById(req.params.topicId);
  if (!topic) return errorResponse(res, "Topic not found", 404);

  let pdfs = [];

  // 1️⃣ PDFs uploaded via multer
  if (req.files?.length) {
    const uploadedPdfs = req.files.map((file) => ({
      url: file.path, // multer-storage-cloudinary provides `path` as secure_url
      filename: file.originalname,
    }));
    pdfs.push(...uploadedPdfs);
  }

  // 2️⃣ PDF URLs sent by frontend
  if (req.body.pdfUrls) {
    const urls = Array.isArray(req.body.pdfUrls)
      ? req.body.pdfUrls
      : JSON.parse(req.body.pdfUrls);
    const urlPdfs = urls.map((url) => ({
      url,
      filename: url.split("/").pop(),
    }));
    pdfs.push(...urlPdfs);
  }

  // 3️⃣ YouTube Links
  let youtubeLinks = [];
  if (req.body.youtubeLinks) {
    try {
      youtubeLinks = Array.isArray(req.body.youtubeLinks)
        ? req.body.youtubeLinks
        : JSON.parse(req.body.youtubeLinks);
      if (!Array.isArray(youtubeLinks)) throw new Error();
    } catch {
      return errorResponse(res, "Invalid youtubeLinks format", 400);
    }
  }

  const resource = await Resource.create({
    ...req.body,
    topic: topic._id,
    unit: req.body.unitId || topic.unit || null,
    branch: topic.branch,
    semester: topic.semester,
    subject: topic.subject,
    pdfs,
    youtubeLinks,
    addedBy: req.user._id,
  });

  successResponse(res, resource, "Resource added successfully");
});

// ------------------------
// Update Resource
// ------------------------
const updateResource = asyncHandler(async (req, res) => {
  const resource = await Resource.findById(req.params.resourceId);
  if (!resource) return errorResponse(res, "Resource not found", 404);

  let pdfs = [];

  // 1️⃣ Keep existing PDFs if provided
  if (req.body.existingPDFs) {
    pdfs = Array.isArray(req.body.existingPDFs)
      ? req.body.existingPDFs
      : JSON.parse(req.body.existingPDFs);
  }

  // 2️⃣ Add newly uploaded PDFs
  if (req.files?.length) {
    const uploadedPdfs = req.files.map((file) => ({
      url: file.path,
      filename: file.originalname,
    }));
    pdfs.push(...uploadedPdfs);
  }

  // 3️⃣ Add new PDF URLs
  if (req.body.pdfUrls) {
    const urls = Array.isArray(req.body.pdfUrls)
      ? req.body.pdfUrls
      : JSON.parse(req.body.pdfUrls);
    const urlPdfs = urls.map((url) => ({
      url,
      filename: url.split("/").pop(),
    }));
    pdfs.push(...urlPdfs);
  }

  // 4️⃣ Parse YouTube links
  let youtubeLinks = [];
  if (req.body.youtubeLinks) {
    try {
      youtubeLinks = Array.isArray(req.body.youtubeLinks)
        ? req.body.youtubeLinks
        : JSON.parse(req.body.youtubeLinks);
      if (!Array.isArray(youtubeLinks)) throw new Error();
    } catch {
      return errorResponse(res, "Invalid youtubeLinks format", 400);
    }
  }

  // 5️⃣ Update other fields
  resource.title = req.body.title || resource.title;
  resource.summary = req.body.summary || resource.summary;
  resource.pdfs = pdfs;
  resource.youtubeLinks = youtubeLinks;

  await resource.save();
  successResponse(res, resource, "Resource updated successfully");
});

// ------------------------
// Delete Resource
// ------------------------
const deleteResource = asyncHandler(async (req, res) => {
  const resource = await Resource.findById(req.params.resourceId);
  if (!resource) return errorResponse(res, "Resource not found", 404);

  await resource.remove();
  successResponse(res, {}, "Resource deleted successfully");
});

// ------------------------
// Get All Resources
// ------------------------
const getResources = asyncHandler(async (req, res) => {
  const resources = await Resource.find()
    .populate("branch year semester subject topic unit addedBy")
    .sort({ createdAt: -1 });

  successResponse(res, resources, "Resources fetched successfully");
});

// ------------------------
// Export
// ------------------------
module.exports = {
  addResource,
  updateResource,
  deleteResource,
  getResources,
};
