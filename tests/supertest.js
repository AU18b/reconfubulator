const request = require('supertest');
const app = require('../app.js');

describe('Supertesting the API', function() {
  describe('Testing the / API (the reconfubulator)', function() {
    it('Missing body.text returns 400', function() {
      let message =  'something=@Laura and @Dennis crushed @Peter + @Mary today, winning 10:0';
      request(app)
        .post('/')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(message)
        .expect(400);
    });

    it('POST with body.text', function() {
      let message = 'text=@Laura and @Dennis crushed @Peter + @Mary today, winning 10:0';
      request(app)
        .post('/')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(message)
        .expect(200, '@Laura and @Dennis played 10:0 against @Peter and @Mary.');
    });
  });

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
            .expect(200)
            .end(done);
        });
    });
  });

  describe('Testing /results API (storage of results in mongodb)', function() {
    it('Create, read and delete a resource', function(done) {
      request(app)
        .get('/results')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(function post() {
    
          var match = 
                        { 'match': [{ 
                          'team': ['Alejandra', 'Sergey'], 
                          'score': 10
                        }, {
                          'team': ['Marcus', 'Ken'], 
                          'score': 7
                        }]};
    
          return request(app)
            .post('/results')
            .send(match)
            .set('Content-Type', 'application/json')
            .expect(201)
            .expect('Location', /\/5.*/);
        }).then(function get() {
          request(app)
            .get('/results')
            .set('Accept', 'application/json')
            .expect(200)
          // .expect('match')
            .end(done);
        });
    });
  });
});

