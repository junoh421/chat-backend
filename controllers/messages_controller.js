const Message = require('../models/message');
const User = require('../models/user');
const Conversation = require('../models/conversation');

module.exports = {
  sendReply(req, res, next) {
    const userId = req.body.userId;
    const conversationId = req.body.conversationId;
    const content = req.body.content;

    const reply = new Message({
      conversationId: conversationId,
      content: content,
      user: userId
    });

    reply.save(function(err, sentReply) {
      if (!sentReply) {
        res.status(422).send({ error: 'Conversation does not exist' });
        return next();
      }

      res.status(200).json({ message: 'Reply successfully sent!' });
      return(next);
    })
  }
}
