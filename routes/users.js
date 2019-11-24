const express = require('express');

const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  res.json([
    {
      id: 1,
      name: 'black dynamite'
    }
  ]);
});

module.exports = router;
