const Message = require('../models/message')

module.exports = {
  start(req, res) {
    res.send({ hi: 'there'});
  },
  create(req, res) {
    const messageProps = req.body
    Message.create(messageProps).then(message => res.send(message))
  }
}
