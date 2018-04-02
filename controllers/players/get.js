const MatchModel = require('./../../models/match.js');

module.exports = function(request, response) {
  let query = { 'match.team':  request.params.name };
  let limit = parseInt(request.query.limit) || 20;
  let sort = request.query.sort || '-_id';
  
  MatchModel
    .find(query)
    .limit(limit)
    .sort(sort)
    .exec(function (err, docs) {
      if (err) {
        response.status(404).send(err);
        return;
      }
      response.status(200).send(docs);
    });
};
