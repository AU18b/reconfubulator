module.exports = function parse(text) {
  //var text = " @christoph, @alejandra;  @sergey@christophe hflksa 1 10"

  let playersRegex = /@[a-z0-9._-]+/gi;
  let scoreRegex = /([0-9]{1,2})/gi;
  let players = text.match(playersRegex);
  var textWithoutPlayers = text;
  
  players.forEach(name => {
    textWithoutPlayers =  textWithoutPlayers.replace(new RegExp(name,'gm'),'');
  });
   
  let score = textWithoutPlayers.match(scoreRegex);

  return { 'players': players, 'score': score };
};
