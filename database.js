const cfenv = require('cfenv');
const mongoose = require('mongoose');
const env = cfenv.getAppEnv();

const dbUri = env.isLocal ? 'mongodb://localhost/test' : env.getServices().mymongo.credentials.uri;
mongoose.connect(dbUri);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

module.exports = db;


