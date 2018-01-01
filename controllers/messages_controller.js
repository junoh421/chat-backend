const Message = require('../models/message')
const User = require('../models/user')


module.exports = {
  create(req, res, next) {
    message = new Message({
      content: req.body.content,
      user: req.body.userId
    })

    message.save()
    .then(message => res.send(message))
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
