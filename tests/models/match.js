const MatchModel = require('../../models/match');
const assert = require('chai').assert;
require('../../database');

describe('Match result model tests', function() {
  describe('Creation time:', function() {
    it('Automated creation of valid date', function(done) {
      let match = { 'match': [{ 
        'team': ['Alejandra', 'Sergey'], 
        'score': 9
      }, {
        'team': ['Marcus', 'Ken'], 
        'score': 10
      }]};
      
      let model = new MatchModel(match);
      model
        .save(function(err, row) {
          if (err) {
            assert.fail(err.message);
            done();
          } else {
            assert.notEqual(row.created, undefined);
            assert.equal(row.created.toString().substr(0, 16), new Date().toString().substr(0, 16));
          }
          done();
        });
    });

    it('If created is give, we won\'t mess with it', function(done) {
      let match = { 
        'created': 'Tue, 01 Jan 2008 22:00:00 GMT',
        'match': [{ 
          'team': ['Alejandra', 'Sergey'], 
          'score': 9
        }, {
          'team': ['Marcus', 'Ken'], 
          'score': 10
        }]};
        
      let model = new MatchModel(match);
      model
        .save(function(err, row) {
          if (err) {
            assert.fail(err);
          } else {
            assert.equal(row.created.toString(), new Date('2008-01-01T22:00:00.000Z'));
          }
          done();
        });
    });
  });

  describe('Get Winner:', function() {
    it('straight forward:', function() {
      let match = { 
        'created': 'Tue, 01 Jan 2008 22:00:00 GMT',
        'match': [{ 
          'team': ['Alejandra', 'Sergey'], 
          'score': 9
        }, {
          'team': ['Marcus', 'Ken'], 
          'score': 10
        }]};
        
      let model = new MatchModel(match);
      assert.include(model.winners, 'Marcus');
      assert.include(model.winners, 'Ken');
    });
  });
  

  describe('Pre save validation:', function() {
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
});
