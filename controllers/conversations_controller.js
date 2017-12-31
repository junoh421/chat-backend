const Conversation = require('../models/conversation')

module.exports = {
  read(req, res, next) {
    const conversationId = req.params.id;

    Conversation.findById({ _id: conversationId})
    .populate({
        path: 'messages',
        populate: {
          path: 'user',
          model: 'user',
        }
      }
    ).then(conversation => res.send(conversation)).catch(next)
  },
  create(req, res, next) {
    const conversationProps = req.body

    Conversation.create(conversationProps).then(conversation => res.send(conversation)).catch(next)
  },
  delete(req, res, next) {
    const conversationId = req.params.id;

    Conversation.findByIdAndRemove({ _id: conversationId})
    .then( conversation => res.status(204).send(conversation))
    .catch(next);
  }
}
