const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationSchema = new Schema ({
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }],
  },
  {
  timestamps: true
})

module.exports = mongoose.model('conversation', ConversationSchema)
