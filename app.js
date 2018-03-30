const express = require('express');
const bodyParser = require('body-parser');
require('./database');

const app = express();
app.use(bodyParser.urlencoded({ extended: true })); // slack
app.use(bodyParser.json());
app.use(require('./routes/routes'));

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Server running on port ' + port + '.');
});

module.exports = app;