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
  if(req.session.loggedIn) {
    try {
      if(!req.files) {
        res.send({
          status: false,
          message: 'No file uploaded'
        });
      } else {
        //use name of form-data 'file' to fetch uploaded file
        const file = req.files.file;
        
        //use mv() method to place the file to uploads folder
        file.mv('./uploads/' + file.name);

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
  } else {
    res.status(401).send("You are cheating!");
  }
});

module.exports = router;
