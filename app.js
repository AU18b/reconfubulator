var express = require('express');
var bodyParser = require('body-parser');
var parse = require('./parse.js');

var app = express();
app.use(bodyParser.json());

var port = process.env.PORT || 8001;

app.post('/', post);

app.listen(port, function () {
    console.log('Server running on port ' + port + '.');
});

function post(request, response) {
    if (!request.body || !request.body.text) {
        response.status(400).send('You need to send some text, friend.');
        return;
    }

    var parsed = parse(request.body.text);

    var message = {
        'text': request.body.text,
        'out': parsed.players[0] + ' and ' + parsed.players[1] + ' played ' + parsed.score[0] + ':' + parsed.score[1] + ' against ' + parsed.players[2] + ' and ' + parsed.players[3] + '.'
    };
    response.setHeader('Content-Type', 'application/json');
    response.status(200).send(JSON.stringify(message));
}

module.exports = app;
