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
       console.log(messages)
       res.status(200).json({ messages: messages });
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

      res.status(200).json({ message: 'Reply successfully sent!' });
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
      res.status(200).json({ message: "Message Deleted!" });
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
      console.log(message)
      res.status(200).json({ message: "Message Updated!"});
    });
  }
}
