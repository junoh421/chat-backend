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
  const { message, conversation, user } = mongoose.connection.collections
  message.drop(() => {
    conversation.drop(() => {
      user.drop(() => {
        done();
      })
    })
  })
});
