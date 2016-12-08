'use strict'

const express = require('express');
const session = require('express-session');
const main = require('./routes/main');

const PORT = process.env.PORT || 3000;
const SECRET = process.env.SECRET || 'very secret string';
const app = express();


// Setup session
app.use(session({
  secret: SECRET,
  resave: false,
  saveUninitialized: false
}));

// Serve static files
app.use(express.static('public'));

// Main route
app.use('/', main);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT} ...`);
});