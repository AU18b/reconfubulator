const MatchModel = require('../../models/match');

/**
 * POST /results/
 * Storing well formed JSON into mongo database. Validation included.
 * @param {*} request 
 * @param {*} response 
 */
module.exports = function(request, response) {
  if (!request.body || !request.body.match) {
    response.status(400).send('You need to send me something like this: { "match": [{ "team": [String], "score": Number }]}');
    return;
  }
  
  let data = new MatchModel(request.body);
  
  data.validate().catch(function(err) {
    response.status(400).send('Your scores look fishy. Check again. \n' + err);
    return;
  }).then(function() {
    data.save(function (err, row) {
      if (err) {
        response.status(500).send(err);
      }
      response
        .status(201)
        .set('Location', '/' + row._id)
        .send();
    });
  });
};
