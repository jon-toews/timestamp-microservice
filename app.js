const path = require('path');
const express = require('express');
const moment = require('moment');

const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views')); // this is the folder where we keep our pug files
app.set('view engine', 'pug');

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'timestamp microservice',
        name: 'http://example-site.com/'
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
        date = moment(dateString);
    } else {
        date = moment.unix(dateString);
    }

    date.utc()

    const unix = date.unix();
    const natural = date.isValid() ? date.format('MMMM Do YYYY'): null;

    res.json({ unix, natural })

}