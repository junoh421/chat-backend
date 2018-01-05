const Conversation = require('../models/conversation');
const Message = require('../models/message');
const User = require('../models/user');

module.exports = {
  getConversations(req, res, next) {
    console.log(req.params.userId)
    Conversation.find({ users: req.params.userId })
    .select('_id users')
    .populate({
      path: 'users',
      select: 'userName fullName'
    })
    .exec(function(err, conversations) {
      if (err) {
        res.send({ error: err });
        return next(err);
      }
      console.log(conversations)
      return res.status(200).json({ conversations: conversations });
    });
  },
  getConversation(req, res, next) {
    Message.find({ conversationId: req.params.id })
     .select('createdAt content user')
     .sort('createdAt')
     .populate({
       path: 'user',
       select: 'userName fullName'
     })
     .exec(function(err, messages) {
       if (err) {
         res.send({ error: err });
         return next(err);
       }
       console.log(messages)
       res.status(200).json({ conversation: messages });
     });
  },
  startConversation(req, res, next) {
    if(!req.body.recipientId) {
      res.status(422).send({ error: 'Please choose a valid recipient for your conversation.' });
      return next();
    }

    const conversation = new Conversation({
      users: [req.body.userId, req.body.recipientId]
    });

    conversation.save(function(err, conversation) {
      if (err) {
        res.send({ error: err });
        return next(err);
      }

      res.status(200).json({ message: 'Conversation started!', conversation: conversation });
    });
  }
}
