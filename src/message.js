const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema ({
  content: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  sendAt: new Date().getTime();
})

const message = mongoose.model('comment', MessageSchema)

module.exports = message;
