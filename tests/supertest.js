const request = require('supertest');
const app = require('./../app');
const assert = require('chai').assert;
const util = require('util');

describe('Supertest', function() {

  describe('POST /slack/streak', function() {
    it('returns playername and streak number', function(done) {
      const uniquePlayerName = slackify();
      const message = util.format('text=%s and %s crushed %s and %s today, winning %d:%d',
        slackify('Laura'),
        uniquePlayerName,
        slackify('Tom'),
        slackify('Mary'),
        10, 0);

      const expected = util.format('%s and %s played %d:%d against %s and %s.',
        slackify('Laura'),
        uniquePlayerName,
        10, 0,
        slackify('Tom'),
        slackify('Mary')
      );
      request(app)
        .post('/slack/result')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(message)
        .expect(201, expected)
        .then(function post() {
          request(app)
            .post('/slack/streak')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send('text=' +  uniquePlayerName)
            .expect(200)
            .end(function(err, res) {
              if(err) { 
                assert.fail(err); 
                return done(); 
              }

              assert.isOk(res.text);
              assert.match(res.text, /^<@[a-zA-Z0-9]+|@UniquePlayerName[0-9a-zA-Z]+> has won [0-9]+ game\(s\) in a row.*/);
              done();
            });

        }).catch(done);
    });
  });

  it('returns 400 on missing body.text', function(done) {
    let message =  'something=@Laura and @Dennis crushed @Peter + @Mary today, winning 10:0';
    request(app)
      .post('/slack/result')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send(message)
      .expect(400)
      .end(done);
  });

  it('returns 400 if body.text can not be parsed (missing goals)', function(done) {
    const message = util.format('text=%s and %s crushed %s and %s today',
      slackify('Laura'),
      slackify('Ben'),
      slackify('Tom'),
      slackify('Mary')
    );
    request(app)
      .post('/slack/result')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send(message)
      .expect(400)
      .end(done);
  });

  it('returns 400 if body.text can not be parsed (missing players)', function(done) {
    const message = 'text=Somebody played today 1 : 10';
    request(app)
      .post('/slack/result')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send(message)
      .expect(400)
      .end(done);
  });
});

/**
 * 
 * @param {*} name if omitted, we generate something unique
 */
const slackify = function(name) {
  if (!name) {
    return '<@' + Math.floor((1 + Math.random()) * 0x10000) + 'AAAAAA|UniquePlayerName' + Math.floor((1 + Math.random()) * 0x10000) + '>';
  } else {
    return '<@01234FFFFFF|' + name + '>';
  }
};
