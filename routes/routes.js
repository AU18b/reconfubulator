const express = require('express');
const router = express.Router();

const postResult = require('../controllers/post.slack.result');
const postPlayerStreak = require('../controllers/post.slack.streak');

router.use(function timeLog(req, res, next) {
  console.log(new Date().toISOString(), req.protocol, req.method, req.url);
  next();
});

router.post('/slack/result', postResult);
router.post('/slack/streak', postPlayerStreak);

module.exports = router;
