const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect('mongodb://localhost/chat_test');
  mongoose.connection
  .once('open', () => {
    done();
   })
  .on('error', (error) => {
    console.log("Connecting...", error)
  });
});
//
beforeEach((done) => {
  const { message, conversation } = mongoose.connection.collections
  Promise.all([message.drop, conversation.drop])
    .then(() => done())
    .catch(() => done());
});
