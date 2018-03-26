
const parse = require('../../parse.js');
const MatchModel = require('../../models/match.js');

module.exports = function(request, response) {
  if (!request.body || !request.body.text) {
    response.status(400).send('You need to send some text, friend.');
    return;
  }
  
  let parsed = parse(request.body.text);
  storeResult(parsed);
  
  let message = parsed.players[0] + ' and ' + parsed.players[1] + ' played ' + parsed.score[0] + ':' + parsed.score[1] + ' against ' + parsed.players[2] + ' and ' + parsed.players[3] + '.';
  response.setHeader('Content-Type', 'text/plain');
  response.status(200).send(message);
};

function storeResult(parsed) {
  let storable = {
    'match' : [{
      'team': [parsed.players[0], parsed.players[1]],
      'score': parsed.score[0] 
    },
    {
      'team': [parsed.players[2], parsed.players[3]],
      'score': parsed.score[1] 
    }]
  };

  let data = new MatchModel(storable);

  data.save(function (err, row) {
    if (err) {
      response.status(500).send('I cound not save your data, the back-end says: ' + err);
    }
    /*response
      .status(201)
      .set('Location', '/' + row._id)
      .send();*/
  });
}

