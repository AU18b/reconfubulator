const MatchModel = require('../../models/match.js');

module.exports = function(request, response) {
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
};