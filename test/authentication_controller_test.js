const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = mongoose.model('user');

describe('authentication controller', () => {
  it.only('handles sigup', (done) => {
    request(app)
      .post('/api/signup')
      .send({
        email: 'testing123@example.com',
        password: "sixchar1",
        fullName: "Bob Smith",
        userName: "bobsmith"
      })
      .end(() => {
        User.findOne({ email: 'testing123@example.com'})
        .then( (user) => {
          assert( user.email === 'testing123@example.com')
          done()
        })
      })
  })
})
