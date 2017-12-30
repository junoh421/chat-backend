const Conversation = require('../models/conversation')

module.exports = {
  start(req, res) {
    res.send({ hi: 'there'});
  },
  create(req, res, next) {
    const conversationProps = req.body

    Conversation.create(conversationProps).then(conversation => res.send(conversation)).catch(next)
  },
  edit(req, res, next) {
    const conversationId = req.params.id;
    const conversationProps = req.body;
    console.log(req.params)

    Conversation.findByIdAndUpdate({ _id: conversationId}, conversationProps)
    .then( () => Conversation.findById({ _id: conversationId}))
    .then( conversation => res.send(conversation))
    .catch(next);
  },
  delete(req, res, next) {
    console.log(req);
    const conversationId = req.params.id;

    Conversation.findByIdAndRemove({ _id: conversationId})
    .then( conversation => res.status(204).send(mesage))
    .catch(next);
  }
}
