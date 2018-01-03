const User = require('../models/user');

module.exports = {
  getUsers(req, res, next) {
    User.find({ })
    .exec(function(err, users) {
      if (err) {
        res.send({ error: err });
        return next(err);
      }

      console.log(users)
      res.status(200).json({ users: users });
    });
  }
}
