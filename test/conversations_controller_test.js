// const assert = require('assert');
// const request = require('supertest');
// const mongoose = require('mongoose');
// const app = require('../app');
//
// const Message = require('../models/message');
// const User = require('../models/user');
// const Conversation = require('../models/conversation');
//
//
// describe('conversations controller', () => {
//   let conversation, firstMessage, secondMessage;
//
//   beforeEach((done) => {
//     conversation = new Conversation ( { } );
//     firstMessage = new Message ( { content: 'first message'} )
//     secondMessage = new Message ( { content: 'second message'} )
//
//     conversation.messages.push(firstMessage, secondMessage)
//     console.log(conversation)
//
//     Promise.all([ conversation.save(), firstMessage.save(), secondMessage.save()])
//     .then( () => done());
//   });
//
//   it.only('handles a get request', (done) => {
//     request(app)
//       .get(`/api/conversations/${conversation._id}`)
//       .expect(200)
//       .then(response => {
//         assert(response.body.messages[0]._id.toString() === firstMessage._id.toString())
//         assert(response.body.messages[1]._id.toString() === secondMessage._id.toString())
//         done()
//       })
//   })
//
//   it('handles a post request', (done) => {
//     Conversation.count().then( count => {
//       request(app)
//       .post('/api/conversation')
//       .send({})
//       .end(() => {
//         Conversation.count().then(newCount => {
//           assert(count + 1 === newCount);
//           done();
//         })
//       })
//     })
//   })
//
//   it('handles a delete request', (done) => {
//     conversation = new Conversation ();
//
//     conversation.save()
//     .then( () => {
//       request(app)
//         .delete(`/api/conversations/${conversation._id}`)
//         .end(() => {
//           Conversation.findOne({id: conversation._id})
//           .then( message => {
//             assert(message === null);
//             done();
//           })
//         })
//     })
//   })
// })
