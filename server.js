// Import necessary modules
const express = require('express');
const request = require('request');
const fs = require('fs');

// Create Express app
const app = express();

// Middleware
app.use(express.json());

// POST endpoint
app.post('/file', (req, res) => {
    const filepath = req.body.filepath;
    var options = {
      "method": "POST",
      "url": "https://api.metadefender.com/v4/file",
      "headers": {
        "apikey": "eaadd57348bc0258182c8f2bade895ce",
        "rule": "sanitize, dlp"
      },
      "formData": {
        "file": {
          value: fs.createReadStream(filepath),
          options: {
            filename: "aaaa"
          }
        }
      },
    };
       
    request(options, function (error, response, body) {
      if (error) {
        console.error("error: ", error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      console.log(body);
      res.status(response.statusCode).send(body);
    });
});

//GET endpoint
app.get('/file/:dataId', (req, res) => {
  const data_id = req.params.dataId;
  var options = {
    "method": "GET",
    "url": "https://api.metadefender.com/v4/file/" + data_id,
    "headers": {
      "apikey": "eaadd57348bc0258182c8f2bade895ce",
      "x-file-metadata": 1
    },
  };
     
  request(options, function (error, response, body) {
    if (error){
      console.error("error: ", error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    const data = JSON.parse(body);
    res.json(data);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});