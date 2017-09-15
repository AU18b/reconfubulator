var parse = function(text) {
    //var text = " @christoph, @alejandra;  @sergey@christophe hflksa 1 10"

    var playersRegex = /@[a-z0-9\._-]+/gi;
    players = text.match(playersRegex);
    //console.log(players)

    var scoreRegex = /[0-9]+/gi;
    score = text.match(scoreRegex);
    //console.log(score);

    var res = { 'players': players, 'score': score };

    return res;
};

module.exports = parse;
