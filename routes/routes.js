const MessagesController = require('../controllers/messages_controller');
const ConversationsController = require('../controllers/conversations_controller');
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

  app.post('/api/messages', MessagesController.create);
  app.put('/api/messages/:id', MessagesController.edit);
  app.delete('/api/messages/:id', MessagesController.delete);

  app.get('/api/conversation/:id', ConversationsController.read);
  app.post('/api/conversations', ConversationsController.create);
  app.delete('/api/conversation/:id',  ConversationsController.delete);
}
