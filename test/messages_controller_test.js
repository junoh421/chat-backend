// const assert = require('assert');
// const request = require('supertest');
// const mongoose = require('mongoose');
// const app = require('../app');
//
// const Message = mongoose.model('message')
//
// describe('messages_controller', () => {
//   it('handles a post request', (done) => {
//     Message.count().then( count => {
//       request(app)
//       .post('/api/message')
//       .send({content: "testing message content"})
//       .end(() => {
//         Message.count().then(newCount => {
//           assert(count + 1 === newCount);
//           done();
//         })
//       })
//     })
//   })
//
//   it('handles a put request', (done) => {
//     message = new Message ( { content: 'test message content here'} )
//     message.save()
//     .then( () => {
//       request(app)
//         .put(`/api/messages/${message._id}`)
//         .send({ content: 'updated message content here'})
//         .end(() => {
//           Message.findOne({ content: 'updated message content here'})
//           .then( message => {
//             assert(message.content === 'updated message content here');
//             done();
//           })
//         })
//     })
//   })
//
//   it('handles a delete request', (done) => {
//     message = new Message ( { content: 'delete message here'} )
//
//     message.save()
//     .then( () => {
//       request(app)
//         .delete(`/api/messages/${message._id}`)
//         .end(() => {
//           Message.findOne({ content: 'delete message here'})
//           .then( message => {
//             assert(message === null);
//             done();
//           })
//         })
//     })
//   })
// })
