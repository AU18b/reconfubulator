module.exports = function parse(text) {
  let playersRegex = /@[a-z0-9._-]+/gi;
  let scoreRegex = /([0-9]{1,2})/gi;
  let players = text.match(playersRegex);
  let textWithoutPlayers = text;
  
  if(!players || players.length ===0) {
    throw(new Error('Can\'t parse any players names from your input.'));
  }

  if(players.length > 4) {
    throw(new Error('Too many players in your input.'));
  }

  players.forEach(name => {
    textWithoutPlayers =  textWithoutPlayers.replace(new RegExp(name,'gm'),'');
  });
   
  let score = textWithoutPlayers.match(scoreRegex);
  
  if(!score || score.length != 2) {
    throw(new Error('Can\'t parse score from your input.'));
  }

  return { 'players': players, 'score': score };
};
