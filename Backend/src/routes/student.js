// // src/routes/student.js
// const express = require("express");
// const router = express.Router();
// const studentController = require("../controllers/studentController");
// const { protect } = require("../middlewares/auth");

// // ------------------------
// // Protect all student routes
// // ------------------------
// router.use(protect);

// // ------------------------
// // Hierarchy browsing
// // ------------------------
// router.get("/branches", studentController.getBranches);
// router.get("/years/:branchId", studentController.getYears);
// router.get("/semesters/:yearId", studentController.getSemesters);
// router.get("/subjects/:semesterId", studentController.getSubjects);
// router.get("/units/:subjectId", studentController.getUnits);
// router.get("/topics/:unitId", studentController.getTopics);
// router.get("/topic/:topicId/resources", studentController.getResources);

// // ------------------------
// // Search resources
// // ------------------------
// router.get("/resources/search", studentController.searchResources);

// // ------------------------
// // Feedback
// // ------------------------
// router.post("/feedback/:resourceId", studentController.addFeedback);
// router.get("/feedback/:resourceId", studentController.getFeedbacks);

// // ------------------------
// // Resource interactions
// // ------------------------
// router.post("/resource/:id/like", studentController.likeResource);
// router.post("/resource/:id/rate", studentController.rateResource);
// router.post("/resource/:id/view", studentController.incrementView);

// module.exports = router;
const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const { protect, studentOnly } = require("../middlewares/auth");

// ------------------------
// Protect all student routes
// ------------------------
router.use(protect);
router.use(studentOnly);

// ------------------------
// Browse hierarchy
// ------------------------
router.get("/branches", studentController.getBranches);
router.get("/years/:branchId", studentController.getYears);
router.get("/semesters/:yearId", studentController.getSemesters);
router.get("/subjects/:semesterId", studentController.getSubjects);
router.get("/units/:subjectId", studentController.getUnits);

// Topics
router.get("/topics/subject/:subjectId", studentController.getTopicsBySubject);
router.get("/topics/unit/:unitId", studentController.getTopicsByUnit);

// Resources by topic or ID
router.get("/topic/:topicId/resources", studentController.getResourcesByTopic);
router.get("/resource/:id", studentController.getResourceById);

// ------------------------
// Search resources
// ------------------------
router.get("/search-resources", studentController.searchResources);

// ------------------------
// Dashboard features
// ------------------------
router.get("/resources/recent", studentController.getRecentResources);
router.get("/resources/recently-viewed", studentController.getRecentlyViewed);
router.get("/resources/favorites", studentController.getFavorites);
router.post("/resource/:id/favorite", studentController.toggleFavorite);

// ------------------------
// Feedback
// ------------------------
router.post("/feedback/:resourceId", studentController.addFeedback);
router.get("/feedback/:resourceId", studentController.getFeedbacks);

// ------------------------
// Resource interactions
// ------------------------
router.post("/resource/:id/like", studentController.likeResource);
router.post("/resource/:id/rate", studentController.rateResource);
router.post("/resource/:id/view", studentController.incrementView);

module.exports = router;

