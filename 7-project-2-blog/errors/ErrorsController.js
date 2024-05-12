const express = require('express');
const router = express.Router();

router.get('/403', (req, res) => {
  res.send('404');
});

router.get('/404', (req, res) => {
  res.send('404');
});

module.exports = router;
