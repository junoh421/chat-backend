const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

const Conversation = mongoose.model('conversation');

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
})
