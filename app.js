const path = require('path');
const express = require('express');
const moment = require('moment');
const routes = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); // this is the folder where we keep our pug files
app.set('view engine', 'pug');

// static files
app.use(express.static('public'))

// homepage
app.get('/', (req, res) => {
    res.render('index', {
        title: 'timestamp microservice',
        name: 'http://example-site.com/'
    });
})

//api routes
app.use('/api', routes);

// error handling
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

app.use((err, req, res, next) => {
    console.error(err)
    res.status(err.status || 500);
    res.send(`${err.status} ${err.message}`);
})

module.exports = app;