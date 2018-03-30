const MatchModel = require('../../models/match');
const validate = require('../../validate');

module.exports = function(request, response) {
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
};