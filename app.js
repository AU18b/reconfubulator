const express = require('express');
const bodyParser = require('body-parser');
const parse = require('./parse.js');
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

app.post('/', postReconfubulator);
app.get('/results/', getResults);
app.post('/results/', postResult);
app.get('/results/:id', getResultById);
app.delete('/results/:id', deleteResult);

app.listen(port, function () {
  console.log('Server running on port ' + port + '.');
});

function postReconfubulator(request, response) {
  if (!request.body || !request.body.text) {
    response.status(400).send('You need to send some text, friend.');
    return;
  }

  let parsed = parse(request.body.text);
  //storeResult(parsed);

  let message = parsed.players[0] + ' and ' + parsed.players[1] + ' played ' + parsed.score[0] + ':' + parsed.score[1] + ' against ' + parsed.players[2] + ' and ' + parsed.players[3] + '.';
  response.setHeader('Content-Type', 'text/plain');
  response.status(200).send(message);
}

/*
function storeResults(parsed) {
  let storableResult = {
    'match' : [{
      'team': [parsed.players[0], parsed.players[1]],
      'score': parsed.score[0] 
    },
    {
      'team': [parsed.players[2], parsed.players[3]],
      'score': parsed.score[1] 
    }]
  };
}*/

function deleteResult(request, response) {
  MatchModel.find(
    { 'id': request.params.id },
    function (err) {
      if (err) {
        response.status(500).send(err);
        return;
      }
    }).remove(function() {
    response.sendStatus(204);
  });
}

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

function postResult(request, response) {
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