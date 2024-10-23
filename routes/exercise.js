const express = require('express');
const router = express.Router();

router.get('/exercise', (req, res) => {
  console.log(req.isAuthenticated());
  res.send('ex');
});

module.exports = router;
