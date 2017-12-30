const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

const Conversation = mongoose.model('conversation');
const Message = mongoose.model('message')

describe('conversations controller', () => {
  it('handles a post request', (done) => {
    Conversation.count().then( count => {
      request(app)
      .post('/api/conversations')
      .send({})
      .end(() => {
        Conversation.count().then(newCount => {
          assert(count + 1 === newCount);
          done();
        })
      })
    })
  })

  // it('handles a put request', (done) => {
  //   firstMessage = new Message ({ content: "New message here"});
  //   conversation = new Conversation ( { } );
  //   conversation.messages.push(firstMessage);
  //
  //   message.save()
  //   .then( () => {
  //     request(app)
  //       .put(`/api/conversations/${conversation._id}`)
  //       .send({ content: 'updated message content here'})
  //       .end(() => {
  //         Message.findOne({ content: 'updated message content here'})
  //         .then( message => {
  //           assert(message.content === 'updated message content here');
  //           done();
  //         })
  //       })
  //   })
  // })

  it('handles a delete request', (done) => {
    conversation = new Conversation ();

    conversation.save()
    .then( () => {
      request(app)
        .delete(`/api/conversations/${conversation._id}`)
        .end(() => {
          Conversation.findOne({id: conversation._id})
          .then( message => {
            assert(message === null);
            done();
          })
        })
    })
  })
})
