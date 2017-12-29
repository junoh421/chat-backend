const assert = require('assert');
const request = require('supertest');
const app = require('../app');

describe('express app', () => {
  it('handles a GET request', (done) => {
    request(app)
    .get('/messages')
    .end((err, response) => {
      assert(response.body.hi === 'there')
      done();
    })
  })

  it('handles a GET request', (done) => {
    request(app)
    .get('/conversations')
    .end((err, response) => {
      assert(response.body.hi === 'there')
      done();
    })
  })
})
