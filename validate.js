var validate = function(result) {
  if (result.match) {
    return validateScores(result.match[0].score, result.match[1].score);
  }

  return false;
};



var validateScores = function(goalsTeam0, goalsTeam1) {
  if (goalsTeam0 === goalsTeam1) {
    console.log('draw!');
    return false; // no draw!
  }

  if (goalsTeam0 != 10 && goalsTeam1 != 10) {
    console.log('no winner!');
    return false; // at least one winner!
  }

  if (goalsTeam0 < 0 || goalsTeam1 < 0) {
    console.log('score too low!');
    return false; // score greater/equal  0
  }

  if (goalsTeam0 > 10 || goalsTeam1 > 10) {
    console.log('score too high!');
    return false; // score less or equal 10
  }

  return true;
};

module.exports = validate;