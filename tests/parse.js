const parse = require('./../parse.js');
var assert = require('assert');

describe('Parsing input strings', function() {
  it('easy', function() {
    let input = '@tom and @dick won against @harry and the @otherguy 10:2';

    let expected = { 
      players: [ '@tom', '@dick', '@harry', '@otherguy' ],
      score: [ '10', '2' ]
    };
    assert.equal(parse(input).players[0], expected.players[0]);
    assert.equal(parse(input).players[1], expected.players[1]);
    assert.equal(parse(input).players[2], expected.players[2]);
    assert.equal(parse(input).players[3], expected.players[3]);
    assert.equal(parse(input).score[0], expected.score[0]);
    assert.equal(parse(input).score[1], expected.score[1]);
  });

  it('player has number in his name', function() {
    let input = '@tom3 and @dick10789 won against @harry and the @otherguy 10:2';

    let expected = { 
      players: [ '@tom', '@dick', '@harry', '@otherguy' ],
      score: [ '10', '2' ]
    };
    assert.equal(parse(input).score[0], expected.score[0]);
    assert.equal(parse(input).score[1], expected.score[1]);
  });
    
  
});
