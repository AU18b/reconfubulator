const request = require('supertest');
const app = require('../../../app.js');
const assert = require('chai').assert;

describe('Testing the /player:name', function() {
  it('Retrieval after POST', function(done) {
    let uniquePlayerName = 'UniquePlayerName' + Math.floor((1 + Math.random()) * 0x10000);
    let message = 'text=@Laura and @' + uniquePlayerName + ' crushed @Peter + @Mary today, winning 10:0';
    request(app)
      .post('/')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send(message)
      .expect(201, '@Laura and @' + uniquePlayerName + ' played 10:0 against @Peter and @Mary.')
      .then(function get() {
        request(app)
          .get('/players/@' + uniquePlayerName)
          .set('Accept', 'application/json')
          .expect(200);
      })
      .then(function get() {
        request(app)
          .get('/players/@' + uniquePlayerName + '?limit=1&sort=created')
          .set('Accept', 'application/json')
          .expect(200)
          .end(function(err, res) {
            assert.equal(res.body.query.limit, 1);
            assert.equal(res.body.query.links[0].href, '/players/@'+ uniquePlayerName +'?limit=1&sort=created');
            assert.equal(res.body.query.size, 1);
            assert.equal(res.body.query.sort, 'created');
            done();
          });
      });
  });
});
