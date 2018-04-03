const MatchModel = require('./../../models/match.js');
const util = require('util');

module.exports = function(request, response) {
  let name = request.body.text;
  let query = { 'match.team':  name };

  MatchModel
    .find(query)
    .sort('-created')
    .exec(function (err, docs) {
      if (err) {
        response.status(500).send('Something went wrong, may this information here help ya: ' + err);
        return;
      }

      if (docs.length === 0) {
        response.status(404).send('This fella here, "' + name + '", doesnt exist in this database. Better check your data.');
        return;
      }

      let result = '';

      let won = true;
      let c = 0;
      while(won === true && docs[c]) {
        let winningTeam = (docs[c].match[0].score === 10) ? docs[c].match[0].team : docs[c].match[1].team;
        won = winningTeam.includes(name);

        if (won) { 
          result += util.format('\nVICTORY with %s \tagainst %s!'
            ,  getTeamMate(name, docs[c].match)
            , getOpponents(name, docs[c].match)
          );
          c++; 
        }

      }
      let slackMessage = '';
      if (c > 0) {
        slackMessage = util.format('%s has won %d games in a row: '
          , name
          , c
        );
      } else {
        slackMessage = name + ' is going through a difficult time. Don\'t ask.';
      }
      response
        .status(200)
        .set({
          'Content-Type': 'text/plain'
        })
        .send(slackMessage + result);
    });
};

function getTeamMate(player, match) {
  let myTeam = match[0].team.includes(player) ? match[0].team : match[1].team;
  return (myTeam[0] === player) ? myTeam[1] : myTeam[0];
}

function getOpponents(player, match) {
  let losers = match[0].team.includes(player) ? match[1].team : match[0].team;
  return util.format('%s \tand \t%s', losers[0], losers[1]);
}