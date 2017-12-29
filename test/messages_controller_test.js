const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

const Message = mongoose.model('message')

describe('drivers controller', () => {
  it('handles a post request', (done) => {
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
})
