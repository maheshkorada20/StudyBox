// // //  const mongoose = require("mongoose");

// // // // const resourceSchema = new mongoose.Schema(
// // // //   {
// // // //     title: { type: String, required: [true, "Title is required"], trim: true },
// // // //     topic: { type: mongoose.Schema.Types.ObjectId, ref: "Topic", required: true },
// // // //     unit: { type: mongoose.Schema.Types.ObjectId, ref: "Unit" }, // optional

// // // //     // Multiple PDFs
// // // //     pdfs: [
// // // //       {
// // // //         url: { type: String },       // Cloudinary or file URL
// // // //         filename: { type: String },  // Original name for display/download
// // // //       },
// // // //     ],

// // // //     youtubeLinks: [
// // // //       { url: String, rank: Number } // rank = 1 (best), 2, 3...
// // // //     ],

// // // //     // Optional summary
// // // //     summary: { type: String, trim: true },

// // // //     tags: [{ type: String, trim: true }],
// // // //     difficulty: { type: String, enum: ["easy", "medium", "hard"], default: "medium" },
// // // //     addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

// // // //     // Stats
// // // //     rating: { type: Number, default: 0 },
// // // //     likes: { type: Number, default: 0 },
// // // //     views: { type: Number, default: 0 },

// // // //     // ✅ Recently viewed tracking
// // // //     viewsBy: [
// // // //       {
// // // //         user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
// // // //         viewedAt: { type: Date, default: Date.now },
// // // //       },
// // // //     ],

// // // //     // ✅ Favorite resources
// // // //     favorites: [
// // // //       {
// // // //         user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
// // // //         addedAt: { type: Date, default: Date.now },
// // // //       },
// // // //     ],
// // // //   },
// // // //   { timestamps: true }
// // // // );

// // // // module.exports = mongoose.model("Resource", resourceSchema);

// // // const resourceSchema = new mongoose.Schema(
// // //   {
// // //     title: { type: String, required: [true, "Title is required"], trim: true },
// // //     topic: { type: mongoose.Schema.Types.ObjectId, ref: "Topic", required: true },
// // //     unit: { type: mongoose.Schema.Types.ObjectId, ref: "Unit" }, // optional

// // //     branch: { type: mongoose.Schema.Types.ObjectId, ref: "Branch" },
// // //     year: { type: mongoose.Schema.Types.ObjectId, ref: "Year" },
// // //     semester: { type: mongoose.Schema.Types.ObjectId, ref: "Semester" },
// // //     subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },

// // //     // Multiple PDFs
// // //     pdfs: [
// // //       { url: String, filename: String },
// // //     ],

// // //     youtubeLinks: [{ url: String, rank: Number }],

// // //     summary: { type: String, trim: true },

// // //     tags: [{ type: String, trim: true }],
// // //     difficulty: { type: String, enum: ["easy", "medium", "hard"], default: "medium" },
// // //     addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

// // //     rating: { type: Number, default: 0 },
// // //     likes: { type: Number, default: 0 },
// // //     views: { type: Number, default: 0 },

// // //     viewsBy: [
// // //       { user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, viewedAt: { type: Date, default: Date.now } },
// // //     ],

// // //     favorites: [
// // //       { user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, addedAt: { type: Date, default: Date.now } },
// // //     ],
// // //   },
// // //   { timestamps: true }
// // // );

// // // module.exports = mongoose.model("Resource", resourceSchema);


 // const mongoose = require("mongoose");

// // // const resourceSchema = new mongoose.Schema(
// // //   {
// // //     title: { type: String, required: [true, "Title is required"], trim: true },
// // //     topic: { type: mongoose.Schema.Types.ObjectId, ref: "Topic", required: true },
// // //     unit: { type: mongoose.Schema.Types.ObjectId, ref: "Unit" }, // optional

// // //     // Multiple PDFs
// // //     pdfs: [
// // //       {
// // //         url: { type: String },       // Cloudinary or file URL
// // //         filename: { type: String },  // Original name for display/download
// // //       },
// // //     ],

// // //     youtubeLinks: [
// // //       { url: String, rank: Number } // rank = 1 (best), 2, 3...
// // //     ],

// // //     // Optional summary
// // //     summary: { type: String, trim: true },

// // //     tags: [{ type: String, trim: true }],
// // //     difficulty: { type: String, enum: ["easy", "medium", "hard"], default: "medium" },
// // //     addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

// // //     // Stats
// // //     rating: { type: Number, default: 0 },
// // //     likes: { type: Number, default: 0 },
// // //     views: { type: Number, default: 0 },

// // //     // ✅ Recently viewed tracking
// // //     viewsBy: [
// // //       {
// // //         user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
// // //         viewedAt: { type: Date, default: Date.now },
// // //       },
// // //     ],

// // //     // ✅ Favorite resources
// // //     favorites: [
// // //       {
// // //         user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
// // //         addedAt: { type: Date, default: Date.now },
// // //       },
// // //     ],
// // //   },
// // //   { timestamps: true }
// // // );

// // // module.exports = mongoose.model("Resource", resourceSchema);


 const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"], trim: true },
    topic: { type: mongoose.Schema.Types.ObjectId, ref: "Topic", required: true },
    unit: { type: mongoose.Schema.Types.ObjectId, ref: "Unit" }, // optional

    branch: { type: mongoose.Schema.Types.ObjectId, ref: "Branch" },
    year: { type: mongoose.Schema.Types.ObjectId, ref: "Year" },
    semester: { type: mongoose.Schema.Types.ObjectId, ref: "Semester" },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },

  pdfs: [
    {
      url: { type: String, required: true },
      filename: { type: String },
      fileType: { type: String, enum: ["file", "url"], default: "file" }
    }
  ],
  pdfUrls: [
  {
    url: { type: String, required: true },
    filename: { type: String }
  }
],
//pdfUrls: [{ type: String }],

    youtubeLinks: [{ url: String, rank: Number }],

    summary: { type: String, trim: true },

    tags: [{ type: String, trim: true }],
    difficulty: { type: String, enum: ["easy", "medium", "hard"], default: "medium" },
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    rating: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },

    viewsBy: [
      { user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, viewedAt: { type: Date, default: Date.now } },
    ],

    favorites: [
      { user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, addedAt: { type: Date, default: Date.now } },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resource", resourceSchema);


//  const mongoose = require("mongoose");
// const resourceSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   topic: { type: mongoose.Schema.Types.ObjectId, ref: "Topic", required: true },
//   unit: { type: mongoose.Schema.Types.ObjectId, ref: "Unit" },
//   branch: { type: mongoose.Schema.Types.ObjectId, ref: "Branch" },
//   year: { type: mongoose.Schema.Types.ObjectId, ref: "Year" },
//   semester: { type: mongoose.Schema.Types.ObjectId, ref: "Semester" },
//   subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
//   summary: { type: String, default: "" },
//   youtubeLinks: [
//     {
//       url: { type: String },
//       title: { type: String },
//       rank: { type: Number, default: 1 }
//     }
//   ],
//   pdfs: [
//     {
//       url: { type: String, required: true },
//       filename: { type: String },
//       fileType: { type: String, enum: ["file", "url"], default: "file" }
//     }
//   ],
//   pdfUrls: [{ type: String }],
//   tags: [{ type: String }],
//   difficulty: { type: String, enum: ["easy", "medium", "hard"], default: "easy" },
//   addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   rating: { type: Number, default: 0 },
//   likes: { type: Number, default: 0 },
//   views: { type: Number, default: 0 },
//   viewsBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
//   favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
// }, { 
//   timestamps: true,
//   strictPopulate: false  // <-- disables strict populate globally for this schema
// });

// module.exports = mongoose.model("Resource", resourceSchema);
