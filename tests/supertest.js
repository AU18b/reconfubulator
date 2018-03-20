const request = require('supertest');
const app = require('./../app.js');

describe('Using supertest for testing the API', function() {
    it('POST without body.text returns 400', function() {
        let message =  "something=@Laura and @Dennis crushed @Peter + @Mary today, winning 10:0";
        request(app)
            .post('/')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(message)
            .expect(400);
    });

    it('POST with body.text', function() {
        let message = "text=@Laura and @Dennis crushed @Peter + @Mary today, winning 10:0";
        request(app)
            .post('/')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(message)
            .expect(200, "@Laura and @Dennis played 10:0 against @Peter and @Mary.");
    });
});
