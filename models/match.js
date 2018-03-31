const mongoose = require('mongoose');

const matchSchema = mongoose.Schema({
  'match' : [{
    'team': [String],
    'score': { 
      type: Number, 
      required: [true, 'We need a result.'],
      min: [0, 'Number of goals can not be negative, friend.'],
      max: [10, 'Who are you trying to impress? "At 10 its done!"'],
    }
  }]
});

module.exports = mongoose.model('Match', matchSchema);

