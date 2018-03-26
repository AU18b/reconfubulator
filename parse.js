module.exports = parse;

function parse(text) {
  //var text = " @christoph, @alejandra;  @sergey@christophe hflksa 1 10"

  let playersRegex = /@[a-z0-9._-]+/gi;
  let scoreRegex = /[0-9]+/gi;
  let players = text.match(playersRegex);
  let score = text.match(scoreRegex);
  //console.log(score);

  return { 'players': players, 'score': score };
}
