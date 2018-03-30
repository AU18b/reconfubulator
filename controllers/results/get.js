const MatchModel = require('../../models/match.js');

module.exports = function(request, response) {
  MatchModel.find(
    {},
    function (err, docs) {
      if (err) {
        response.status(404).send(err);
        return;
      }
      response.status(200).send(docs);
    });
};