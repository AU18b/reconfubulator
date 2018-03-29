
const parse = require('../../parse.js');
const MatchModel = require('../../models/match.js');

/**
 * POST /results/
 * Saving game result in a database
 */
module.exports = function(request, response) {
  if (!request.body || !request.body.text) {
    response.status(400).send('You need to send some text, friend. You gave me crap.');
    console.log(request);
    return;
  }
  
  let parsed = parse(request.body.text);
  getModel(parsed).save(function (err, row) {
    if (err) {
      response.status(500).send('I cound not save your data, the back-end says: ' + err);
      return;
    }

    let message = parsed.players[0] + ' and ' + parsed.players[1] + ' played ' + parsed.score[0] + ':' + parsed.score[1] + ' against ' + parsed.players[2] + ' and ' + parsed.players[3] + '.';

    return response
      .status(201)
      .set({
        'Location': '/' + row._id,
        'Content-Type': 'text/plain'
      })
      .send(message);
  });
};

function getModel(parsed) {
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

  return new MatchModel(storable);
}
