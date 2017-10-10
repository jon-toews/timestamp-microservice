const path = require('path');
const express = require('express');

const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views')); // this is the folder where we keep our pug files
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index', {
        title: 'timestamp microservice',
        name: 'http://exmaple-site.com/'
    });
})

app.get('/:date', parseDate)

app.listen(3000, function() {
    console.log('App listening on port 3000!')
})

function parseDate (req, res) {
    const dateString = req.params.date;

    let date = null;
    if (isNaN(dateString)) {
        date = new Date(dateString);
    } else {
        date = new Date(parseInt(dateString * 1000));
    }
    
    const unix = date.valueOf() / 1000;
    const natural = (date.toUTCString() === "Invalid Date") ? null: date.toUTCString();

    const dates = {
        unix,
        natural
    }
    res.json(dates);
}