const MatchModel = require('./../../models/match.js');

module.exports = function(request, response) {
  let query = { 'match.team':  request.params.name };
  let limit = request.query.limit || 20;
  let sort = request.query.sort || '-_id';
  
  MatchModel
    .find(query)
    .limit(parseInt(limit))
    .sort(sort)
    .select('created match.team match.score _id')
    .exec(function (err, docs) {
      if (err) {
        response.status(404).send(err);
        return;
      }

      let result = { results: docs };

      result.query = {
        links: [
          { rel: 'self', href: request.url }
        ],
        limit: limit,
        sort: sort,
        size: docs.length
      };
      response.status(200).send(result);
    });
};
