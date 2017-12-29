const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationSchema = new Schema ({
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }],
  messages: [{
    type: Schema.Types.ObjectId,
    ref: 'message'
  }],
  startAt: new Date().getTime();
})

const conversation = mongoose.model('comment', ConversationSchema)

module.exports = conversation;
