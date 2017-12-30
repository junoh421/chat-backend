const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationSchema = new Schema ({
  recipient: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  messages: [{
    type: Schema.Types.ObjectId,
    ref: 'message'
  }],
  startAt: {
    type: String,
    default: new Date().getTime()
  }
})

const conversation = mongoose.model('conversation', ConversationSchema)

module.exports = conversation;
