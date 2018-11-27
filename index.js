const path = require('path');
const request = require('request');
const cookie = require('cookie');
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();

const { appAddress } = require('./config');

app.set('views', path.join(__dirname, 'admin-panel/views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());

app.use(cors());

app.get('/', (req, res) => res.redirect('/admin-panel'));

app.use('/shopify', require('./shopify-auth'));

app.use('/admin-panel', require('./admin-panel'));

app.use('/chat', require('./chat'));

app.get('/addChat', (req, res) => {
  request.post({
    url: `https://${cookie.parse(req.headers.cookie).shop}/admin/script_tags.json`,
    headers: {
      'X-Shopify-Access-Token': cookie.parse(req.headers.cookie).access_token,
    },
    json: {
      script_tag: {
        event: 'onload',
        src: `${appAddress}/chat/client/main.js`,
      },
    },
  }, (response) => {
    res.send(response);
  });
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!'); // eslint-disable-line
});
