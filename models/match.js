var mongoose = require('mongoose');

var matchSchema = mongoose.Schema({
  'match' : [{
    'team': [String],
    'score': Number 
  }]
});

module.exports = mongoose.model('Match', matchSchema);