const mongoose = require('mongoose');
const Conversation = require('./models/conversations');

// ES6 Promises
mongoose.Promise = global.Promise;

const databaseModule = (() => {
  const connect = ({
    server,
    port,
    database,
    username,
    password,
  }) => new Promise((resolve, reject) => {
    // Connect to mongodb
    mongoose.connect(
      `mongodb://${username}:${password}@${server}:${port}/${database}`,
      { useNewUrlParser: true },
    );
    mongoose.connection.once('open', () => {
      resolve();
    }).on('error', (error) => {
      reject(error);
    });
  });

  const saveConversation = ((messages) => {
    const msgs = messages.map((msg, i) => ({
      sender: i % 2 === 0 ? 'BOT' : 'USER',
      text: msg,
    }));

    const conversation = new Conversation({
      messages: msgs,
    });
    conversation.save();
  });

  return {
    connect,
    saveConversation,
  };
})();

module.exports = databaseModule;
