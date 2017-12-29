const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema ({
  content: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  sendAt: {
    type: String,
    default: new Date().getTime()
  }
})

const message = mongoose.model('message', MessageSchema)

module.exports = message;
