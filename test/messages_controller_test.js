const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

const Message = mongoose.model('message')

describe('messages controller', () => {
  it('sends a message to conversation', (done) => {
    Message.count().then( count => {
      request(app)
      .post('/api/message')
      .send({content: "testing message content"})
      .end(() => {
        Message.count().then(newCount => {
          assert(count + 1 === newCount);
          done();
        })
      })
    })
  })

  it('updates message for a conversation', (done) => {
    message = new Message ( { content: 'test message content here'} )
    message.save()
    .then( () => {
      request(app)
        .put(`/api/message/${message._id}`)
        .send({ content: 'updated message content here'})
        .end(() => {
          Message.findOne({ content: 'updated message content here'})
          .then( message => {
            assert(message.content === 'updated message content here');
            done();
          })
        })
    })
  })

  it('delete message for a conversation', (done) => {
    message = new Message ( { content: 'delete message here'} )

    message.save()
    .then( () => {
      request(app)
        .delete(`/api/message/${message._id}`)
        .end(() => {
          Message.findOne({ content: 'delete message here'})
          .then( message => {
            assert(message === null);
            done();
          })
        })
    })
  })
})
