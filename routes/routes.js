const express = require('express');
const router = express.Router();

const postFromSlack = require('../controllers/post');
const postResultJson = require('../controllers/results/post');
const getPlayerResults = require('../controllers/players/get');
const getResults = require('../controllers/results/get');
const getResultById = require('../controllers/results/getById');

//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log(new Date().toISOString(), req.protocol, req.method, req.url);
  next();
});

// routes
router.post('/', postFromSlack);
router.get('/results/', getResults);
router.post('/results/', postResultJson);
router.get('/results/:id', getResultById);
router.get('/players/:name', getPlayerResults);

module.exports = router;
