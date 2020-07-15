const express = require('express');
const router = express.Router();
const upload = require('../utils/file-upload');

const singleImageUpload = upload.single('image');

router.post('/image-upload', function (req, res) {
  singleImageUpload(req, res, (error) => {
    if (error) {
      return res.status(422).send({
        errors: [{ title: 'Invalid File Type', detail: error.message }]
      });
    }
    return res.json({ imageUrl: req.file.location });
  });
});

module.exports = router;
