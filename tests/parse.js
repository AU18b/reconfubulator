const parse = require('./../parse.js');
var assert = require('chai').assert;

describe('parse', function() {
  it('returns result object on proper input string', function() {
    let input = '@tom and @dick won against @harry and the @otherguy 10:2';

    let expected = { 
      players: [ '@tom', '@dick', '@harry', '@otherguy' ],
      score: [ '10', '2' ]
    };

    let result = parse(input);

    assert.equal(result.players[0], expected.players[0]);
    assert.equal(result.players[1], expected.players[1]);
    assert.equal(result.players[2], expected.players[2]);
    assert.equal(result.players[3], expected.players[3]);
    assert.equal(result.score[0], expected.score[0]);
    assert.equal(result.score[1], expected.score[1]);
  });

  it('throws error on missing player @names', function() {
    let wrapperWithoutArgs = function() {
      parse('Laura and Dennis crushed Peter + Mark today, winning 10:3');
    };
    assert.throws(wrapperWithoutArgs);
  });

  it('throws error on more than four player @names', function() {
    let wrapperWithoutArgs = function() {
      parse('@Laura and @Dennis crushed @Peter + @Mary and @Paul today, winning 10:3');
    };
    assert.throws(wrapperWithoutArgs);
  });

  it('throws error on missing scores', function() {
    let wrapperWithoutArgs = function() {
      parse('@Laura and @Dennis crushed @Peter + @Mary and today');
    };
    assert.throws(wrapperWithoutArgs);
  });

  it('can parse players with numbers in the name', function() {
    let input = '@tom3 and @dick10789 won against @ha12rry and the @otherguy 10:2';

    let expected = { 
      players: [ '@tom', '@dick10789', '@ha12rry', '@otherguy' ],
      score: [ '10', '2' ]
    };

    let result = parse(input);
    assert.equal(result.players[1], expected.players[1]);
    assert.equal(result.players[2], expected.players[2]);
    assert.equal(result.score[0], expected.score[0]);
    assert.equal(result.score[1], expected.score[1]);
  });
    
  
});
