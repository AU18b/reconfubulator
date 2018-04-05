const request = require('supertest');
const app = require('../../../app');
const assert = require('chai').assert;

describe('Supertesting the /slack/streak API', function() {
  describe('Testing the /slack/streak API (the reconfubulator)', function() {
    it('POST with body.text', function(done) {
      let uniquePlayerName = '@UniquePlayerName' + Math.floor((1 + Math.random()) * 0x10000);
      let message = 'text=@Laura and ' + uniquePlayerName + ' crushed @Peter + @Mary today, winning 10:0';
      request(app)
        .post('/slack/result')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(message)
        .expect(201, '@Laura and ' + uniquePlayerName + ' played 10:0 against @Peter and @Mary.')
        .then(function post() {
          request(app)
            .post('/slack/streak')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send("text=@Laura")
            .expect(200)
            .end(function assertificate(err, res) {
              if(err) { console.log(err); assert.fail(err); return; }

              console.log(res.body);

              assert.isOk(res.body);
              assert.equal(res.body, /^@UniquePlayerName[a-zA-Z0-9]+ has won 1 games in a row.*/);
              done();
            });

        }).catch(done);
    });
  });
});

