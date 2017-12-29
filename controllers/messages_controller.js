const Message = require('../models/message')

module.exports = {
  start(req, res) {
    res.send({ hi: 'there'});
  },
  create(req, res, next) {
    const messageProps = req.body
    
    Message.create(messageProps).then(message => res.send(message))
    .catch(next)
  }
}
