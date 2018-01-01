const Message = require('../models/message');
const User = require('../models/user');
const Conversation = require('../models/conversation');

module.exports = {
  sendReply(req, res, next) {
    const reply = new Message({
      conversationId: req.body.conversation_id,
      content: req.body.content,
      user: req.body.user_id
    });

    reply.save(function(err, sentReply) {
      if (err) {
        res.send({ error: err });
        return next(err);
      }

      res.status(200).json({ message: 'Reply successfully sent!' });
      return(next);
    })
  }
}
