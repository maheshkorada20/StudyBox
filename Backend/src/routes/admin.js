


// // src/routes/admin.js
// const express = require("express");
// const router = express.Router();
// const adminController = require("../controllers/adminController");
// const { protect, adminOnly } = require("../middlewares/auth");
// const multer = require("multer");

// // ------------------------
// // Multer setup for PDF uploads
// // ------------------------
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // ------------------------
// // Protect all admin routes
// // ------------------------
// router.use(protect);
// router.use(adminOnly);

// // ------------------------
// // Branch routes
// // ------------------------
// router.post("/branch", adminController.addBranch);
// router.put("/branch/:branchId", adminController.updateBranch);
// router.delete("/branch/:branchId", adminController.deleteBranch);

// // ------------------------
// // Year routes
// // ------------------------
// router.post("/branch/:branchId/year", adminController.addYear);
// router.put("/year/:yearId", adminController.updateYear);
// router.delete("/year/:yearId", adminController.deleteYear);

// // ------------------------
// // Semester routes
// // ------------------------
// router.post("/year/:yearId/semester", adminController.addSemester);
// router.put("/semester/:semesterId", adminController.updateSemester);
// router.delete("/semester/:semesterId", adminController.deleteSemester);

// // ------------------------
// // Subject routes
// // ------------------------
// router.post("/semester/:semesterId/subject", adminController.addSubject);
// router.put("/subject/:subjectId", adminController.updateSubject);
// router.delete("/subject/:subjectId", adminController.deleteSubject);

// // ------------------------
// // Unit routes
// // ------------------------
// router.post("/subject/:subjectId/unit", adminController.addUnit);
// router.put("/unit/:unitId", adminController.updateUnit);
// router.delete("/unit/:unitId", adminController.deleteUnit);

// // ------------------------
// // Topic routes
// // ------------------------
// router.post("/:subjectOrUnitId/topic", adminController.addTopic);
// router.put("/topic/:topicId", adminController.updateTopic);
// router.delete("/topic/:topicId", adminController.deleteTopic);

// // ------------------------
// // Resource routes (multiple PDFs support)
// // ------------------------
// // Field name in form-data: "pdfs"
// router.post(
//   "/topic/:topicId/resource",
//   upload.array("pdfs", 5), // max 5 PDFs
//   adminController.addResource
// );

// router.put(
//   "/resource/:resourceId",
//   upload.array("pdfs", 5),
//   adminController.updateResource
// );

// router.delete("/resource/:resourceId", adminController.deleteResource);

// // ------------------------
// // Optional: Get all resources (admin view)
// // ------------------------
// router.get("/resources", adminController.getAllResources);

// module.exports = router;
// const express = require("express");
// const router = express.Router();
// const adminController = require("../controllers/adminController");
// const { protect, adminOnly } = require("../middlewares/auth");
// const multer = require("multer");

// // Multer setup for file uploads
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // ------------------------
// // Public routes (no auth required)
// // ------------------------
// router.post("/signup", adminController.signup);
// router.post("/login", adminController.login);

// // ------------------------
// // Protected routes (admin only)
// // ------------------------
// router.use(protect);    // user must be logged in
// router.use(adminOnly);  // only admin can access

// // Branch routes
// router.post("/branch", adminController.addBranch);
// router.put("/branch/:branchId", adminController.updateBranch);
// router.delete("/branch/:branchId", adminController.deleteBranch);

// // Year routes
// router.post("/branch/:branchId/year", adminController.addYear);
// router.put("/year/:yearId", adminController.updateYear);
// router.delete("/year/:yearId", adminController.deleteYear);

// // Semester routes
// router.post("/year/:yearId/semester", adminController.addSemester);
// router.put("/semester/:semesterId", adminController.updateSemester);
// router.delete("/semester/:semesterId", adminController.deleteSemester);

// // Subject routes
// router.post("/semester/:semesterId/subject", adminController.addSubject);
// router.put("/subject/:subjectId", adminController.updateSubject);
// router.delete("/subject/:subjectId", adminController.deleteSubject);

// // Unit routes
// router.post("/subject/:subjectId/unit", adminController.addUnit);
// router.put("/unit/:unitId", adminController.updateUnit);
// router.delete("/unit/:unitId", adminController.deleteUnit);

// // Topic routes
// router.post("/:subjectOrUnitId/topic", adminController.addTopic); // query ?unit=true for unit
// router.put("/topic/:topicId", adminController.updateTopic);
// router.delete("/topic/:topicId", adminController.deleteTopic);

// // Resource routes
// router.post(
//   "/topic/:topicId/resource",
//   upload.array("pdfs", 5),
//   adminController.addResource
// );
// router.put(
//   "/resource/:resourceId",
//   upload.array("pdfs", 5),
//   adminController.updateResource
// );
// router.delete("/resource/:resourceId", adminController.deleteResource);

// // Get all resources
// router.get("/resources", adminController.getAllResources);

// // Optional: get first resource of topic
// router.get("/topic/:topicId/resource/first", adminController.getFirstResourceOfTopic);

// module.exports = router;

//correct code 

// const express = require("express");
// const router = express.Router();
// const adminController = require("../controllers/adminController");
// const { protect, adminOnly } = require("../middlewares/auth");
// const multer = require("multer");

// // ------------------------
// // Multer setup for file uploads
// // ------------------------
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // ------------------------
// // Public routes
// // ------------------------
// router.post("/signup", adminController.signup);
// router.post("/login", adminController.login);

// // ------------------------
// // Protected routes
// // ------------------------
// router.use(protect);
// router.use(adminOnly);

// // ------------------------
// // Branch routes
// // ------------------------
// router.get("/branches", adminController.getBranches); // List all branches
// router.post("/branch", adminController.addBranch);
// router.put("/branch/:branchId", adminController.updateBranch);
// router.delete("/branch/:branchId", adminController.deleteBranch);

// // ------------------------
// // Year routes
// // ------------------------
// router.get("/branches/:branchId/years", adminController.getYears);
// router.post("/branches/:branchId/years", adminController.addYear);
// router.put("/years/:yearId", adminController.updateYear);
// router.delete("/years/:yearId", adminController.deleteYear);

// // ------------------------
// // Semester routes
// // ------------------------
// router.get("/years/:yearId/semesters", adminController.getSemesters);
// router.post("/years/:yearId/semesters", adminController.addSemester);
// router.put("/semesters/:semesterId", adminController.updateSemester);
// router.delete("/semesters/:semesterId", adminController.deleteSemester);

// // ------------------------
// // Subject routes
// // ------------------------
// router.get("/semesters/:semesterId/subjects", adminController.getSubjects);
// router.post("/semesters/:semesterId/subjects", adminController.addSubject);
// router.put("/subjects/:subjectId", adminController.updateSubject);
// router.delete("/subjects/:subjectId", adminController.deleteSubject);

// // ------------------------
// // Unit routes
// // ------------------------
// router.get("/subjects/:subjectId/units", adminController.getUnits);
// router.post("/subjects/:subjectId/units", adminController.addUnit);
// router.put("/units/:unitId", adminController.updateUnit);
// router.delete("/units/:unitId", adminController.deleteUnit);

// // ------------------------
// // Topic routes
// // ------------------------
// // Add topic: use query ?unit=true if the topic belongs to a unit
// router.get("/units/:unitId/topics", adminController.getTopicsByUnit);
// router.get("/subjects/:subjectId/topics", adminController.getTopicsBySubject);
// router.post("/:subjectOrUnitId/topics", adminController.addTopic);
// router.put("/topics/:topicId", adminController.updateTopic);
// router.delete("/topics/:topicId", adminController.deleteTopic);

// // ------------------------
// // Resource routes
// // ------------------------
// router.post(
//   "/topics/:topicId/resources",
//   upload.array("pdfs", 5),
//   adminController.addResource
// );
// router.put(
//   "/resources/:resourceId",
//   upload.array("pdfs", 5),
//   adminController.updateResource
// );
// router.delete("/resources/:resourceId", adminController.deleteResource);

// router.get("/resources", adminController.getAllResources);
// router.get("/topics/:topicId/resources/first", adminController.getFirstResourceOfTopic);

// // ------------------------
// // Dashboard
// // ------------------------
// router.get("/dashboard", adminController.getDashboard);

// module.exports = router;
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { protect, adminOnly } = require("../middlewares/auth");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary"); // Cloudinary config

// ------------------------
// Multer + Cloudinary setup for file uploads
// ------------------------
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "studybox_pdfs",
    resource_type: "raw", // raw = for PDFs, docs, etc.
    public_id: (req, file) =>
      `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`,
  },
});
const upload = multer({ storage });

// ------------------------
// Public routes
// ------------------------
router.post("/signup", adminController.signup);
router.post("/login", adminController.login);

// ------------------------
// Protected routes
// ------------------------
router.use(protect);
router.use(adminOnly);

// ------------------------
// Branch routes
// ------------------------
router.get("/branches", adminController.getBranches);
router.post("/branch", adminController.addBranch);
router.put("/branch/:branchId", adminController.updateBranch);
router.delete("/branch/:branchId", adminController.deleteBranch);

// ------------------------
// Year routes
// ------------------------
router.get("/branches/:branchId/years", adminController.getYears);
router.post("/branches/:branchId/years", adminController.addYear);
router.put("/years/:yearId", adminController.updateYear);
router.delete("/years/:yearId", adminController.deleteYear);

// ------------------------
// Semester routes
// ------------------------
router.get("/years/:yearId/semesters", adminController.getSemesters);
router.post("/years/:yearId/semesters", adminController.addSemester);
router.put("/semesters/:semesterId", adminController.updateSemester);
router.delete("/semesters/:semesterId", adminController.deleteSemester);

// ------------------------
// Subject routes
// ------------------------
router.get("/semesters/:semesterId/subjects", adminController.getSubjects);
router.post("/semesters/:semesterId/subjects", adminController.addSubject);
router.put("/subjects/:subjectId", adminController.updateSubject);
router.delete("/subjects/:subjectId", adminController.deleteSubject);

// ------------------------
// Unit routes
// ------------------------
router.get("/subjects/:subjectId/units", adminController.getUnits);
router.post("/subjects/:subjectId/units", adminController.addUnit);
router.put("/units/:unitId", adminController.updateUnit);
router.delete("/units/:unitId", adminController.deleteUnit);

// ------------------------
// Topic routes
// ------------------------
router.get("/units/:unitId/topics", adminController.getTopicsByUnit);
router.get("/subjects/:subjectId/topics", adminController.getTopicsBySubject);
router.post("/:subjectOrUnitId/topics", adminController.addTopic);
router.put("/topics/:topicId", adminController.updateTopic);
router.delete("/topics/:topicId", adminController.deleteTopic);

// ------------------------
// Resource routes (supports Cloudinary PDFs + PDF URLs)
// ------------------------
router.post(
  "/topics/:topicId/resources",
  upload.array("pdfs", 5), // multiple PDFs
  adminController.addResource
);
router.put(
  "/resources/:resourceId",
  upload.array("pdfs", 5),
  adminController.updateResource
);
router.delete("/resources/:resourceId", adminController.deleteResource);

router.get("/resources", adminController.getAllResources);
router.get("/resources/:id", adminController.getResourceById);
router.get("/topics/:topicId/resources", adminController.getResourcesByTopic);
router.get("/topics/:topicId/resources/first", adminController.getFirstResourceOfTopic);

// ------------------------
// Dashboard
// ------------------------
router.get("/dashboard", adminController.getDashboard);

module.exports = router;
