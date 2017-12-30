const Conversation = require('../models/conversation')

module.exports = {
  create(req, res, next) {
    const conversationProps = req.body

    Conversation.create(conversationProps).then(conversation => res.send(conversation)).catch(next)
  },
  delete(req, res, next) {
    console.log(req);
    const conversationId = req.params.id;

    Conversation.findByIdAndRemove({ _id: conversationId})
    .then( conversation => res.status(204).send(mesage))
    .catch(next);
  }
}
