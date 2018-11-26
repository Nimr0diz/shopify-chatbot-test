const Guid = require('guid');
const DialogFlowApi = require('./dialogflow-api');


const ChatServer = (() => {
  const liveBots = {};
  DialogFlowApi.init();

  const createNewBot = merchant_id => {
    const newBot = {
      merchant_id,
      conversation: [],
      collectedData: {},
    };

    bot_id = Guid.create().value;

    liveBots[bot_id] = newBot;
    
    return bot_id;
  }

  const submitQuery = (bot_id, query) => {
    const bot = liveBots[bot_id];
    bot.conversation.push(query.message);
    return new Promise((resolve,reject) => {
      DialogFlowApi.sendQuery(bot_id,query.message)
        .then(response => {
          resolve({
            message: response.text,
            options: [],
            is_running: true,
          });
        });
    });
  };

  const startConversation = shop => {
    //TODO merchant_id = DB.getMerchantByShop(shop).id;
    const merchant_id = 0;
    bot_id = createNewBot(merchant_id);
    return new Promise((resolve,reject) => {
      DialogFlowApi.sendQuery(bot_id,'Hello')
        .then(response => {
          resolve({
            bot_id,
            message: response.text,
            options: [],
          });
        });
    });
  };

  return {
    startConversation,
    submitQuery,
  };
})();

module.exports = ChatServer;