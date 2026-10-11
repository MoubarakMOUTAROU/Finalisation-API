const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, uniqueName + extension);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp|pdf/;
  const extension = path.extname(file.originalname).toLowerCase().replace('.', '');
  const mimeOk = file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf';

  if (allowedTypes.test(extension) && mimeOk) {
    cb(null, true);
  } else {
    cb(new Error('Type de fichier non autorisé. Images et PDF uniquement.'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});

module.exports = upload;