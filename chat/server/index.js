const express = require('express');
const router = express.Router();

const ChatServer = require('./chat-server');

router.get('/init',(req,res) => {
  ChatServer.startConversation(req.query.shop)
    .then(initialResponse => res.send(JSON.stringify(initialResponse)));
});

router.post('/sendQuery',(req,res) => {
  ChatServer.submitQuery(req.query.bot_id,req.body)
    .then(response => res.send(JSON.stringify(response)));
});

module.exports = router;