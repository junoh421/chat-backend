const Message = require('../models/message')

module.exports = {
  start(req, res) {
    res.send({ hi: 'there'});
  },
  create(req, res, next) {
    const messageProps = req.body

    Message.create(messageProps).then(message => res.send(message))
    .catch(next)
  },
  edit(req, res, next) {
    const messageId = req.params.id;
    const messageProps = req.body;

    Message.findByIdAndUpdate({ _id: messageId}, messageProps)
    .then( () => Message.findById({ _id: messageId}))
    .then( message => res.send(message))
    .catch(next);
  },
  delete(req, res, next) {
    const messageId = req.params.id;

    Message.findByIdAndRemove({ _id: messageId})
    .then( message => res.status(204).send(mesage))
    .catch(next);
  }
}
