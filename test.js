var request = require('supertest-as-promised');
var app = require('./app');
var mongoose = require('mongoose');

describe('Using supertest for testing the API', function() {
    it('Create, read and delete a resource', function(done) {
        var title = 'x' + Math.random();
        request(app)
            .get('/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, [])
            .then(function post() {
                return request(app)
                    .post('/')
                    .send({ title: title, href: 'http://sap.com' })
                    .set('Content-Type', 'application/json')
                    .expect(201);
             }).then(function get() {
                 return request(app)
                    .get('/' + title)
                    .set('Accept', 'application/json')
                    .expect(200);
             }).then(function del() {
                  return request(app)
                      .del('/' + title)
                      .expect(204);
             }).then(function get2() {
                 request(app)
                    .get('/' + title)
                    .set('Accept', 'application/json')
                    .expect(404, done);
             });
    });

    it('Posting invalid resource returns 400', function(done) {
        var title = 'x' + Math.random();
        var link = {
            //title: title,
            href: 'http://sap.com'
        };
        request(app)
            .post('/')
            .send(link)
            .set('Content-Type', 'application/json')
            .expect(400, done);
    });
});
