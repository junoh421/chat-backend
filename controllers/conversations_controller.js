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
  startConversation(req, res, next) {
    let recipients = req.body.recipients;

    Conversation.findOne({ users: [...recipients]}, function(error, existingConversation) {
      if (error) { return next(err); }

      if (!recipients) {
        return res.status(422).send({error: "Please choose a valid recipient for your conversation"})
      }

      if (existingConversation) {
        return res.send({message: "Conversation in progress", conversation: existingConversation})
      }

      const newConversation = new Conversation({
        users: [...recipients]
      });

      newConversation.save(function(err, newConversation) {
        if (err) {return next(err); }
        res.status(200).json({
          message: "Conversation started!",
          conversation: newConversation
        });
      });
    });
  }
}
