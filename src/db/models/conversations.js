const mongoose = require('mongoose');

const { Schema } = mongoose;

const MessageSchema = new Schema({
  sender: { type: String, enum: ['BOT', 'USER'] },
  text: String,
});

const ConversationSchema = new Schema({
  // customerId: { type: Schema.Types.ObjectId, ref: 'customer' },
  messages: [MessageSchema],
});

const Conversation = mongoose.model('conversation', ConversationSchema);

module.exports = Conversation;
