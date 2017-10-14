const express = require('express');
const router = express.Router();
const timeController = require('../controllers/timeController');


router.get('/', timeController.currentDate, timeController.outputDate)
router.get('/:date', timeController.parseDate, timeController.outputDate)

module.exports = router;
