const Message = require('../models/message');
const User = require('../models/user');
const Conversation = require('../models/conversation');

module.exports = {
  sendReply(req, res, next) {
    const username = req.body.username;
    const conversationId = req.body.conversation_id;
    const content = req.body.content;
    const password = req.body.password;

    User.findOne({userName: username}, function(err, user) {
      if (!user) {
        res.status(422).send({ error: 'Username does not exist' });
        return next();
      }

      const reply = new Message({
        conversationId: conversationId,
        content: content,
        user: user._id
      });

      reply.save(function(err, sentReply) {
        if (!sentReply) {
          res.status(422).send({ error: 'Conversation does not exist' });
          return next();
        }

        res.status(200).json({ message: 'Reply successfully sent!' });
        return(next);
      })
    })
  }
}
