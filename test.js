var request = require('supertest');
var app = require('./app');

describe('Using supertest for testing the API', function() {
    it('POST without body.text returns 400', function(done) {
        var message = { 'something else': '@Laura and @Dennis crushed @Peter + @Mary today, winning 10:0' };
        request(app)
            .post('/')
            .send(message)
            .set('Accept', 'application/json')
            .expect(400, done);
    });

    it('POST with body.text', function(done) {
        var message = { 'text': '@Laura and @Dennis crushed @Peter + @Mary today, winning 10:0' };
        request(app)
            .post('/').send(message)
            .set('Accept', 'application/json')
            .expect(200, done);
    });
});
