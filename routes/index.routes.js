const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const authMiddleware = require('../middlewares/auth')


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});


const upload = multer({ storage: storage });


let uploadedFiles = [];


router.get('/home', authMiddleware, (req, res) => {
  res.render('home', { files: uploadedFiles });
});


router.post('/upload-file', authMiddleware, upload.single('file'), (req, res) => {
  if (req.file) {
    const filePath = `/uploads/${req.file.filename}`; 
    uploadedFiles.push(filePath); 
    res.send({ message: 'File uploaded successfully', filePath: filePath });
  } else {
    res.status(400).send({ message: 'File upload failed' });
  }
});

module.exports = router;
