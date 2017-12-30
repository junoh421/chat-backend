const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

const Conversation = mongoose.model('conversation');
const Message = mongoose.model('message');

describe('conversations controller', () => {
  let conversation, firstMessage, secondMessage;

  beforeEach((done) => {
    conversation = new Conversation ( { } );
    firstMessage = new Message ( { content: 'first message'} )
    secondMessage = new Message ( { content: 'second message'} )

    conversation.messages.push(firstMessage, secondMessage)

    Promise.all([ conversation.save(), firstMessage.save(), secondMessage.save()])
    .then( () => done());
  });



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

  it.only('handles a put request', (done) => {
    done();
  })

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
