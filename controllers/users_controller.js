const User = require('../models/user');
const Conversation = require('../models/conversation');

module.exports = {
  getUsersInConversation(req, res, next) {
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
      return res.status(200).json({ users: conversation[0].users });
    });
  },
  getUsers(req, res, next) {
    User.find({ })
    .select('_id userName fullName')
    .exec(function(err, users) {
      if (err) {
        res.send({ error: err });
        return next(err);
      }

      console.log(users)
      res.status(200).json({ users: users });
    });
  },
  getUser(req, res, next) {
    console.log(req.params.id)
    User.find({_id: req.params.id })
    .exec(function(err, user) {
      if (err) {
        res.send({ error: err });
        return next(err);
      }

      res.status(200).json({ user: user });
    });
  },
  updateUser(req, res, next) {
    const id = req.params.id
    const email = req.body.email;
    const fullName = req.body.fullName;
    const userName = req.body.userName;
    const password = req.body.password;

    if (!email || !fullName || !userName || !password) {
    	return res.status(422).send({error: "You must provide information" });
    }

    User.findOne({ email: email}, function(error, existingUser) {
      if (error) { return next(err); }

      if (existingUser) {
        return res.status(422).send({error: "Email is in use"})
      }

      User.findOne({ userName: userName}, function(error, existingUser) {
        if (error) { return next(err); }

        if (existingUser) {
          return res.status(422).send({error: "Username is in use"})
        }
      })

      User.findById({_id: id})
      .exec(function(err, user) {

        if (err) {
          res.send({ error: err });
          return next(err);
        }

        user.email = email;
        user.fullName = fullName;
        user.userName = userName;
        user.password = password;

        user.save(function(err, user) {
          if (err) {return next(err); }

          res.json({
            message: "Profile Updated",
            user: user
          });
        });
      });
    });
  }
}
