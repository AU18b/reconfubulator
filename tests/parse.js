const parse = require('./../parse.js');
const assert = require('chai').assert;

describe('parse', function() {
  it('returns result object on proper slack input string', function() {
    const input = '<@U321ABCDEF|tom> and <@U714ABCDEF|dick> won against <@U333ABCDEF|harry> and the <@U016ABCDEF|otherguy> 10:2';

    const expected = { 
      players: [ '<@U321ABCDEF|tom>', '<@U714ABCDEF|dick>', '<@U333ABCDEF|harry>', '<@U016ABCDEF|otherguy>' ],
      score: [ '10', '2' ]
    };

    const result = parse(input);

    assert.equal(result.players[0], expected.players[0]);
    assert.equal(result.players[1], expected.players[1]);
    assert.equal(result.players[2], expected.players[2]);
    assert.equal(result.players[3], expected.players[3]);
    assert.equal(result.score[0], expected.score[0]);
    assert.equal(result.score[1], expected.score[1]);
  });

  it('throws error on missing player @names', function() {
    let wrapperWithoutArgs = function() {
      parse('Laura and @Dennis crushed <Peter> + Mark today, winning 10:3');
    };
    assert.throws(wrapperWithoutArgs);
  });

  it('throws error on more than four player @names', function() {
    let wrapperWithoutArgs = function() {
      parse('<@U321ABCDEF|tom> and <@U714ABCDEF|dick> won against <@U333ABCDEF|harry>, the <@U016ABCDEF|otherguy> and <@U116ABCDCF|john> today, winning 10:3');
    };
    assert.throws(wrapperWithoutArgs);
  });

  it('throws error on missing scores', function() {
    let wrapperWithoutArgs = function() {
      parse('<@U321ABCDEF|tom> and <@U714ABCDEF|dick> won against <@U333ABCDEF|harry> and the <@U016ABCDEF|otherguy> today');
    };
    assert.throws(wrapperWithoutArgs);
  });

  it('can parse players with numbers in the name', function() {
    let input = '<@U321ABCDEF|tom123> and <@U714ABCDEF|dick> won against <@U333ABCDEF|h8rry> and the <@U016ABCDEF|otherguy> 10:2';

    let expected = { 
      players: [ '<@U321ABCDEF|tom123>', '<@U714ABCDEF|dick>', '<@U333ABCDEF|h8rry>' ],
      score: [ '10', '2' ]
    };

    let result = parse(input);
    assert.equal(result.players[0], expected.players[0]);
    assert.equal(result.players[2], expected.players[2]);
    assert.equal(result.score[0], expected.score[0]);
    assert.equal(result.score[1], expected.score[1]);
  });

  it('can parse players without the name part', function() {
    let input = '<@U321ABCDEF> and <@U714ABCDEF|dick> won against <@U333ABCDEF> and the <@U016ABCDEF> 10:2';

    let expected = { 
      players: [ '<@U321ABCDEF>' ]
    };

    let result = parse(input);
    assert.equal(result.players[0], expected.players[0]);
  });
    
  
});
