const MessagesController = require('../controllers/messages_controller');
const ConversationsController = require('../controllers/conversations_controller');
const UsersController = require('../controllers/users_controller');
const Authentication = require('../controllers/authentication');
const passportService = require('../services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false} );
const requireSignin = passport.authenticate('local', { session: false} );

module.exports = (app) => {
  app.get('/', requireAuth, function(req, res) {
    res.send({message: "Logged In"})
  });
  app.post('/api/signin', requireSignin, Authentication.signin);
  app.post('/api/signup', Authentication.signup);
  app.get('/api/conversations/:userId', ConversationsController.getConversations);
  app.get('/api/conversation/:id', ConversationsController.getConversation);
  app.post('/api/conversation', ConversationsController.startConversation);
  app.post('/api/message', MessagesController.sendReply);
  app.get('/api/users', UsersController.getUsers);
  app.get('/api/user/:id', UsersController.getUser);
  app.put('/api/user/:id', UsersController.updateUser);
}
