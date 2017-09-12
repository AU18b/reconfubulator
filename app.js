var express = require('express');
var bodyParser = require('body-parser');
var cfenv = require('cfenv');
var mongoose = require('mongoose');

var app = express();
app.use(bodyParser.json());

// We'll need the environment to connect to the database
var env = cfenv.getAppEnv();
var port = process.env.PORT || 3000;

var dbUri = env.isLocal ? 'mongodb://localhost/test' : env.getServices().dump.credentials.uri;
mongoose.connect(dbUri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// route listing all items
app.get('/', get);
// route to create a new item
app.post('/', post);
// route to show an individual item
app.get('/:title', getByTitle);
// route to delete an item
app.delete('/:title', del);

app.listen(port, function () {
    console.log('Server running on port ' + port + '.');
});

var linkSchema = mongoose.Schema({
    title: String,
    href: String,
    added: String
});

var LinkModel = mongoose.model('Link', linkSchema);

function del(request, response) {
     var link = LinkModel.find(
       { 'title': request.params.title },
        function (err, docs) {
            if (err) {
                response.status(500).send(err);
                return;
            }
    }).remove(function() {
        response.sendStatus(204);
    });
}

function get(request, response) {
    var link = LinkModel.find(
        {},
        function (err, docs) {
            if (err) {
                response.status(404).send(err);
                return;
            }
            response.status(200).send(docs);
    });
}

function getByTitle(request, response) {
    LinkModel.find(
       { 'title': request.params.title },
        function (err, docs) {
            if (err) {
                response.status(500).send(err);
                return;
            }

            if (docs.length === 0) {
                response.status(404).send();
                return;
            }

            response.status(200).send(docs);
    });
}

function post(request, response) {
    if (!request.body || !request.body.title || !request.body.href) {
        response.status(400).send('You need title and href friend.');
        return;
    }

    var testData = new LinkModel({
        title: request.body.title,
        href: request.body.href,
        added: new Date().toUTCString()
    });

    testData.save(function (err, row) {
        if (err) {
            response.status(500).send(err);
        }
    });
    response.status(201).send();
}

module.exports = app;
