var validate = require('./../validate.js');
var assert = require('assert');

describe('Test result score validation:', function() {
  it('10:9 is a valid result', function() {
    var match = 
            { 'match': [{ 
              'team': ['Alejandra', 'Sergey'], 
              'score': 10
            }, {
              'team': ['Marcus', 'Ken'], 
              'score': 9
            }]};
    assert.equal(validate(match), true);
  });
    
  it('no draw is allowed', function() {
    var match = 
            { 'match': [{ 
              'team': ['Alejandra', 'Sergey'], 
              'score': 7
            }, {
              'team': ['Marcus', 'Ken'], 
              'score': 7
            }]};
    assert.equal(validate(match), false);
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
    assert.equal(validate(match), false);
  });

  it('score cant be higher than 10', function() {
    var match = 
            { 'match': [{ 
              'team': ['Alejandra', 'Sergey'], 
              'score': 11
            }, {
              'team': ['Marcus', 'Ken'], 
              'score': 10
            }]};
    assert.equal(validate(match), false);
  });

  it('Score cant be lower than 0', function() {
    var match = 
            { 'match': [{ 
              'team': ['Alejandra', 'Sergey'], 
              'score': -1
            }, {
              'team': ['Marcus', 'Ken'], 
              'score': 10
            }]};
    assert.equal(validate(match), false);
  });
});
