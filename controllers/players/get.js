const MatchModel = require('./../../models/match.js');

module.exports = function(request, response) {
  let query = { 'match.team':  request.params.name };

  MatchModel.find(
    query,
    function (err, docs) {
      if (err) {
        response.status(404).send(err);
        return;
      }
      response.status(200).send(docs);
    });
};
