const MessagesController = require('../controllers/messages_controller');
const ConversationsController = require('../controllers/conversations_controller');

module.exports = (app) => {
  app.get('/messages', MessagesController.start);
  app.get('/conversations', ConversationsController.start);

  app.post('/api/messages', MessagesController.create);
  app.put('/api/messages/:id', MessagesController.edit);
  app.delete('/api/messages/:id', MessagesController.delete);

  app.post('/api/conversations', ConversationsController.create);
  app.put('/api/conversations/:id', ConversationsController.edit);
  app.delete('/api/conversation/:id',  ConversationsController.delete);
}
