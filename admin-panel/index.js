const express = require('express');
const router = express.Router();
const cookie = require('cookie');
const path = require('path');

const { apiKey } = require('../config');

router.get('/', (req,res) => {
  console.log(req.headers.cookie);
  res.render('home', {
    title: 'Home', 
    api_key: apiKey,
    shop:  req.headers.cookie  && cookie.parse(req.headers.cookie).shop,
  });
});

module.exports = router;