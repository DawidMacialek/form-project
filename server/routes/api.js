const express = require('express');

const router = express.Router();

let dataRevieved = [];

router.post('/send', (req, res) => {
  dataRevieved.push(req.body);
  res.json({ message: 'The data has been recieved!' });
});
router.post('/update', (req, res) => {
  dataRevieved = [...req.body];
  res.json({ message: 'The data has been recieved!' });
});

router.get('/save', (req, res) => {
  res.end(JSON.stringify(dataRevieved));
});

module.exports = router;
