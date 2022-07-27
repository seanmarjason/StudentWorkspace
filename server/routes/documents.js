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
          const document = req.files.document;
          
          //Use the mv() method to place the file to uploads folder
          document.mv('./uploads/' + document.name);

          //send response
          res.send({
              status: true,
              message: 'File is uploaded',
              data: {
                  name: document.name,
                  mimetype: document.mimetype,
                  size: document.size
              }
          });
      }
  } catch (err) {
      res.status(500).send(err);
  }
});

module.exports = router;
