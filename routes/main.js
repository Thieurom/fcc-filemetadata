'use strict'

const express = require('express');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './user-upload');
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 204800 }  // 200KB
});

const router = express.Router();


router.get('/', (req, res) => {
  res.sendFile('index.html', { root: './public' })
});

router.post('/', (req, res, next) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      res.redirect('/error');
      return;
    }

    req.session.uploadedFileSize = req.file.size;
    res.redirect('/get-file-size');
  });
});

router.get('/get-file-size', (req, res) => {
  if (req.session.uploadedFileSize) {
    res.json({
      fileSize: req.session.uploadedFileSize
    });
  } else {
    res.json({ error: 'User didn\'t add any file.'});
  }
});

router.get('/error', (req, res) => {
  res.json({ error: 'Error with uploading file. Make sure you didn\'t upload a too large file. (>200KB)' });
});

module.exports = router;