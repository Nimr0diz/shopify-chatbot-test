const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const crypto = require('crypto');
const cookie = require('cookie');
const nonce = require('nonce')();
const querystring = require('querystring');
const request = require('request-promise');

const apiKey = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;
const scopes = 'read_products,write_script_tags';
const forwardingAddress = process.env.APP_ADDRESS; // Replace this with your HTTPS Forwarding address

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.send('Hello World! <a href="/addChat">link!</a>');
});

app.get('/shopify', (req, res) => {
    const shop = req.query.shop;
    if (shop) {
      const state = nonce();
      const redirectUri = forwardingAddress + '/shopify/callback';
      const installUrl = 'https://' + shop +
        '/admin/oauth/authorize?client_id=' + apiKey +
        '&scope=' + scopes +
        '&state=' + state +
        '&redirect_uri=' + redirectUri;
  
      res.cookie('state', state);
      res.redirect(installUrl);
    } else {
      return res.status(400).send('Missing shop parameter. Please add ?shop=your-development-shop.myshopify.com to your request');
    }
  });

  app.get('/shopify/callback', (req, res) => {
    const { shop, hmac, code, state } = req.query;
    const stateCookie = cookie.parse(req.headers.cookie).state;
    
    res.cookie('shop', shop);

    if (state !== stateCookie) {
      return res.status(403).send('Request origin cannot be verified');
    }
  
    if (shop && hmac && code) {
      // DONE: Validate request is from Shopify
      const map = Object.assign({}, req.query);
      delete map['signature'];
      delete map['hmac'];
      const message = querystring.stringify(map);
      const providedHmac = Buffer.from(hmac, 'utf-8');
      const generatedHash = Buffer.from(
        crypto
          .createHmac('sha256', apiSecret)
          .update(message)
          .digest('hex'),
          'utf-8'
        );
      let hashEquals = false;
  
      try {
        hashEquals = crypto.timingSafeEqual(generatedHash, providedHmac)
      } catch (e) {
        hashEquals = false;
      };
  
      if (!hashEquals) {
        return res.status(400).send('HMAC validation failed');
      }
  
      // DONE: Exchange temporary code for a permanent access token
      const accessTokenRequestUrl = 'https://' + shop + '/admin/oauth/access_token';
      const accessTokenPayload = {
        client_id: apiKey,
        client_secret: apiSecret,
        code,
      };
  
      request.post(accessTokenRequestUrl, { json: accessTokenPayload })
      .then((accessTokenResponse) => {
        const accessToken = accessTokenResponse.access_token;

        res.cookie('access_token',accessToken);

        const shopRequestUrl = 'https://' + shop + '/admin/shop.json';
        const shopRequestHeaders = {
          'X-Shopify-Access-Token': accessToken,
        };
        
        request.get(shopRequestUrl, { headers: shopRequestHeaders })
        .then((shopResponse) => {
          res.status(200).end(shopResponse);
        })
        .catch((error) => {
          res.status(error.statusCode).send(error.error.error_description);
        });
      })
      .catch((error) => {
        res.status(error.statusCode).send(error.error.error_description);
      });
  
    } else {
      res.status(400).send('Required parameters missing');
    }
  });

  app.get('/products', function(req, res) {
    var next, previous, page;
    page = req.query.page ? ~~req.query.page:1;

    next = page + 1;
    previous = page == 1 ? page : page - 1;
    request.get({
        url: 'https://' +  cookie.parse(req.headers.cookie).shop + '/admin/products.json?limit=5&page=' + page,
        headers: {
            'X-Shopify-Access-Token':  cookie.parse(req.headers.cookie).access_token
        }
    }, function(error, response, body){
        body = JSON.parse(body);
        res.render('products', {
            title: 'Products', 
            api_key: apiKey,
            shop:  cookie.parse(req.headers.cookie).shop,
            next: next,
            previous: previous,
            products: body.products
        });
    })  
})

app.get('/addChat',(req,res) => {
  request.post({
    url: 'https://' +  cookie.parse(req.headers.cookie).shop + '/admin/script_tags.json',
    headers: {
        'X-Shopify-Access-Token':  cookie.parse(req.headers.cookie).access_token
    },
    json: {
      "script_tag": {
        "event": "onload",
        "src": forwardingAddress+"/chat/main.js"
      }
    }
}, function(response){
    res.send(response);
})  

});

app.use( "/chat" , express.static( __dirname + '/chat/' ));

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});