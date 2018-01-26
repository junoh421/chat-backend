const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

const Message = require('../models/message');
const User = require('../models/user');
const Conversation = require('../models/conversation');


describe('conversations controller', () => {
  let firstConversation, secondConversation, bob, joe, steve, firstMessage

  beforeEach((done) => {
    firstConversation = new Conversation ( { } );
    secondConversation = new Conversation ( { } );

    bob = new User ({email: 'bobsmith@example.com', password: "sixchar1", fullName: "Bob Smith", userName: "bobsmith"});
    joe = new User ({email: 'joesmith@example.com', password: "sixchar1", fullName: "Joe Smith", userName: "joesmith"});
    steve = new User ({email: 'stevejohnson@example.com', password: 'sixchar1', fullName: "Steve Johnson", userName: "stevejohnson"});

    firstConversation.users.push(bob, joe);
    secondConversation.users.push(bob, steve);

    Promise.all([ firstConversation.save(), secondConversation.save(), bob.save(), joe.save(), steve.save()])
    .then( () => done());
  });

  it("returns bob's conversations", (done) => {
    request(app)
      .get(`/api/conversations/${bob._id}`)
      .expect(200)
      .then(response => {
        assert(response.body.conversations.length === 2)
        assert(response.body.conversations[0]._id.toString() === firstConversation._id.toString())
        assert(response.body.conversations[1]._id.toString() === secondConversation._id.toString())
        done()
      })
  })

  it("returns joe's conversations", (done) => {
    request(app)
      .get(`/api/conversations/${joe._id}`)
      .expect(200)
      .then(response => {
        assert(response.body.conversations.length === 1)
        assert(response.body.conversations[0]._id.toString() === firstConversation._id.toString())
        done()
      })
  })

  it("returns steve's conversations", (done) => {
    request(app)
      .get(`/api/conversations/${steve._id}`)
      .expect(200)
      .then(response => {
        assert(response.body.conversations.length === 1)
        assert(response.body.conversations[0]._id.toString() === secondConversation._id.toString())
        done()
      })
  })

  it('starts a conversation with bob, joe, and steve', (done) => {
    request(app)
    .post('/api/conversation')
    .send({
    	"recipients": [bob._id, joe._id, steve._id]
    })
    .then(response => {
      assert(response.body.conversation.users.length === 3)
      assert(response.body.conversation.users[0].toString() === bob._id.toString( ));
      assert(response.body.conversation.users[1].toString() === joe._id.toString());
      assert(response.body.conversation.users[2].toString() === steve._id.toString());
      done();
    })
  })
})
