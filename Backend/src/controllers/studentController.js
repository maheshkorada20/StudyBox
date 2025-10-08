// // src/controllers/studentController.js
// const Branch = require("../models/Branch");
// const Year = require("../models/Year");
// const Semester = require("../models/Semester");
// const Subject = require("../models/Subject");
// const Unit = require("../models/Unit");
// const Topic = require("../models/Topic");
// const Resource = require("../models/Resource");
// const Feedback = require("../models/Feedback");
// const asyncHandler = require("../utils/asyncHandler");
// const { successResponse, errorResponse } = require("../utils/apiResponse");

// // ------------------------
// // Browse branches
// // GET /api/student/branches
// // ------------------------
// exports.getBranches = asyncHandler(async (req, res) => {
// const branches = await Branch.find();
// return successResponse(res, branches, "Branches fetched successfully");
// });

// // ------------------------
// // Get years of a branch
// // GET /api/student/years/:branchId
// // ------------------------
// exports.getYears = asyncHandler(async (req, res) => {
// const { branchId } = req.params;
// const years = await Year.find({ branch: branchId });
// return successResponse(res, years, "Years fetched successfully");
// });

// // ------------------------
// // Get semesters of a year
// // GET /api/student/semesters/:yearId
// // ------------------------
// exports.getSemesters = asyncHandler(async (req, res) => {
// const { yearId } = req.params;
// const semesters = await Semester.find({ year: yearId });
// return successResponse(res, semesters, "Semesters fetched successfully");
// });

// // ------------------------
// // Get subjects of a semester
// // GET /api/student/subjects/:semesterId
// // ------------------------
// exports.getSubjects = asyncHandler(async (req, res) => {
// const { semesterId } = req.params;
// const subjects = await Subject.find({ semester: semesterId });
// return successResponse(res, subjects, "Subjects fetched successfully");
// });

// // ------------------------
// // Get units of a subject
// // GET /api/student/units/:subjectId
// // ------------------------
// exports.getUnits = asyncHandler(async (req, res) => {
// const { subjectId } = req.params;
// const units = await Unit.find({ subject: subjectId });
// return successResponse(res, units, "Units fetched successfully");
// });

// // // ------------------------
// // // Get topics of a unit
// // // GET /api/student/topics/:unitId
// // // ------------------------
// // exports.getTopics = asyncHandler(async (req, res) => {
// // const { unitId } = req.params;
// // const topics = await Topic.find({ unit: unitId });
// // return successResponse(res, topics, "Topics fetched successfully");
// // });


// // ------------------------
// // Get topics of a subject
// // GET /api/student/topics/subject/:subjectId
// // ------------------------
// exports.getTopicsBySubject = asyncHandler(async (req, res) => {
//   const { subjectId } = req.params;
//   const topics = await Topic.find({ subject: subjectId });
//   return successResponse(res, topics, "Topics fetched successfully by subject");
// });


// // ------------------------
// // Get resources of a topic
// // GET /api/student/resources/:topicId
// // ------------------------
// exports.getResources = asyncHandler(async (req, res) => {
// const { topicId } = req.params;
// const resources = await Resource.find({ topic: topicId });
// return successResponse(res, resources, "Resources fetched successfully");
// });

// // ------------------------
// // Search resources by keyword
// // GET /api/student/resources/search?q=keyword
// // ------------------------
// exports.searchResources = asyncHandler(async (req, res) => {
// const { q } = req.query;
// if (!q) return errorResponse(res, "Query is required", 400);

// const resources = await Resource.find({
// $or: [
// { title: { $regex: q, $options: "i" } },
// { tags: { $regex: q, $options: "i" } },
// { summary: { $regex: q, $options: "i" } },
// ],
// });

// return successResponse(res, resources, "Search results fetched successfully");
// });

// // ------------------------
// // Add feedback for a resource
// // POST /api/student/feedback/:resourceId
// // ------------------------
// exports.addFeedback = asyncHandler(async (req, res) => {
// const { resourceId } = req.params;
// const { rating, comment } = req.body;

// const resource = await Resource.findById(resourceId);
// if (!resource) return errorResponse(res, "Resource not found", 404);

// const feedback = await Feedback.create({
// resource: resourceId,
// user: req.user._id,
// rating,
// comment,
// });

// return successResponse(res, feedback, "Feedback added successfully");
// });

// // ------------------------
// // Get feedbacks of a resource
// // GET /api/student/feedback/:resourceId
// // ------------------------
// exports.getFeedbacks = asyncHandler(async (req, res) => {
// const { resourceId } = req.params;
// const feedbacks = await Feedback.find({ resource: resourceId }).populate(
// "user",
// "firstName lastName"
// );
// return successResponse(res, feedbacks, "Feedbacks fetched successfully");
// });

// // ------------------------
// // Like a resource
// // POST /api/student/resource/:id/like
// // ------------------------
// exports.likeResource = asyncHandler(async (req, res) => {
// const resource = await Resource.findById(req.params.id);
// if (!resource) return errorResponse(res, "Resource not found", 404);

// resource.likes += 1;
// await resource.save();
// return successResponse(res, { likes: resource.likes }, "Resource liked");
// });

// // ------------------------
// // Rate a resource
// // POST /api/student/resource/:id/rate
// // ------------------------
// exports.rateResource = asyncHandler(async (req, res) => {
// const { rating } = req.body;
// if (!rating || rating < 1 || rating > 5)
// return errorResponse(res, "Rating must be between 1 and 5", 400);

// const resource = await Resource.findById(req.params.id);
// if (!resource) return errorResponse(res, "Resource not found", 404);

// // Simple average calculation
// resource.rating = (resource.rating + rating) / 2;
// await resource.save();

// return successResponse(res, { rating: resource.rating }, "Resource rated successfully");
// });

// // ------------------------
// // Increment view count
// // POST /api/student/resource/:id/view
// // ------------------------
// exports.incrementView = asyncHandler(async (req, res) => {
// const resource = await Resource.findById(req.params.id);
// if (!resource) return errorResponse(res, "Resource not found", 404);

// resource.views += 1;
// await resource.save();
// return successResponse(res, { views: resource.views }, "View incremented");
// });

const Branch = require("../models/Branch");
const Year = require("../models/Year");
const Semester = require("../models/Semester");
const Subject = require("../models/Subject");
const Unit = require("../models/Unit");
const Topic = require("../models/Topic");
const Resource = require("../models/Resource");
const Feedback = require("../models/Feedback");
const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const { successResponse, errorResponse } = require("../utils/apiResponse");

// ------------------------
// Branch/Year/Semester/Subject/Unit/Topic
// ------------------------
const getBranches = asyncHandler(async (req, res) => {
  const branches = await Branch.find();
  return successResponse(res, branches, "Branches fetched successfully");
});

const getYears = asyncHandler(async (req, res) => {
  const { branchId } = req.params;
  if (!branchId) return errorResponse(res, "Branch ID is required", 400);
  const years = await Year.find({ branch: branchId });
  return successResponse(res, years, "Years fetched successfully");
});

const getSemesters = asyncHandler(async (req, res) => {
  const { yearId } = req.params;
  if (!yearId) return errorResponse(res, "Year ID is required", 400);
  const semesters = await Semester.find({ year: yearId });
  return successResponse(res, semesters, "Semesters fetched successfully");
});

const getSubjects = asyncHandler(async (req, res) => {
  const { semesterId } = req.params;
  if (!semesterId) return errorResponse(res, "Semester ID is required", 400);
  const subjects = await Subject.find({ semester: semesterId });
  return successResponse(res, subjects, "Subjects fetched successfully");
});

const getUnits = asyncHandler(async (req, res) => {
  const { subjectId } = req.params;
  if (!subjectId) return errorResponse(res, "Subject ID is required", 400);
  const units = await Unit.find({ subject: subjectId });
  return successResponse(res, units, "Units fetched successfully");
});

const getTopicsBySubject = asyncHandler(async (req, res) => {
  const { subjectId } = req.params;
  if (!subjectId) return errorResponse(res, "Subject ID is required", 400);
  const topics = await Topic.find({ subject: subjectId });
  return successResponse(res, topics, "Topics fetched successfully by subject");
});

const getTopicsByUnit = asyncHandler(async (req, res) => {
  const { unitId } = req.params;
  if (!unitId) return errorResponse(res, "Unit ID is required", 400);
  const topics = await Topic.find({ unit: unitId });
  return successResponse(res, topics, "Topics fetched successfully by unit");
});

// ------------------------
// Resources
// ------------------------
const getResourcesByTopic = asyncHandler(async (req, res) => {
  const { topicId } = req.params;
  if (!topicId) return errorResponse(res, "Topic ID is required", 400);

  const resources = await Resource.find({ topic: topicId }).sort({ createdAt: -1 });

  const resourcesWithPDFs = resources.map((resource) => {
    const r = resource.toObject();

    // Merge Cloudinary PDFs
    const cloudPDFs = (r.pdfs || []).map((pdf) => ({
      filename: pdf.filename,
      url: pdf.url,
    }));

    // Merge external PDF URLs
    const externalPDFs = (r.pdfUrls || []).map((url, idx) => ({
      filename: `PDF ${idx + 1}`,
      url,
    }));

    r.pdfs = [...cloudPDFs, ...externalPDFs];

    // Include other resource URLs (YouTube, Drive, etc.)
    if (r.resourceUrls?.length > 0) {
      r.resourceUrls = r.resourceUrls.map((url) => url);
    }

    return r;
  });

  return successResponse(res, resourcesWithPDFs, "Resources fetched successfully");
});

const getResourceById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const resource = await Resource.findById(id);
  if (!resource) return errorResponse(res, "Resource not found", 404);

  const resourceObj = resource.toObject();

  // Assign first YouTube link if videoUrl is missing
  if (!resourceObj.videoUrl && resourceObj.youtubeLinks?.length > 0) {
    resourceObj.videoUrl = resourceObj.youtubeLinks[0].url;
  }

  // Merge Cloudinary PDFs
  const cloudPDFs = (resourceObj.pdfs || []).map((pdf) => ({
    filename: pdf.filename,
    url: pdf.url,
  }));

  // Merge external PDF URLs
  const externalPDFs = (resourceObj.pdfUrls || []).map((url, idx) => ({
    filename: `PDF ${idx + 1}`,
    url,
  }));

  resourceObj.pdfs = [...cloudPDFs, ...externalPDFs];

  // Include generic resource URLs
  if (resourceObj.resourceUrls?.length > 0) {
    resourceObj.resourceUrls = resourceObj.resourceUrls.map((url) => url);
  }

  return successResponse(res, resourceObj, "Resource fetched successfully");
});


// ------------------------
// Search Resources
// ------------------------
const searchResources = asyncHandler(async (req, res) => {
  const query = req.query.q;
  if (!query || query.trim() === "") return successResponse(res, [], "Query missing");

  const results = await Resource.find({
    $or: [
      { title: { $regex: query, $options: "i" } },
      { summary: { $regex: query, $options: "i" } },
      { tags: { $regex: query, $options: "i" } },
    ],
  }).populate({
    path: "topic",
    populate: { path: "subject", select: "name" }
  });

  return successResponse(res, results, "Search results fetched successfully");
});

// ------------------------
// Dashboard features
// ------------------------
const getRecentResources = asyncHandler(async (req, res) => {
  const resources = await Resource.find().sort({ createdAt: -1 }).limit(10);
  return successResponse(res, resources, "Recent resources fetched");
});

const getRecentlyViewed = asyncHandler(async (req, res) => {
  const resources = await Resource.find({ "viewsBy.user": req.user._id })
    .sort({ "viewsBy.viewedAt": -1 })
    .limit(10);
  return successResponse(res, resources, "Recently viewed resources fetched");
});

const getFavorites = asyncHandler(async (req, res) => {
  const resources = await Resource.find({ "favorites.user": req.user._id })
    .sort({ "favorites.addedAt": -1 });
  return successResponse(res, resources, "Favorite resources fetched");
});

const toggleFavorite = asyncHandler(async (req, res) => {
  const resource = await Resource.findById(req.params.id);
  if (!resource) return errorResponse(res, "Resource not found", 404);

  const existing = resource.favorites.find(fav => fav.user.toString() === req.user._id.toString());
  if (existing) {
    resource.favorites = resource.favorites.filter(fav => fav.user.toString() !== req.user._id.toString());
  } else {
    resource.favorites.push({ user: req.user._id, addedAt: new Date() });
  }
  await resource.save();
  return successResponse(res, resource.favorites, "Favorites updated");
});

// ------------------------
// Feedback
// ------------------------
const addFeedback = asyncHandler(async (req, res) => {
  const { resourceId } = req.params;
  const { rating, comment } = req.body;

  if (!rating || rating < 1 || rating > 5) return errorResponse(res, "Rating must be 1-5", 400);

  const resource = await Resource.findById(resourceId);
  if (!resource) return errorResponse(res, "Resource not found", 404);

  const feedback = await Feedback.create({
    resource: resourceId,
    user: req.user._id,
    rating,
    comment,
  });

  return successResponse(res, feedback, "Feedback added successfully");
});

const getFeedbacks = asyncHandler(async (req, res) => {
  const { resourceId } = req.params;
  const feedbacks = await Feedback.find({ resource: resourceId }).populate("user", "firstName lastName");
  return successResponse(res, feedbacks, "Feedbacks fetched successfully");
});

// ------------------------
// Resource interactions
// ------------------------
const likeResource = asyncHandler(async (req, res) => {
  const resource = await Resource.findById(req.params.id);
  if (!resource) return errorResponse(res, "Resource not found", 404);

  resource.likes = (resource.likes || 0) + 1;
  await resource.save();
  return successResponse(res, { likes: resource.likes }, "Resource liked");
});

const rateResource = asyncHandler(async (req, res) => {
  const { rating } = req.body;
  if (!rating || rating < 1 || rating > 5) return errorResponse(res, "Rating must be 1-5", 400);

  const resource = await Resource.findById(req.params.id);
  if (!resource) return errorResponse(res, "Resource not found", 404);

  resource.rating = resource.rating ? (resource.rating + rating) / 2 : rating;
  await resource.save();
  return successResponse(res, { rating: resource.rating }, "Resource rated successfully");
});

const incrementView = asyncHandler(async (req, res) => {
  const resource = await Resource.findById(req.params.id);
  if (!resource) return errorResponse(res, "Resource not found", 404);

  resource.views = (resource.views || 0) + 1;

  // Update viewsBy array
  resource.viewsBy = resource.viewsBy.filter(v => v.user.toString() !== req.user._id.toString());
  resource.viewsBy.unshift({ user: req.user._id, viewedAt: new Date() });

  await resource.save();

  return successResponse(res, { views: resource.views }, "View incremented");
});

module.exports = {
  getBranches,
  getYears,
  getSemesters,
  getSubjects,
  getUnits,
  getTopicsBySubject,
  getTopicsByUnit,
  getResourcesByTopic,
  getResourceById,
  searchResources,
  getRecentResources,
  getRecentlyViewed,
  getFavorites,
  toggleFavorite,
  addFeedback,
  getFeedbacks,
  likeResource,
  rateResource,
  incrementView,
};

