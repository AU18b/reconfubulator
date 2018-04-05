const request = require('supertest');
const app = require('./../app');

describe('Supertest: POST /slack/result', function() {
  it('returns 201 on success', function(done) {
    let uniquePlayerName = 'UniquePlayerName' + Math.floor((1 + Math.random()) * 0x10000);
    let message = 'text=@Laura and @' + uniquePlayerName + ' crushed @Peter + @Mary today, winning 10:0';
    request(app)
      .post('/slack/result')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send(message)
      .expect(201, '@Laura and @' + uniquePlayerName + ' played 10:0 against @Peter and @Mary.')
      .end(done);
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
    let message =  'text=@Laura and @Dennis crushed @Peter + @Mary today, winning';
    request(app)
      .post('/slack/result')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send(message)
      .expect(400)
      .end(done);
  });

  it('returns 400 if body.text can not be parsed (missing players)', function(done) {
    let message =  'text=Laura and Dennis crushed Peter + Mary today, winning 10:3';
    request(app)
      .post('/slack/result')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send(message)
      .expect(400)
      .end(done);
  });
});
