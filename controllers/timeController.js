const moment = require('moment');

exports.currentDate = (req, res, next) => {
    req.date = moment();
    next();
}


exports.parseDate = (req, res, next) => {
    const dateString = req.params.date;

    let date = null;

    if (isNaN(dateString)) {
        date = moment(dateString);
    } else {
        date = moment.unix(dateString);
    }

    date.utc()

    req.date = date;
    next();
}

exports.outputDate = (req, res) => {
    if(req.date && req.date.isValid()) {
        const date = req.date;
        res.json({
            unix: date.unix(),
            natural: date.format('MMMM Do YYYY')
        });
    } else {
        res.json({ unix: null, natural: null });
    }
}