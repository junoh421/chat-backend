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
    if(!req.body.recipient_id) {
      res.status(422).send({ error: 'Please choose a valid recipient for your message.' });
      return next();
    }

    if(!req.body.content) {
      res.status(422).send({ error: 'Please enter a message.' });
      return next();
    }

    const conversation = new Conversation({
      users: [req.body.user_id, req.body.recipient_id]
    });

    conversation.save(function(err, newConversation) {
      if (err) {
        res.send({ error: err });
        return next(err);
      }

      const message = new Message({
        conversationId: newConversation._id,
        content: req.body.content,
        user: req.body.user_id
      });

      message.save(function(err, newMessage) {
        if (err) {
          res.send({ error: err });
          return next(err);
        }

        res.status(200).json({ message: 'Conversation started!', conversationId: conversation._id });
        return next();
      });
    });
  }
}
