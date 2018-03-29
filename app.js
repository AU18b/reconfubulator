const express = require('express');
const bodyParser = require('body-parser');
const post = require('./controllers/results/post.js');
const getPlayerResults = require('./controllers/players/get.js');
const cfenv = require('cfenv');
const mongoose = require('mongoose');

const MatchModel = require('./models/match.js');
const validate = require('./validate.js');

const app = express();
app.use(bodyParser.urlencoded({ extended: true })); // slack
app.use(bodyParser.json());

const env = cfenv.getAppEnv();
const port = process.env.PORT || 3000;

const dbUri = env.isLocal ? 'mongodb://localhost/test' : env.getServices().mymongo.credentials.uri;
mongoose.connect(dbUri);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// routes
app.post('/', post);
app.get('/results/', getResults);
app.post('/results/', postResults);
app.get('/results/:id', getResultById);
app.get('/players/:name', getPlayerResults);

app.listen(port, function () {
  console.log('Server running on port ' + port + '.');
});

function getResults(request, response) {
  MatchModel.find(
    {},
    function (err, docs) {
      if (err) {
        response.status(404).send(err);
        return;
      }
      response.status(200).send(docs);
    });
}

function getResultById(request, response) {
  MatchModel.find(
    { '_id': request.params.id },
    function (err, docs) {
      if (err) {
        response.status(500).send(err);
        return;
      }

      if (docs.length === 0) {
        response.status(404).send();
        return;
      }

      response.status(200).send(docs);
    });
}

function postResults(request, response) {
  if (!request.body || !request.body.match) {
    response.status(400).send('You need to send me something like this: { "match": [{ "team": [String], "score": Number }]}');
    return;
  }

  if (!validate(request.body)) {
    response.status(400).send('Your scores look fishy. Check again.');
    return;
  }

  let data = new MatchModel(request.body);

  data.save(function (err, row) {
    if (err) {
      response.status(500).send(err);
    }
    response
      .status(201)
      .set('Location', '/' + row._id)
      .send();
  });
}

module.exports = app;