const MessagesController = require('../controllers/messages_controller');
const ConversationsController = require('../controllers/conversations_controller');

module.exports = (app) => {
  app.get('/messages', MessagesController.start);
  app.get('/conversations', ConversationsController.start);

  app.post('/api/message', MessagesController.create);
  app.post('/api/conversations', ConversationsController.create);
}
