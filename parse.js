module.exports = function parse(text) {
  const playersRegex = /<(@[0-9A-Z]+)(|\|[^>]+)>/gi;
  const scoreRegex = /([0-9]{1,2})/gi;
  const players = text.match(playersRegex);

  let textWithoutPlayers = text;

  if(!players || players.length === 0) {
    throw(new Error('Can\'t parse any players names from your input.'));
  }

  if(players.length > 4) {
    throw(new Error('Too many players in your input.'));
  }

  players.forEach(name => {
    textWithoutPlayers =  textWithoutPlayers.replace(new RegExp(name,'gm'),'');
  });

  const score = textWithoutPlayers.match(scoreRegex);
  
  if(!score || score.length != 2) {
    throw(new Error('Can\'t parse score from your input.'));
  }

  return { 'players': players, 'score': score };
};
