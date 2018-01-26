const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

const Message = require('../models/message');
const User = require('../models/user');
const Conversation = require('../models/conversation');

describe('messages controller', () => {
  let conversation, bob, joe

  beforeEach((done) => {
    conversation = new Conversation ( { } );

    bob = new User ({email: 'bobsmith@example.com', password: "sixchar1", fullName: "Bob Smith", userName: "bobsmith"});
    joe = new User ({email: 'joesmith@example.com', password: "sixchar1", fullName: "Joe Smith", userName: "joesmith"});

    conversation.users.push(bob, joe);

    Promise.all([ conversation.save(), bob.save(), joe.save()])
    .then( () => done());
  });

  it("returns first conversation's messages", (done) => {
    firstMessage = new Message ( { content: "bob's message content here", user: bob._id, conversationId: conversation._id} )
    secondMessage = new Message ( { content: "joe's message content here", user: joe._id, conversationId: conversation._id} )

    Promise.all([ firstMessage.save(), secondMessage.save()])
    .then(()=> {
      request(app)
        .get(`/api/messages/${conversation._id}`)
        .expect(200)
        .then(response => {
          assert(response.body.messages.length === 2)
          assert(response.body.messages[0]._id.toString() === firstMessage._id.toString())
          assert(response.body.messages[1]._id.toString() === secondMessage._id.toString())
          done()
        })
    })
  })


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
