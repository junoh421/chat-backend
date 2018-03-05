const Message = require('../models/message');
const User = require('../models/user');
const Conversation = require('../models/conversation');

module.exports = {
  getMessages(req, res, next) {
    Message.find({ conversationId: req.params.conversationId })
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

       Conversation.find({ _id: req.params.conversationId })
       .select('_id users')
       .populate({
         path: 'users',
         select: 'userName fullName'
       })
       .exec(function(err, conversation) {
         if (err) {
           res.send({ error: err });
           return next(err);
         }
         return res.status(200).json({ messages: messages, users: conversation[0].users });
       });
     });
  },
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

      Message.find({ _id: sentReply._id })
       .select('createdAt content user')
       .populate({
         path: 'user',
         select: '_id userName fullName'
       })
       .exec(function(err, message) {
         if (err) {
           res.send({ error: err });
           return next(err);
         }
         res.status(200).json({ message: 'Reply successfully sent!', reply: message});
       });

      return(next);
    })
  },
  deleteMessage(req, res, next) {
    const id = req.params.id;

    Message.findByIdAndRemove(id)
    .exec(function(err) {
      if (err) {
        res.send({ error: err });
        return next(err);
      }
      res.status(200).json({ message: "Message Deleted!", id: id});
    });
  },
  updateMessage(req, res, next) {
    const id = req.params.id;
    const content = req.body.content;

    Message.findByIdAndUpdate(id, { content: content}, {new: true})
    .exec(function(err, message) {
      if (err) {
        res.send({ error: err });
        return next(err);
      }
      res.status(200).json({ message: "Message Updated!", updatedMessage: message});
    });
  }
}
