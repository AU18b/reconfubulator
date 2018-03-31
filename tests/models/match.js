const MatchModel = require('../../models/match');
const assert = require('assert');

describe('Test result score validation:', function() {
  it('10:9 is a valid result', function() {
    let match = { 'match': [{ 
              'team': ['Alejandra', 'Sergey'], 
              'score': 9
            }, {
              'team': ['Marcus', 'Ken'], 
              'score': 10
    }]};

    new MatchModel(match).validate()
      .then(function(){})
      .catch(
        assert.fail
      );
  });
/*
  it('no draw is allowed', function() {
    let match = 
            { 'match': [{ 
              'team': ['Alejandra', 'Sergey'], 
              'score': 7
            }, {
              'team': ['Marcus', 'Ken'], 
              'score': 7
            }]};
    let m = new MatchModel(match);
    assert.equal(m.validateSync(), true);
  });

  it('only one winner', function() {
    var match = 
            { 'match': [{ 
              'team': ['Alejandra', 'Sergey'], 
              'score': 10
            }, {
              'team': ['Marcus', 'Ken'], 
              'score': 10
            }]};
            let m = new MatchModel(match);
            assert.equal(m.validateSync(), false);
  });
*/
  it('score can\'t be higher than 10', function() {
    let match = { 'match': [{ 
        'team': ['Alejandra', 'Sergey'], 
        'score': 11
      }, {
        'team': ['Marcus', 'Ken'], 
        'score': 10
    }]};
    new MatchModel(match).validate()
      .then(assert.fail)
      .catch(function() {});
  });

  it('Score can\'t be lower than 0', function() {
    let match = 
      { 'match': [{ 
        'team': ['Alejandra', 'Sergey'], 
        'score': -1
      }, {
        'team': ['Marcus', 'Ken'], 
        'score': 10
      }]};
    new MatchModel(match).validate()
      .then(assert.fail)
      .catch(function() {});
  });

  it('Score can\'t be lower than 0', function() {
    let match = 
      { 'match': [{ 
        'team': ['Alejandra', 'Sergey'], 
        'score': -1
      }, {
        'team': ['Marcus', 'Ken'], 
        'score': 10
      }]};
    new MatchModel(match).validate()
      .then(assert.fail)
      .catch(function() {});
  });

  it('Score must be a number', function() {
    let match = 
      { 'match': [{ 
        'team': ['Alejandra', 'Sergey'], 
        'score': 'one'
      }, {
        'team': ['Marcus', 'Ken'], 
        'score': 10
      }]};
    new MatchModel(match).validate()
      .then(assert.fail)
      .catch(function() {});
  });

  it('Score must be set', function() {
    let match = 
      { 'match': [{ 
        'team': ['Alejandra', 'Sergey']
      }, {
        'team': ['Marcus', 'Ken'], 
        'score': 10
      }]};
    new MatchModel(match).validate()
      .then(assert.fail)
      .catch(function() {});
  });
});
