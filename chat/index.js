const express = require('express');
const router = express.Router();

router.use('/client', express.static( __dirname + '/client/' ));

module.exports = router;