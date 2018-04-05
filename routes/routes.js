const express = require('express');
const router = express.Router();

const postResult = require('../controllers/post.slack.result');

//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log(new Date().toISOString(), req.protocol, req.method, req.url);
  next();
});

// routes
router.post('/slack/result', postResult);

module.exports = router;
