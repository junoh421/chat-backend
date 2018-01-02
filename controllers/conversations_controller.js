const Conversation = require('../models/conversation');
const Message = require('../models/message');
const User = require('../models/user');

module.exports = {
  getConversations(req, res, next) {
    Conversation.find({ users: req.user._id })
    .select('_id')
    .exec(function(err, conversations) {
      if (err) {
        res.send({ error: err });
        return next(err);
      }
      // Set up empty array to hold conversations + most recent message
      let fullConversations = [];
      conversations.forEach(function(conversation) {
        Message.find({ 'conversationId': conversation._id })
          .sort('-createdAt')
          .limit(1)
          .populate({
            path: "user",
            select: "fullName"
          })
          .exec(function(err, message) {
            if (err) {
              res.send({ error: err });
              return next(err);
            }
            fullConversations.push(message);
            if(fullConversations.length === conversations.length) {
              return res.status(200).json({ conversations: fullConversations });
            }
          });
      });
    });
  },
  getConversation(req, res, next) {
    Message.find({ conversationId: req.params.id })
     .select('createdAt content user')
     .sort('-createdAt')
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
