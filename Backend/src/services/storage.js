const path = require('path');
const fs = require('fs');

// Upload file locally
const uploadFile = async (file) => {
  if (!file) throw new Error('No file provided');

  // Ensure uploads directory exists
  const uploadDir = path.join(__dirname, '../../uploads');
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  // Sanitize filename: replace spaces, remove brackets, etc.
  const sanitizedName = file.originalname
    .replace(/\s+/g, '_')      // replace spaces with _
    .replace(/\[|\]/g, '')     // remove brackets
    .replace(/[^a-zA-Z0-9_.-]/g, ''); // remove other special chars

  const filePath = path.join(uploadDir, `${Date.now()}-${sanitizedName}`);
  fs.writeFileSync(filePath, file.buffer);

  // Return relative URL for frontend access
  return `/uploads/${path.basename(filePath)}`;
};

module.exports = { uploadFile };
