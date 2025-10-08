// // src/controllers/adminController.js
// const Branch = require("../models/Branch");
// const Year = require("../models/Year");
// const Semester = require("../models/Semester");
// const Subject = require("../models/Subject");
// const Unit = require("../models/Unit");
// const Topic = require("../models/Topic");
// const Resource = require("../models/Resource");
// const asyncHandler = require("../utils/asyncHandler");
// const { successResponse, errorResponse } = require("../utils/apiResponse");
// const { uploadToCloudinary } = require("../services/storage"); // Cloudinary helper

// // ------------------------
// // Branch CRUD
// // ------------------------
// exports.addBranch = asyncHandler(async (req, res) => {
//   const { name, description } = req.body;
//   try {
//     const branch = await Branch.create({ name, description });
//     return successResponse(res, branch, "Branch added successfully");
//   } catch (err) {
//     if (err.code === 11000) {
//       return errorResponse(res, `Branch "${name}" already exists`, 400);
//     }
//     throw err;
//   }
// });

// exports.updateBranch = asyncHandler(async (req, res) => {
//   const branch = await Branch.findByIdAndUpdate(req.params.branchId, req.body, { new: true });
//   if (!branch) return errorResponse(res, "Branch not found", 404);
//   return successResponse(res, branch, "Branch updated successfully");
// });

// exports.deleteBranch = asyncHandler(async (req, res) => {
//   const branch = await Branch.findByIdAndDelete(req.params.branchId);
//   if (!branch) return errorResponse(res, "Branch not found", 404);
//   return successResponse(res, null, "Branch deleted successfully");
// });

// // ------------------------
// // Year CRUD
// // ------------------------
// exports.addYear = asyncHandler(async (req, res) => {
//   const { branchId } = req.params;
//   const { name } = req.body;
//   const year = await Year.create({ name, branch: branchId });
//   return successResponse(res, year, "Year added successfully");
// });

// exports.updateYear = asyncHandler(async (req, res) => {
//   const year = await Year.findByIdAndUpdate(req.params.yearId, req.body, { new: true });
//   if (!year) return errorResponse(res, "Year not found", 404);
//   return successResponse(res, year, "Year updated successfully");
// });

// exports.deleteYear = asyncHandler(async (req, res) => {
//   const year = await Year.findByIdAndDelete(req.params.yearId);
//   if (!year) return errorResponse(res, "Year not found", 404);
//   return successResponse(res, null, "Year deleted successfully");
// });

// // ------------------------
// // Semester CRUD
// // ------------------------
// exports.addSemester = asyncHandler(async (req, res) => {
//   const { yearId } = req.params;
//   const { name, description } = req.body;

//   const year = await Year.findById(yearId);
//   if (!year) return errorResponse(res, "Year not found", 404);

//   const semester = await Semester.create({
//     name,
//     description,
//     year: yearId,
//     branch: year.branch, // <-- add this
//   });

//   return successResponse(res, semester, "Semester added successfully");
// });


// exports.updateSemester = asyncHandler(async (req, res) => {
//   const semester = await Semester.findByIdAndUpdate(req.params.semesterId, req.body, { new: true });
//   if (!semester) return errorResponse(res, "Semester not found", 404);
//   return successResponse(res, semester, "Semester updated successfully");
// });

// exports.deleteSemester = asyncHandler(async (req, res) => {
//   const semester = await Semester.findByIdAndDelete(req.params.semesterId);
//   if (!semester) return errorResponse(res, "Semester not found", 404);
//   return successResponse(res, null, "Semester deleted successfully");
// });

// // ------------------------
// // Subject CRUD
// // ------------------------
// exports.addSubject = asyncHandler(async (req, res) => {
//   const { semesterId } = req.params;
//   const { name, description } = req.body;

//   const semester = await Semester.findById(semesterId);
//   if (!semester) return errorResponse(res, "Semester not found", 404);

//   const subject = await Subject.create({
//     name,
//     description,
//     semester: semesterId,
//     branch: semester.branch,
//   });

//   return successResponse(res, subject, "Subject added successfully");
// });

// exports.updateSubject = asyncHandler(async (req, res) => {
//   const subject = await Subject.findByIdAndUpdate(req.params.subjectId, req.body, { new: true });
//   if (!subject) return errorResponse(res, "Subject not found", 404);
//   return successResponse(res, subject, "Subject updated successfully");
// });

// exports.deleteSubject = asyncHandler(async (req, res) => {
//   const subject = await Subject.findByIdAndDelete(req.params.subjectId);
//   if (!subject) return errorResponse(res, "Subject not found", 404);
//   return successResponse(res, null, "Subject deleted successfully");
// });


// // ------------------------
// // Unit CRUD
// // ------------------------
// exports.addUnit = asyncHandler(async (req, res) => {
//   const { subjectId } = req.params;
//   const { name } = req.body;
//   const subject = await Subject.findById(subjectId);
//   if (!subject) return errorResponse(res, "Subject not found", 404);

//   const unit = await Unit.create({ name, subject: subjectId, branch: subject.branch, semester: subject.semester });
//   return successResponse(res, unit, "Unit added successfully");
// });

// exports.updateUnit = asyncHandler(async (req, res) => {
//   const unit = await Unit.findByIdAndUpdate(req.params.unitId, req.body, { new: true });
//   if (!unit) return errorResponse(res, "Unit not found", 404);
//   return successResponse(res, unit, "Unit updated successfully");
// });

// exports.deleteUnit = asyncHandler(async (req, res) => {
//   const unit = await Unit.findByIdAndDelete(req.params.unitId);
//   if (!unit) return errorResponse(res, "Unit not found", 404);
//   return successResponse(res, null, "Unit deleted successfully");
// });

// // ------------------------
// // Topic CRUD
// // ------------------------
// exports.addTopic = asyncHandler(async (req, res) => {
//   const { subjectOrUnitId } = req.params;
//   const { name } = req.body;

//   let topicData = { name };

//   if (req.query.unit === "true") {
//     const unit = await Unit.findById(subjectOrUnitId);
//     if (!unit) return errorResponse(res, "Unit not found", 404);
//     topicData.unit = unit._id;
//     topicData.subject = unit.subject;
//     topicData.branch = unit.branch;
//     topicData.semester = unit.semester;
//   } else {
//     const subject = await Subject.findById(subjectOrUnitId);
//     if (!subject) return errorResponse(res, "Subject not found", 404);
//     topicData.subject = subject._id;
//     topicData.branch = subject.branch;
//     topicData.semester = subject.semester;
//   }

//   const topic = await Topic.create(topicData);
//   return successResponse(res, topic, "Topic added successfully");
// });

// exports.updateTopic = asyncHandler(async (req, res) => {
//   const topic = await Topic.findByIdAndUpdate(req.params.topicId, req.body, { new: true });
//   if (!topic) return errorResponse(res, "Topic not found", 404);
//   return successResponse(res, topic, "Topic updated successfully");
// });

// exports.deleteTopic = asyncHandler(async (req, res) => {
//   const topic = await Topic.findByIdAndDelete(req.params.topicId);
//   if (!topic) return errorResponse(res, "Topic not found", 404);
//   return successResponse(res, null, "Topic deleted successfully");
// });
// // ------------------------
// // Resource CRUD
// // ------------------------
// exports.addResource = asyncHandler(async (req, res) => {
//   const { topicId } = req.params;
//   const { title, summary, tags, difficulty, youtubeLinks } = req.body;

//   const topic = await Topic.findById(topicId);
//   if (!topic) return errorResponse(res, "Topic not found", 404);

//   // ✅ Handle multiple PDFs
//   let pdfs = [];
//   if (req.files && req.files.length > 0) {
//     pdfs = await Promise.all(
//       req.files.map(async (file) => {
//         const url = await uploadToCloudinary(file);
//         return { url, filename: file.originalname };
//       })
//     );
//   }

//   // ✅ Parse youtubeLinks safely (if coming as JSON string from frontend)
//   let parsedYoutubeLinks = [];
//   if (youtubeLinks) {
//     parsedYoutubeLinks =
//       typeof youtubeLinks === "string" ? JSON.parse(youtubeLinks) : youtubeLinks;
//   }

//   const resource = await Resource.create({
//     title,
//     topic: topic._id,
//     unit: topic.unit || null,
//     branch: topic.branch,
//     semester: topic.semester,
//     subject: topic.subject,
//     pdfs, // ✅ multiple PDFs
//     youtubeLinks: parsedYoutubeLinks,
//     summary: summary || "",
//     tags: tags ? (typeof tags === "string" ? JSON.parse(tags) : tags) : [],
//     difficulty: difficulty || "medium",
//     addedBy: req.user._id,
//   });

//   return successResponse(res, resource, "Resource added successfully");
// });

// exports.updateResource = asyncHandler(async (req, res) => {
//   const resource = await Resource.findById(req.params.resourceId);
//   if (!resource) return errorResponse(res, "Resource not found", 404);

//   const { title, summary, tags, difficulty, youtubeLinks } = req.body;

//   // ✅ Handle additional PDFs if uploaded
//   if (req.files && req.files.length > 0) {
//     const newPdfs = await Promise.all(
//       req.files.map(async (file) => {
//         const url = await uploadToCloudinary(file);
//         return { url, filename: file.originalname };
//       })
//     );
//     resource.pdfs.push(...newPdfs);
//   }

//   if (title) resource.title = title;
//   if (summary) resource.summary = summary;
//   if (tags) resource.tags = typeof tags === "string" ? JSON.parse(tags) : tags;
//   if (difficulty) resource.difficulty = difficulty;
//   if (youtubeLinks)
//     resource.youtubeLinks =
//       typeof youtubeLinks === "string" ? JSON.parse(youtubeLinks) : youtubeLinks;

//   await resource.save();
//   return successResponse(res, resource, "Resource updated successfully");
// });

// exports.deleteResource = asyncHandler(async (req, res) => {
//   const resource = await Resource.findByIdAndDelete(req.params.resourceId);
//   if (!resource) return errorResponse(res, "Resource not found", 404);
//   return successResponse(res, null, "Resource deleted successfully");
// });

// exports.getAllResources = asyncHandler(async (req, res) => {
//   const resources = await Resource.find().sort({ createdAt: -1 });
//   return successResponse(res, resources, "Resources fetched successfully");
// });


// const Branch = require("../models/Branch");
// const Year = require("../models/Year");
// const Semester = require("../models/Semester");
// const Subject = require("../models/Subject");
// const Unit = require("../models/Unit");
// const Topic = require("../models/Topic");
// const Resource = require("../models/Resource");
// const User = require("../models/User");
// const asyncHandler = require("../utils/asyncHandler");
// const { successResponse, errorResponse } = require("../utils/apiResponse");
// const { uploadFile } = require('../services/storage');


// // ------------------------
// // JWT generator
// // ------------------------
// const generateToken = (id, role) =>
//   jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });

// // ------------------------
// // Auth: Signup
// // ------------------------
// const signup = asyncHandler(async (req, res) => {
//   const { firstName, lastName, email, password, gender, role, adminCode } = req.body;

//   const existingUser = await User.findOne({ email });
//   if (existingUser) return errorResponse(res, "Email already registered", 400);

//   if (role === "admin" && adminCode !== process.env.ADMIN_CODE) {
//     return errorResponse(res, "Invalid admin code", 403);
//   }

//   const user = await User.create({ firstName, lastName, email, password, gender, role });
//   const token = generateToken(user._id, user.role);

//   successResponse(res, { user, token }, "User registered successfully", 201);
// });

// // ------------------------
// // Auth: Login
// // ------------------------
// const login = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (!user) return errorResponse(res, "Invalid credentials", 401);

//   const isMatch = await user.comparePassword(password);
//   if (!isMatch) return errorResponse(res, "Invalid credentials", 401);

//   const token = generateToken(user._id, user.role);
//   successResponse(res, { user, token }, "Login successful");
// });

// // ------------------------
// // Dashboard Data
// // ------------------------
// const getDashboard = asyncHandler(async (req, res) => {
//   const counts = {
//     branches: await Branch.countDocuments(),
//     subjects: await Subject.countDocuments(),
//     topics: await Topic.countDocuments(),
//     resources: await Resource.countDocuments(),
//     students: await User.countDocuments({ role: "student" }),
//     admins: await User.countDocuments({ role: "admin" }),
//   };

//   const recentUpdates = [
//     ...(await Branch.find().sort({ updatedAt: -1 }).limit(5)).map(b => ({ type: "Branch", title: b.name, date: b.updatedAt })),
//     ...(await Subject.find().sort({ updatedAt: -1 }).limit(5)).map(s => ({ type: "Subject", title: s.name, date: s.updatedAt })),
//     ...(await Topic.find().sort({ updatedAt: -1 }).limit(5)).map(t => ({ type: "Topic", title: t.name, date: t.updatedAt })),
//     ...(await Resource.find().sort({ updatedAt: -1 }).limit(5)).map(r => ({ type: "Resource", title: r.title, date: r.updatedAt })),
//     ...(await User.find().sort({ createdAt: -1 }).limit(5)).map(u => ({
//       type: u.role === "admin" ? "Admin" : "Student",
//       title: `${u.firstName} ${u.lastName}`,
//       date: u.createdAt,
//     })),
//   ].sort((a, b) => b.date - a.date).slice(0, 10);

//   successResponse(res, { counts, recentUpdates }, "Dashboard data fetched successfully");
// });

// // ------------------------
// // CRUD: Branch
// // ------------------------
// const getBranches = asyncHandler(async (req, res) => {
//   const branches = await Branch.find().sort({ createdAt: -1 });
//   successResponse(res, branches, "Branches fetched successfully");
// });

// const addBranch = asyncHandler(async (req, res) => {
//   let { name, description } = req.body;

//   if (!name || !description) {
//     return errorResponse(res, "Branch name and description are required", 400);
//   }

//   name = name.trim();
//   description = description.trim();

//   const existing = await Branch.findOne({ name });
//   if (existing) return errorResponse(res, "Branch name already exists", 400);

//   const branch = await Branch.create({ name, description });
//   successResponse(res, branch, "Branch added successfully");
// });

// const updateBranch = asyncHandler(async (req, res) => {
//   let { name, description } = req.body;

//   if (!name || !description) {
//     return errorResponse(res, "Branch name and description are required", 400);
//   }

//   name = name.trim();
//   description = description.trim();

//   const branch = await Branch.findByIdAndUpdate(
//     req.params.branchId,
//     { name, description },
//     { new: true, runValidators: true }
//   );

//   if (!branch) return errorResponse(res, "Branch not found", 404);
//   successResponse(res, branch, "Branch updated successfully");
// });

// const deleteBranch = asyncHandler(async (req, res) => {
//   const branch = await Branch.findByIdAndDelete(req.params.branchId);
//   if (!branch) return errorResponse(res, "Branch not found", 404);
//   successResponse(res, null, "Branch deleted successfully");
// })

// // ------------------------
// // CRUD: Year
// // ------------------------
// const getYears = asyncHandler(async (req, res) => {
//   const years = await Year.find({ branch: req.params.branchId });
//   successResponse(res, years, "Years fetched successfully");
// });

// const addYear = asyncHandler(async (req, res) => {
//   const { name, description } = req.body;
//   if (!name) return errorResponse(res, "Year name is required", 400);

//   const year = await Year.create({ name, description, branch: req.params.branchId });
//   successResponse(res, years, "Year added successfully");
// });

// const updateYear = asyncHandler(async (req, res) => {
//   const { name, description } = req.body;
//   if (!name) return errorResponse(res, "Year name is required", 400);

//   const year = await Year.findByIdAndUpdate(
//     req.params.yearId,
//     { name, description },
//     { new: true, runValidators: true }
//   );
//   if (!year) return errorResponse(res, "Year not found", 404);
//   successResponse(res, years, "Year updated successfully");
// });

// const deleteYear = asyncHandler(async (req, res) => {
//   const year = await Year.findByIdAndDelete(req.params.yearId);
//   if (!year) return errorResponse(res, "Year not found", 404);
//   successResponse(res, null, "Year deleted successfully");
// });


// // ------------------------
// // CRUD: Semester
// // ------------------------
// const getSemesters = asyncHandler(async (req, res) => {
//   const semesters = await Semester.find({ year: req.params.yearId });
//   successResponse(res, semesters, "Semesters fetched successfully");
// });

// const addSemester = asyncHandler(async (req, res) => {
//   const { name } = req.body;
//   if (!name) return errorResponse(res, "Semester name is required", 400);

//   const year = await Year.findById(req.params.yearId);
//   if (!year) return errorResponse(res, "Year not found", 404);

//   const semester = await Semester.create({ ...req.body, year: year._id, branch: year.branch });
//   successResponse(res, semester, "Semester added successfully");
// });

// const updateSemester = asyncHandler(async (req, res) => {
//   const { name } = req.body;
//   if (!name) return errorResponse(res, "Semester name is required", 400);

//   const semester = await Semester.findByIdAndUpdate(req.params.semesterId, { name }, { new: true, runValidators: true });
//   if (!semester) return errorResponse(res, "Semester not found", 404);
//   successResponse(res, semester, "Semester updated successfully");
// });

// const deleteSemester = asyncHandler(async (req, res) => {
//   const semester = await Semester.findByIdAndDelete(req.params.semesterId);
//   if (!semester) return errorResponse(res, "Semester not found", 404);
//   successResponse(res, null, "Semester deleted successfully");
// });

// // ------------------------
// // CRUD: Subject
// // ------------------------
// const getSubjects = asyncHandler(async (req, res) => {
//   const subjects = await Subject.find({ semester: req.params.semesterId });
//   successResponse(res, subjects, "Subjects fetched successfully");
// });

// const addSubject = asyncHandler(async (req, res) => {
//   const { name } = req.body;
//   if (!name) return errorResponse(res, "Subject name is required", 400);

//   const semester = await Semester.findById(req.params.semesterId);
//   if (!semester) return errorResponse(res, "Semester not found", 404);

//   const subject = await Subject.create({ ...req.body, semester: semester._id, branch: semester.branch });
//   successResponse(res, subject, "Subject added successfully");
// });

// const updateSubject = asyncHandler(async (req, res) => {
//   const { name } = req.body;
//   if (!name) return errorResponse(res, "Subject name is required", 400);

//   const subject = await Subject.findByIdAndUpdate(req.params.subjectId, { name }, { new: true, runValidators: true });
//   if (!subject) return errorResponse(res, "Subject not found", 404);
//   successResponse(res, subject, "Subject updated successfully");
// });

// const deleteSubject = asyncHandler(async (req, res) => {
//   const subject = await Subject.findByIdAndDelete(req.params.subjectId);
//   if (!subject) return errorResponse(res, "Subject not found", 404);
//   successResponse(res, null, "Subject deleted successfully");
// });

// // ------------------------
// // CRUD: Unit
// // ------------------------
// const getUnits = asyncHandler(async (req, res) => {
//   const units = await Unit.find({ subject: req.params.subjectId });
//   successResponse(res, units, "Units fetched successfully");
// });

// const addUnit = asyncHandler(async (req, res) => {
//   const { name } = req.body;
//   if (!name) return errorResponse(res, "Unit name is required", 400);

//   const subject = await Subject.findById(req.params.subjectId);
//   if (!subject) return errorResponse(res, "Subject not found", 404);

//   const unit = await Unit.create({ ...req.body, subject: subject._id, branch: subject.branch, semester: subject.semester });
//   successResponse(res, unit, "Unit added successfully");
// });

// const updateUnit = asyncHandler(async (req, res) => {
//   const { name } = req.body;
//   if (!name) return errorResponse(res, "Unit name is required", 400);

//   const unit = await Unit.findByIdAndUpdate(req.params.unitId, { name }, { new: true, runValidators: true });
//   if (!unit) return errorResponse(res, "Unit not found", 404);
//   successResponse(res, unit, "Unit updated successfully");
// });

// const deleteUnit = asyncHandler(async (req, res) => {
//   const unit = await Unit.findByIdAndDelete(req.params.unitId);
//   if (!unit) return errorResponse(res, "Unit not found", 404);
//   successResponse(res, null, "Unit deleted successfully");
// });

// // ------------------------
// // CRUD: Topic
// // ------------------------
// const getTopicsByUnit = asyncHandler(async (req, res) => {
//   const topics = await Topic.find({ unit: req.params.unitId });
//   successResponse(res, topics, "Topics fetched successfully");
// });

// const getTopicsBySubject = asyncHandler(async (req, res) => {
//   const topics = await Topic.find({ subject: req.params.subjectId, unit: null });
//   successResponse(res, topics, "Topics fetched successfully");
// });

// const addTopic = asyncHandler(async (req, res) => {
//   const { subjectOrUnitId } = req.params;
//   const topicData = { ...req.body };

//   if (req.query.unit === "true") {
//     const unit = await Unit.findById(subjectOrUnitId);
//     if (!unit) return errorResponse(res, "Unit not found", 404);
//     topicData.unit = unit._id;
//     topicData.subject = unit.subject;
//     topicData.branch = unit.branch;
//     topicData.semester = unit.semester;
//   } else {
//     const subject = await Subject.findById(subjectOrUnitId);
//     if (!subject) return errorResponse(res, "Subject not found", 404);
//     topicData.subject = subject._id;
//     topicData.branch = subject.branch;
//     topicData.semester = subject.semester;
//   }

//   const topic = await Topic.create(topicData);
//   successResponse(res, topic, "Topic added successfully");
// });

// const updateTopic = asyncHandler(async (req, res) => {
//   const topic = await Topic.findByIdAndUpdate(req.params.topicId, req.body, { new: true, runValidators: true });
//   if (!topic) return errorResponse(res, "Topic not found", 404);
//   successResponse(res, topic, "Topic updated successfully");
// });

// const deleteTopic = asyncHandler(async (req, res) => {
//   const topic = await Topic.findByIdAndDelete(req.params.topicId);
//   if (!topic) return errorResponse(res, "Topic not found", 404);
//   successResponse(res, null, "Topic deleted successfully");
// });

// // ------------------------
// // Helper: Sanitize filenames for Cloudinary
// // ------------------------
// const sanitizeFilename = (originalname) => {
//   return originalname
//     .replace(/\s+/g, "_")             // spaces → _
//     .replace(/\[|\]/g, "")            // remove brackets
//     .replace(/&/g, "and")             // replace & with "and"
//     .replace(/[^a-zA-Z0-9_.-]/g, ""); // remove other special chars
// };

// // ------------------------
// // Helper: Upload buffer to Cloudinary
// // ------------------------
// const cloudinaryUpload = (fileBuffer, sanitizedName) => {
//   return new Promise((resolve, reject) => {
//     const stream = cloudinary.uploader.upload_stream(
//       {
//         folder: "studybox_pdfs",
//         public_id: `${Date.now()}-${sanitizedName}`,
//         resource_type: "auto",
//       },
//       (error, result) => {
//         if (error) return reject(error);
//         resolve(result);
//       }
//     );
//     stream.end(fileBuffer);
//   });
// };

// // ------------------------
// // Helper: Convert Google Drive link to direct download
// // ------------------------
// const getDriveDownloadLink = (url) => {
//   const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
//   return match && match[1] ? `https://drive.google.com/uc?export=download&id=${match[1]}` : url;
// };
// // ------------------------
// // Add Resource
// // ------------------------
// const addResource = asyncHandler(async (req, res) => {
//   const topic = await Topic.findById(req.params.topicId);
//   if (!topic) return errorResponse(res, "Topic not found", 404);

//   const { title, summary = "", difficulty, tags = [], pdfUrls, youtubeLinks } = req.body;

//   if (!title || title.trim() === "") {
//     return errorResponse(res, "Title is required", 400);
//   }

//   // Ensure difficulty is valid, fallback to "medium"
//   const validDifficulties = ["easy", "medium", "hard"];
//   const safeDifficulty = validDifficulties.includes(difficulty) ? difficulty : "medium";

//   // Process YouTube links
//   let ytLinks = [];
//   if (youtubeLinks) {
//     try {
//       ytLinks = Array.isArray(youtubeLinks) ? youtubeLinks : JSON.parse(youtubeLinks);
//       if (!Array.isArray(ytLinks)) ytLinks = [];
//     } catch {
//       return errorResponse(res, "Invalid youtubeLinks format", 400);
//     }
//   }

//   // Process PDFs
//   let pdfs = [];

//   // 1️⃣ Uploaded PDFs
//   if (req.files?.length) {
//     const uploadedPdfs = await Promise.all(
//       req.files.map(async (file) => {
//         const sanitizedName = sanitizeFilename(file.originalname);
//         const result = await cloudinaryUpload(file.buffer, sanitizedName);
//         return { url: result.secure_url, filename: file.originalname, fileType: "file" };
//       })
//     );
//     pdfs.push(...uploadedPdfs);
//   }

//   // 2️⃣ PDF URLs
//   if (pdfUrls) {
//     const urls = Array.isArray(pdfUrls) ? pdfUrls : JSON.parse(pdfUrls);
//     const urlPdfs = urls.map((url) => ({
//       url: getDriveDownloadLink(url),
//       filename: decodeURIComponent(url.split("/").pop() || "resource.pdf"),
//       fileType: "url",
//     }));
//     pdfs.push(...urlPdfs);
//   }

//   // 3️⃣ Tags
//   const safeTags = Array.isArray(tags) ? tags : JSON.parse(tags || "[]");

//   const resource = await Resource.create({
//     title: title.trim(),
//     summary,
//     difficulty: safeDifficulty,
//     tags: safeTags,
//     pdfs,
//     youtubeLinks: ytLinks,
//     topic: topic._id,
//     unit: topic.unit || null,
//     branch: topic.branch,
//     semester: topic.semester,
//     subject: topic.subject,
//     addedBy: req.user._id,
//   });

//   successResponse(res, resource, "Resource added successfully");
// });

// // ------------------------
// // Update Resource
// // ------------------------
// const updateResource = asyncHandler(async (req, res) => {
//   const resource = await Resource.findById(req.params.resourceId);
//   if (!resource) return errorResponse(res, "Resource not found", 404);

//   const { title, summary, difficulty, tags, pdfUrls, youtubeLinks, pdfsToKeep } = req.body;

//   if (title !== undefined && title.trim() === "") {
//     return errorResponse(res, "Title cannot be empty", 400);
//   }

//   if (title) resource.title = title.trim();
//   if (summary !== undefined) resource.summary = summary;

//   // Validate difficulty
//   if (difficulty !== undefined) {
//     const validDifficulties = ["easy", "medium", "hard"];
//     resource.difficulty = validDifficulties.includes(difficulty) ? difficulty : resource.difficulty;
//   }

//   // Tags
//   if (tags !== undefined) {
//     resource.tags = Array.isArray(tags) ? tags : JSON.parse(tags || "[]");
//   }

//   // Keep specified PDFs
//   if (pdfsToKeep) {
//     const keep = Array.isArray(pdfsToKeep) ? pdfsToKeep : JSON.parse(pdfsToKeep);
//     resource.pdfs = resource.pdfs.filter((p) => keep.some((k) => k.filename === p.filename));
//   }

//   // Add uploaded PDFs
//   if (req.files?.length) {
//     const newPdfs = await Promise.all(
//       req.files.map(async (file) => {
//         const sanitizedName = sanitizeFilename(file.originalname);
//         const result = await cloudinaryUpload(file.buffer, sanitizedName);
//         return { url: result.secure_url, filename: file.originalname, fileType: "file" };
//       })
//     );
//     resource.pdfs.push(...newPdfs);
//   }

//   // Add PDF URLs
//   if (pdfUrls) {
//     const urls = Array.isArray(pdfUrls) ? pdfUrls : JSON.parse(pdfUrls);
//     const urlPdfs = urls.map((url) => ({
//       url: getDriveDownloadLink(url),
//       filename: decodeURIComponent(url.split("/").pop() || "resource.pdf"),
//       fileType: "url",
//     }));
//     resource.pdfs.push(...urlPdfs);
//   }

//   // Update YouTube links
//   if (youtubeLinks) {
//     try {
//       const parsedLinks = Array.isArray(youtubeLinks) ? youtubeLinks : JSON.parse(youtubeLinks);
//       resource.youtubeLinks = Array.isArray(parsedLinks) ? parsedLinks : [];
//     } catch {
//       return errorResponse(res, "Invalid youtubeLinks format", 400);
//     }
//   }

//   await resource.save();
//   successResponse(res, resource, "Resource updated successfully");
// });


// // ------------------------
// // Delete Resource
// // ------------------------
// const deleteResource = asyncHandler(async (req, res) => {
//   const resource = await Resource.findByIdAndDelete(req.params.resourceId);
//   if (!resource) return errorResponse(res, "Resource not found", 404);
//   successResponse(res, null, "Resource deleted successfully");
// });



// // ------------------------
// // Get All Resources
// // ------------------------
// const getAllResources = asyncHandler(async (req, res) => {
//   const resources = await Resource.find()
//     .sort({ createdAt: -1 })
//     .populate([
//       { path: "topic", select: "title" },
//       { path: "unit", select: "name" },
//       { path: "branch", select: "name" },
//       { path: "year", select: "name" },
//       { path: "semester", select: "name" },
//       { path: "subject", select: "name" },
//       { path: "addedBy", select: "firstName lastName" },
//     ]);

//   successResponse(res, resources, "Resources fetched successfully");
// });

// // ------------------------
// // Get First Resource of a Topic
// // ------------------------
// const getFirstResourceOfTopic = asyncHandler(async (req, res) => {
//   const resource = await Resource.findOne({ topic: req.params.topicId })
//     .sort({ createdAt: 1 })
//     .populate("topic unit branch semester subject addedBy", "name title"); // optional
//   if (!resource)
//     return errorResponse(res, "No resources found for this topic", 404);

//   successResponse(res, resource, "First resource fetched successfully");
// });

// // ------------------------
// // Get All Resources for a Specific Topic
// // ------------------------
// const getResourcesByTopic = asyncHandler(async (req, res) => {
//   const resources = await Resource.find({ topic: req.params.topicId })
//     .sort({ createdAt: -1 })
//     .populate("unit branch semester subject addedBy", "name title"); // optional
//   if (!resources || resources.length === 0)
//     return errorResponse(res, "No resources found for this topic", 404);

//   successResponse(res, resources, "Resources fetched successfully");
// });

// // ------------------------
// // Get Resource by ID
// // ------------------------
// const getResourceById = asyncHandler(async (req, res) => {
//   const resource = await Resource.findById(req.params.id)
//     .populate("topic unit branch semester subject addedBy", "name title"); // optional
//   if (!resource)
//     return errorResponse(res, "Resource not found", 404);

//   successResponse(res, resource, "Resource fetched successfully");
// });
// // ------------------------
// // Export all functions
// // ------------------------
// module.exports = {
//   signup,
//   login,
//   getDashboard,
//   getBranches,
//   addBranch,
//   updateBranch,
//   deleteBranch,
//   getYears,
//   addYear,
//   updateYear,
//   deleteYear,
//   getSemesters,
//   addSemester,
//   updateSemester,
//   deleteSemester,
//   getSubjects,
//   addSubject,
//   updateSubject,
//   deleteSubject,
//   getUnits,
//   addUnit,
//   updateUnit,
//   deleteUnit,
//   getTopicsByUnit,
//   getTopicsBySubject,
//   addTopic,
//   updateTopic,
//   deleteTopic,
//   addResource,
//   updateResource,
//   deleteResource,
//   sanitizeFilename,
//   cloudinaryUpload,
//   getAllResources,
//   getFirstResourceOfTopic,
//   getResourcesByTopic,
//   getResourceById,
// };


const Branch = require("../models/Branch");
const Year = require("../models/Year");
const Semester = require("../models/Semester");
const Subject = require("../models/Subject");
const Unit = require("../models/Unit");
const Topic = require("../models/Topic");
const Resource = require("../models/Resource");
const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const { successResponse, errorResponse } = require("../utils/apiResponse");
const { uploadFile } = require('../services/storage');


// ------------------------
// JWT generator
// ------------------------
const generateToken = (id, role) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });

// ------------------------
// Auth: Signup
// ------------------------
const signup = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, gender, role, adminCode } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) return errorResponse(res, "Email already registered", 400);

  if (role === "admin" && adminCode !== process.env.ADMIN_CODE) {
    return errorResponse(res, "Invalid admin code", 403);
  }

  const user = await User.create({ firstName, lastName, email, password, gender, role });
  const token = generateToken(user._id, user.role);

  successResponse(res, { user, token }, "User registered successfully", 201);
});

// ------------------------
// Auth: Login
// ------------------------
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return errorResponse(res, "Invalid credentials", 401);

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return errorResponse(res, "Invalid credentials", 401);

  const token = generateToken(user._id, user.role);
  successResponse(res, { user, token }, "Login successful");
});

// ------------------------
// Dashboard Data
// ------------------------
const getDashboard = asyncHandler(async (req, res) => {
  const counts = {
    branches: await Branch.countDocuments(),
    subjects: await Subject.countDocuments(),
    topics: await Topic.countDocuments(),
    resources: await Resource.countDocuments(),
    students: await User.countDocuments({ role: "student" }),
    admins: await User.countDocuments({ role: "admin" }),
  };

  const recentUpdates = [
    ...(await Branch.find().sort({ updatedAt: -1 }).limit(5)).map(b => ({ type: "Branch", title: b.name, date: b.updatedAt })),
    ...(await Subject.find().sort({ updatedAt: -1 }).limit(5)).map(s => ({ type: "Subject", title: s.name, date: s.updatedAt })),
    ...(await Topic.find().sort({ updatedAt: -1 }).limit(5)).map(t => ({ type: "Topic", title: t.name, date: t.updatedAt })),
    ...(await Resource.find().sort({ updatedAt: -1 }).limit(5)).map(r => ({ type: "Resource", title: r.title, date: r.updatedAt })),
    ...(await User.find().sort({ createdAt: -1 }).limit(5)).map(u => ({
      type: u.role === "admin" ? "Admin" : "Student",
      title: `${u.firstName} ${u.lastName}`,
      date: u.createdAt,
    })),
  ].sort((a, b) => b.date - a.date).slice(0, 10);

  successResponse(res, { counts, recentUpdates }, "Dashboard data fetched successfully");
});

// ------------------------
// CRUD: Branch
// ------------------------
const getBranches = asyncHandler(async (req, res) => {
  const branches = await Branch.find().sort({ createdAt: -1 });
  successResponse(res, branches, "Branches fetched successfully");
});

const addBranch = asyncHandler(async (req, res) => {
  let { name, description } = req.body;

  if (!name || !description) {
    return errorResponse(res, "Branch name and description are required", 400);
  }

  name = name.trim();
  description = description.trim();

  const existing = await Branch.findOne({ name });
  if (existing) return errorResponse(res, "Branch name already exists", 400);

  const branch = await Branch.create({ name, description });
  successResponse(res, branch, "Branch added successfully");
});

const updateBranch = asyncHandler(async (req, res) => {
  let { name, description } = req.body;

  if (!name || !description) {
    return errorResponse(res, "Branch name and description are required", 400);
  }

  name = name.trim();
  description = description.trim();

  const branch = await Branch.findByIdAndUpdate(
    req.params.branchId,
    { name, description },
    { new: true, runValidators: true }
  );

  if (!branch) return errorResponse(res, "Branch not found", 404);
  successResponse(res, branch, "Branch updated successfully");
});

const deleteBranch = asyncHandler(async (req, res) => {
  const branch = await Branch.findByIdAndDelete(req.params.branchId);
  if (!branch) return errorResponse(res, "Branch not found", 404);
  successResponse(res, null, "Branch deleted successfully");
})

// ------------------------
// CRUD: Year
// ------------------------
const getYears = asyncHandler(async (req, res) => {
  const years = await Year.find({ branch: req.params.branchId });
  successResponse(res, years, "Years fetched successfully");
});

const addYear = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  if (!name) return errorResponse(res, "Year name is required", 400);

  const year = await Year.create({ name, description, branch: req.params.branchId });
  successResponse(res, years, "Year added successfully");
});

const updateYear = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  if (!name) return errorResponse(res, "Year name is required", 400);

  const year = await Year.findByIdAndUpdate(
    req.params.yearId,
    { name, description },
    { new: true, runValidators: true }
  );
  if (!year) return errorResponse(res, "Year not found", 404);
  successResponse(res, years, "Year updated successfully");
});

const deleteYear = asyncHandler(async (req, res) => {
  const year = await Year.findByIdAndDelete(req.params.yearId);
  if (!year) return errorResponse(res, "Year not found", 404);
  successResponse(res, null, "Year deleted successfully");
});


// ------------------------
// CRUD: Semester
// ------------------------
const getSemesters = asyncHandler(async (req, res) => {
  const semesters = await Semester.find({ year: req.params.yearId });
  successResponse(res, semesters, "Semesters fetched successfully");
});

const addSemester = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) return errorResponse(res, "Semester name is required", 400);

  const year = await Year.findById(req.params.yearId);
  if (!year) return errorResponse(res, "Year not found", 404);

  const semester = await Semester.create({ ...req.body, year: year._id, branch: year.branch });
  successResponse(res, semester, "Semester added successfully");
});

const updateSemester = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) return errorResponse(res, "Semester name is required", 400);

  const semester = await Semester.findByIdAndUpdate(req.params.semesterId, { name }, { new: true, runValidators: true });
  if (!semester) return errorResponse(res, "Semester not found", 404);
  successResponse(res, semester, "Semester updated successfully");
});

const deleteSemester = asyncHandler(async (req, res) => {
  const semester = await Semester.findByIdAndDelete(req.params.semesterId);
  if (!semester) return errorResponse(res, "Semester not found", 404);
  successResponse(res, null, "Semester deleted successfully");
});

// ------------------------
// CRUD: Subject
// ------------------------
const getSubjects = asyncHandler(async (req, res) => {
  const subjects = await Subject.find({ semester: req.params.semesterId });
  successResponse(res, subjects, "Subjects fetched successfully");
});

const addSubject = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) return errorResponse(res, "Subject name is required", 400);

  const semester = await Semester.findById(req.params.semesterId);
  if (!semester) return errorResponse(res, "Semester not found", 404);

  const subject = await Subject.create({ ...req.body, semester: semester._id, branch: semester.branch });
  successResponse(res, subject, "Subject added successfully");
});

const updateSubject = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) return errorResponse(res, "Subject name is required", 400);

  const subject = await Subject.findByIdAndUpdate(req.params.subjectId, { name }, { new: true, runValidators: true });
  if (!subject) return errorResponse(res, "Subject not found", 404);
  successResponse(res, subject, "Subject updated successfully");
});

const deleteSubject = asyncHandler(async (req, res) => {
  const subject = await Subject.findByIdAndDelete(req.params.subjectId);
  if (!subject) return errorResponse(res, "Subject not found", 404);
  successResponse(res, null, "Subject deleted successfully");
});

// ------------------------
// CRUD: Unit
// ------------------------
const getUnits = asyncHandler(async (req, res) => {
  const units = await Unit.find({ subject: req.params.subjectId });
  successResponse(res, units, "Units fetched successfully");
});

const addUnit = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) return errorResponse(res, "Unit name is required", 400);

  const subject = await Subject.findById(req.params.subjectId);
  if (!subject) return errorResponse(res, "Subject not found", 404);

  const unit = await Unit.create({ ...req.body, subject: subject._id, branch: subject.branch, semester: subject.semester });
  successResponse(res, unit, "Unit added successfully");
});

const updateUnit = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) return errorResponse(res, "Unit name is required", 400);

  const unit = await Unit.findByIdAndUpdate(req.params.unitId, { name }, { new: true, runValidators: true });
  if (!unit) return errorResponse(res, "Unit not found", 404);
  successResponse(res, unit, "Unit updated successfully");
});

const deleteUnit = asyncHandler(async (req, res) => {
  const unit = await Unit.findByIdAndDelete(req.params.unitId);
  if (!unit) return errorResponse(res, "Unit not found", 404);
  successResponse(res, null, "Unit deleted successfully");
});

// ------------------------
// CRUD: Topic
// ------------------------
const getTopicsByUnit = asyncHandler(async (req, res) => {
  const topics = await Topic.find({ unit: req.params.unitId });
  successResponse(res, topics, "Topics fetched successfully");
});

const getTopicsBySubject = asyncHandler(async (req, res) => {
  const topics = await Topic.find({ subject: req.params.subjectId, unit: null });
  successResponse(res, topics, "Topics fetched successfully");
});

const addTopic = asyncHandler(async (req, res) => {
  const { subjectOrUnitId } = req.params;
  const topicData = { ...req.body };

  if (req.query.unit === "true") {
    const unit = await Unit.findById(subjectOrUnitId);
    if (!unit) return errorResponse(res, "Unit not found", 404);
    topicData.unit = unit._id;
    topicData.subject = unit.subject;
    topicData.branch = unit.branch;
    topicData.semester = unit.semester;
  } else {
    const subject = await Subject.findById(subjectOrUnitId);
    if (!subject) return errorResponse(res, "Subject not found", 404);
    topicData.subject = subject._id;
    topicData.branch = subject.branch;
    topicData.semester = subject.semester;
  }

  const topic = await Topic.create(topicData);
  successResponse(res, topic, "Topic added successfully");
});

const updateTopic = asyncHandler(async (req, res) => {
  const topic = await Topic.findByIdAndUpdate(req.params.topicId, req.body, { new: true, runValidators: true });
  if (!topic) return errorResponse(res, "Topic not found", 404);
  successResponse(res, topic, "Topic updated successfully");
});

const deleteTopic = asyncHandler(async (req, res) => {
  const topic = await Topic.findByIdAndDelete(req.params.topicId);
  if (!topic) return errorResponse(res, "Topic not found", 404);
  successResponse(res, null, "Topic deleted successfully");
});

// ------------------------
// Helper: Sanitize filenames for Cloudinary
// ------------------------
const sanitizeFilename = (originalname) => {
  return originalname
    .replace(/\s+/g, "_")             // spaces → _
    .replace(/\[|\]/g, "")            // remove brackets
    .replace(/&/g, "and")             // replace & with "and"
    .replace(/[^a-zA-Z0-9_.-]/g, ""); // remove other special chars
};

// ------------------------
// Helper: Upload buffer to Cloudinary
// ------------------------
const cloudinaryUpload = (fileBuffer, sanitizedName) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "studybox_pdfs",
        public_id: `${Date.now()}-${sanitizedName}`,
        resource_type: "auto",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(fileBuffer);
  });
};

// ------------------------
// Helper: Convert Google Drive link to direct download
// ------------------------
const getDriveDownloadLink = (url) => {
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
  return match && match[1] ? `https://drive.google.com/uc?export=download&id=${match[1]}` : url;
};

// ------------------------
// Add Resource
// ------------------------
const addResource = asyncHandler(async (req, res) => {
  const topic = await Topic.findById(req.params.topicId);
  if (!topic) return errorResponse(res, "Topic not found", 404);

  const { title, summary = "", difficulty, tags = [], pdfUrls, youtubeLinks } = req.body;

  if (!title || title.trim() === "") return errorResponse(res, "Title is required", 400);

  const validDifficulties = ["easy", "medium", "hard"];
  const safeDifficulty = validDifficulties.includes(difficulty) ? difficulty : "medium";

  // Parse YouTube links
  let ytLinks = [];
  if (youtubeLinks) {
    try {
      ytLinks = Array.isArray(youtubeLinks) ? youtubeLinks : JSON.parse(youtubeLinks);
      if (!Array.isArray(ytLinks)) ytLinks = [];
    } catch {
      return errorResponse(res, "Invalid youtubeLinks format", 400);
    }
  }

  // Uploaded PDFs
  let uploadedPdfs = [];
  if (req.files?.length) {
    uploadedPdfs = await Promise.all(
      req.files.map(async (file) => {
        const sanitizedName = sanitizeFilename(file.originalname);
        const result = await cloudinaryUpload(file.buffer, sanitizedName);
        return { url: result.secure_url, filename: file.originalname, fileType: "file" };
      })
    );
  }

  // External PDF URLs
  let externalPdfs = [];
  if (pdfUrls) {
    const urls = Array.isArray(pdfUrls) ? pdfUrls : JSON.parse(pdfUrls);
    externalPdfs = urls
      .map(url => url?.trim())
      .filter(Boolean)
      .map(url => ({ url: getDriveDownloadLink(url), filename: url.split("/").pop() || "PDF", fileType: "url" }));
  }

  // Tags
  const safeTags = Array.isArray(tags) ? tags : JSON.parse(tags || "[]");

  const resource = await Resource.create({
    title: title.trim(),
    summary,
    difficulty: safeDifficulty,
    tags: safeTags,
    pdfs: [...uploadedPdfs, ...externalPdfs],
    pdfUrls: [], // optional, not used
    youtubeLinks: ytLinks,
    topic: topic._id,
    unit: topic.unit || null,
    branch: topic.branch,
    semester: topic.semester,
    subject: topic.subject,
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

  const { title, summary, difficulty, tags, pdfsToKeep, pdfUrls, youtubeLinks } = req.body;

  if (title !== undefined && title.trim() === "") return errorResponse(res, "Title cannot be empty", 400);
  if (title) resource.title = title.trim();
  if (summary !== undefined) resource.summary = summary;

  // Difficulty
  if (difficulty !== undefined) {
    const validDifficulties = ["easy", "medium", "hard"];
    resource.difficulty = validDifficulties.includes(difficulty) ? difficulty : resource.difficulty;
  }

  // Tags
  if (tags !== undefined) resource.tags = Array.isArray(tags) ? tags : JSON.parse(tags || "[]");

  // Keep existing uploaded PDFs
  if (pdfsToKeep) {
    const keep = Array.isArray(pdfsToKeep) ? pdfsToKeep : JSON.parse(pdfsToKeep);
    resource.pdfs = resource.pdfs.filter((p) => keep.some((k) => k.filename === p.filename));
  }

  // New uploaded PDFs
  if (req.files?.length) {
    const newPdfs = await Promise.all(
      req.files.map(async (file) => {
        const sanitizedName = sanitizeFilename(file.originalname);
        const result = await cloudinaryUpload(file.buffer, sanitizedName);
        return { url: result.secure_url, filename: file.originalname, fileType: "file" };
      })
    );
    resource.pdfs.push(...newPdfs);
  }

  // External PDF URLs
  if (pdfUrls) {
    const urls = Array.isArray(pdfUrls) ? pdfUrls : JSON.parse(pdfUrls);
    const externalPdfs = urls
      .map(url => url?.trim())
      .filter(Boolean)
      .map(url => ({ url: getDriveDownloadLink(url), filename: url.split("/").pop() || "PDF", fileType: "url" }));
    resource.pdfs.push(...externalPdfs);
  }

  // YouTube links
  if (youtubeLinks) {
    try {
      const parsedLinks = Array.isArray(youtubeLinks) ? youtubeLinks : JSON.parse(youtubeLinks);
      resource.youtubeLinks = Array.isArray(parsedLinks) ? parsedLinks : [];
    } catch {
      return errorResponse(res, "Invalid youtubeLinks format", 400);
    }
  }

  await resource.save();
  successResponse(res, resource, "Resource updated successfully");
});


// ------------------------
// Delete Resource
// ------------------------
const deleteResource = asyncHandler(async (req, res) => {
  const resource = await Resource.findByIdAndDelete(req.params.resourceId);
  if (!resource) return errorResponse(res, "Resource not found", 404);
  successResponse(res, null, "Resource deleted successfully");
});




// ------------------------
// Get All Resources
// ------------------------
const getAllResources = asyncHandler(async (req, res) => {
  const resources = await Resource.find()
    .sort({ createdAt: -1 })
    .populate([
      { path: "topic", select: "title" },
      { path: "unit", select: "name" },
      { path: "branch", select: "name" },
      { path: "year", select: "name" },
      { path: "semester", select: "name" },
      { path: "subject", select: "name" },
      { path: "addedBy", select: "firstName lastName" },
    ]);

  successResponse(res, resources, "Resources fetched successfully");
});

// ------------------------
// Get First Resource of a Topic
// ------------------------
const getFirstResourceOfTopic = asyncHandler(async (req, res) => {
  const resource = await Resource.findOne({ topic: req.params.topicId })
    .sort({ createdAt: 1 })
    .populate("topic unit branch semester subject addedBy", "name title"); // optional
  if (!resource)
    return errorResponse(res, "No resources found for this topic", 404);

  successResponse(res, resource, "First resource fetched successfully");
});

// ------------------------
// Get All Resources for a Specific Topic
// ------------------------
const getResourcesByTopic = asyncHandler(async (req, res) => {
  const resources = await Resource.find({ topic: req.params.topicId })
    .sort({ createdAt: -1 })
    .populate("unit branch semester subject addedBy", "name title"); // optional
  if (!resources || resources.length === 0)
    return errorResponse(res, "No resources found for this topic", 404);

  successResponse(res, resources, "Resources fetched successfully");
});

// ------------------------
// Get Resource by ID
// ------------------------
const getResourceById = asyncHandler(async (req, res) => {
  const resource = await Resource.findById(req.params.id)
    .populate("topic unit branch semester subject addedBy", "name title"); // optional
  if (!resource)
    return errorResponse(res, "Resource not found", 404);

  successResponse(res, resource, "Resource fetched successfully");
});

// ------------------------
// Export all functions
// ------------------------
module.exports = {
  signup,
  login,
  getDashboard,
  getBranches,
  addBranch,
  updateBranch,
  deleteBranch,
  getYears,
  addYear,
  updateYear,
  deleteYear,
  getSemesters,
  addSemester,
  updateSemester,
  deleteSemester,
  getSubjects,
  addSubject,
  updateSubject,
  deleteSubject,
  getUnits,
  addUnit,
  updateUnit,
  deleteUnit,
  getTopicsByUnit,
  getTopicsBySubject,
  addTopic,
  updateTopic,
  deleteTopic,
  addResource,
  updateResource,
  deleteResource,
  sanitizeFilename,
  cloudinaryUpload,
  getAllResources,
  getFirstResourceOfTopic,
  getResourcesByTopic,
  getResourceById,
};
