// const User = require('../models/User');
// const asyncHandler = require('../utils/asyncHandler');
// const { successResponse, errorResponse } = require('../utils/apiResponse');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');

// // Generate JWT
// const generateToken = (id, role) => {
//   return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
// };

// // ----------------------
// // Signup
// // ----------------------
// const signup = asyncHandler(async (req, res) => {
//   const { firstName, lastName, email, password, gender, role, adminCode } = req.body;

//   // Check if user already exists
//   const existingUser = await User.findOne({ email });
//   if (existingUser) {
//     return errorResponse(res, 'Email already registered', 400);
//   }

//   // If role is admin, validate adminCode
//   if (role === 'admin') {
//     if (adminCode !== process.env.ADMIN_CODE) {
//       return errorResponse(res, 'Invalid admin code', 403);
//     }
//   }

//   // Create user
//   const user = await User.create({
//     firstName,
//     lastName,
//     email,
//     password,
//     gender,
//     role,
//   });

//   const token = generateToken(user._id, user.role);
//   successResponse(res, { user, token }, 'User registered successfully', 201);
// });

// // ----------------------
// // Login
// // ----------------------
// const login = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });
//   if (!user) return errorResponse(res, 'Invalid credentials', 401);

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return errorResponse(res, 'Invalid credentials', 401);

//   const token = generateToken(user._id, user.role);
//   successResponse(res, { user, token }, 'Login successful');
// });

// module.exports = {
//   signup,
//   login,
// };


// const User = require('../models/User');
// const asyncHandler = require('../utils/asyncHandler');
// const { successResponse, errorResponse } = require('../utils/apiResponse');
// const jwt = require('jsonwebtoken');

// // Generate JWT
// const generateToken = (id, role) => {
//   return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
// };

// // ----------------------
// // Signup
// // ----------------------
// const signup = asyncHandler(async (req, res) => {
//   const { firstName, lastName, email, password, gender, role, adminCode } = req.body;

//   // Check if user already exists
//   const existingUser = await User.findOne({ email });
//   if (existingUser) {
//     return errorResponse(res, 'Email already registered', 400);
//   }

//   // If role is admin, validate adminCode
//   if (role === 'admin') {
//     if (adminCode !== process.env.ADMIN_CODE) {
//       return errorResponse(res, 'Invalid admin code', 403);
//     }
//   }

//   // Create user (password will be hashed automatically via pre-save hook)
//   const user = await User.create({
//     firstName,
//     lastName,
//     email,
//     password,
//     gender,
//     role,
//   });

//   const token = generateToken(user._id, user.role);
//   successResponse(res, { user, token }, 'User registered successfully', 201);
// });

// // ----------------------
// // Login
// // ----------------------
// const login = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });
//   if (!user) return errorResponse(res, 'Invalid credentials', 401);

//   // Use the comparePassword method from User.js
//   const isMatch = await user.comparePassword(password);
//   if (!isMatch) return errorResponse(res, 'Invalid credentials', 401);

//   const token = generateToken(user._id, user.role);
//   successResponse(res, { user, token }, 'Login successful');
// });

// module.exports = {
//   signup,
//   login,
// };


const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// ----------------------
// Signup
// ----------------------
const signup = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, gender, role, adminCode } = req.body;

  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) return errorResponse(res, 'Email already registered', 400);

  // Admin role validation
  if (role === 'admin') {
    if (adminCode !== process.env.ADMIN_CODE) {
      return errorResponse(res, 'Invalid admin code', 403);
    }
  }

  const user = await User.create({ firstName, lastName, email, password, gender, role });

  const token = generateToken(user._id, user.role);
  successResponse(res, { user, token }, 'User registered successfully', 201);
});

// ----------------------
// Login
// ----------------------
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return errorResponse(res, 'Invalid credentials', 401);

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return errorResponse(res, 'Invalid credentials', 401);

  const token = generateToken(user._id, user.role);
  successResponse(res, { user, token }, 'Login successful');
});

module.exports = {
  signup,
  login,
};
