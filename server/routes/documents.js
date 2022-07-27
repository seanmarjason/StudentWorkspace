const express = require('express');
const router = express.Router();

const response = {
  key: 'value'
}

/* Placeholder to download document. */
router.get('/download', (req, res, next) => {
  res.json(response);
});

/* Upload document. */
router.post('/upload', async (req, res) => {
  try {
      if(!req.files) {
          res.send({
              status: false,
              message: 'No file uploaded'
          });
      } else {
          //Use name of input field 'document' to fetch uploaded file
          const file = req.files.file;

          console.log(req.body);
          
          //Use the mv() method to place the file to uploads folder
          file.mv('./uploads/' + file.name);

          //send response
          res.send({
              status: true,
              message: 'File is uploaded',
              data: {
                  name: file.name,
                  mimetype: file.mimetype,
                  size: file.size
              }
          });
      }
  } catch (err) {
      res.status(500).send(err);
  }
});

module.exports = router;
