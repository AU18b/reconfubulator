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

    let error = new MatchModel(match).validateSync();
    assert.equal(error, null);
  });

  it('no draw is allowed', function() {
    let match = 
      { 'match': [{ 
        'team': ['Alejandra', 'Sergey'], 
        'score': 7
      }, {
        'team': ['Marcus', 'Ken'], 
        'score': 7
      }]};
    let error = new MatchModel(match).validateSync();
    assert.notEqual(error, null);
  });

  it('only one winner', function() {
    let match = 
            { 'match': [{ 
              'team': ['Alejandra', 'Sergey'], 
              'score': 10
            }, {
              'team': ['Marcus', 'Ken'], 
              'score': 10
            }]};
    let error = new MatchModel(match).validateSync();
    assert.notEqual(error, null);
  });

  it('score can\'t be higher than 10', function() {
    let match = { 'match': [{ 
      'team': ['Alejandra', 'Sergey'], 
      'score': 11
    }, {
      'team': ['Marcus', 'Ken'], 
      'score': 10
    }]};
    let error = new MatchModel(match).validateSync();
    assert.notEqual(error, null);
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
    let error = new MatchModel(match).validateSync();
    assert.notEqual(error, null);
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
    let error = new MatchModel(match).validateSync();
    assert.notEqual(error, null);
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
    let error = new MatchModel(match).validateSync();
    assert.notEqual(error, null);
  });

  it('Score must be set', function() {
    let match = 
      { 'match': [{ 
        'team': ['Alejandra', 'Sergey']
      }, {
        'team': ['Marcus', 'Ken'], 
        'score': 10
      }]};
    let error = new MatchModel(match).validateSync();
    assert.notEqual(error, null);
  });

  it('Team size of 1 is possible', function() {
    let match = 
      { 'match': [{ 
        'team': ['Roman'],
        'score': 9
      }, {
        'team': ['Marcus', 'Ken'], 
        'score': 10
      }]};
    let error = new MatchModel(match).validateSync();
    assert.equal(error, null);
  });

  it('Team size of 3 is not possible', function() {
    let match = 
      { 'match': [{ 
        'team': ['Roman', 'Kay', 'Thorsten'],
        'score': 9
      }, {
        'team': ['Marcus', 'Ken'], 
        'score': 10
      }]};
    let error = new MatchModel(match).validateSync();
    assert.notEqual(error, null);
  });

  it('team must be set', function() {
    let match = 
      { 'match': [{ 
        'score': 9
      }, {
        'team': ['Marcus', 'Ken'], 
        'score': 10
      }]};
    let error = new MatchModel(match).validateSync();
    assert.notEqual(error, null);
  });

  it('there must be at least one team with 10 goals', function() {
    let match = 
      { 'match': [{ 
        'team': ['Parsa', 'Holger'], 
        'score': 9
      }, {
        'team': ['Marcus', 'Ken'], 
        'score': 9
      }]};
    let error = new MatchModel(match).validateSync();
    assert.notEqual(error, null);
  }); 
});
