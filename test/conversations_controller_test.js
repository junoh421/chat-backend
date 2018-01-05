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
//     bob = new User ({email: 'testing123@example.com', password: "sixchar1", fullName: "Bob Smith", userName: "bobsmith"});
//     joe = new User ({email: 'testing1234@example.com', password: "sixchar1", fullName: "Joe Smith", userName: "joesmith"});
//
//     conversation.users.push(joe, bob)
//     console.log(conversation)
//
//     Promise.all([ conversation.save(), joe.save(), bob.save()])
//     .then( () => done());
//   });
//
//   it('handles a get request', (done) => {
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
//   it.only('handles a post request', (done) => {
//     Conversation.find( { $and: [ {user: bob._id }, { user: joe._id } ] }).then( conversation => {
//       console.log(conversation.users)
//     })
//
//     request(app)
//     .post('/api/conversation')
//     .send({
//     	"userId":"5a4968f22b9a6996b7e484a2",
//     	"recipientId":"5a4a65e7a23b7cc44dedfa6b"
//     })
//     .then(response => {
//       done();
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
