const express = require('express');
const router = express.Router();

const ChatServer = require('./chat-server');

router.get('/init',(req,res) => {
  const initialResponse = ChatServer.startConversation(req.query.shop);
  res.send(JSON.stringify(initialResponse));
});

router.post('/sendQuery',(req,res) => {
  const response = ChatServer.submitQuery(req.query.bot_id,req.body);
  res.send(JSON.stringify(response));
});

module.exports = router;