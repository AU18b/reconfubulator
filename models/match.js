const mongoose = require('mongoose');

const matchSchema = mongoose.Schema({
  'match' : {
    required: [true, 'This is unacceptable, I need a match key to parse.'],
    validate: [{
      validator: function(v) {
        return !(v[0].score === 10 && v[1].score === 10);
      },
      message: 'There can not be two winners.'
    }, {
      validator: function(v) {
        return !(v[0].score != 10 && v[1].score != 10);
      },
      message: 'There must be at least one team with 10 goals, friend.'
    }],
    type: [{
      'team': {
        type: [String],
        required: [true, 'We need a team.'],
        validate: {
          validator: function(v) {
            return (v.length === 1 || v.length === 2);
          },
          message: 'Team size must be 1 or two. You gave me {{VALUE}}.'
        }
      },
      'score': { 
        type: Number, 
        required: [true, 'We need a result.'],
        min: [0, 'Number of goals can not be negative, friend.'],
        max: [10, 'Who are you trying to impress? "At 10 its done!"'],
      }
    }]
  }
});

module.exports = mongoose.model('Match', matchSchema);
