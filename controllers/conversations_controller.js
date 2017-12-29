const Conversation = require('../models/conversation')

module.exports = {
  start(req, res) {
    res.send({ hi: 'there'});
  },
  create(req, res) {
    const conversationProps = req.body

    Conversation.create(conversationProps).then(conversation => res.send(conversation))
  }
}
