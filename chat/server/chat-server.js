const Guid = require('guid');

const ChatServer = (() => {
  const liveBots = {};

  const createNewBot = merchant_id => {
    const newBot = {
      merchant_id,
      conversation: [],
      collectedData: {},
    };

    bot_id = Guid.create();

    liveBots[bot_id] = newBot;
    
    return bot_id;
  }

  const submitQuery = (bot_id, query) => {
    const bot = liveBots[bot_id];
    bot.conversation.push(query.message);
    
    const response = {
      options: [],
      is_running: true,
    };
    if(query.message.indexOf('my name is') > -1) {
      bot.collectedData.name = query.message.split('my name is ')[1];
      response.message = 'Ok';
    }
    if(query.message.indexOf('i love ') > -1) {
      if(!bot.collectedData.loved) {
        bot.collectedData.loved = [];
      } 
      bot.collectedData.loved.push(query.message.split('i love ')[1])
      response.message = 'Ok';
    }

    if(query.message.indexOf('what is my name') > -1){
      response.message =`Your name is ${ bot.collectedData.name}`;
    }

    if(query.message.indexOf('what i love') > -1) {
      response.message = `You love ${bot.collectedData.loved.join(', ')}`;
    }

    return response;
  }

  const startConversation = shop => {
    //TODO merchant_id = DB.getMerchantByShop(shop).id;
    const merchant_id = 0;
    bot_id = createNewBot(merchant_id);
    return {bot_id};
  };

  return {
    startConversation,
    submitQuery,
  };
})();

module.exports = ChatServer;