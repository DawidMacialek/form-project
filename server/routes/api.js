const express = require('express');

const router = express.Router();

const dataRevieved = [];

router.post('/send', (req, res) => {
  // console.log(req.body);
  dataRevieved.push(req.body);
  console.log(dataRevieved);

  res.json({ message: 'The data has been recieved!' });
});

router.get('/save', (req, res) => {
  res.end(JSON.stringify(dataRevieved));
});

module.exports = router;
