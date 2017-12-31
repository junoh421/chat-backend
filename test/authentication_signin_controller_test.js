const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = mongoose.model('user');

describe('authentication controller', () => {
  beforeEach((done) => {
    bob = new User ({
      email: 'testing123@example.com',
      password: "sixchar1",
      fullName: "Bob Smith",
      userName: "bobsmith"
    });

    bob.save().then( () => done());
  });

  it.only('handles successful signin and checks token in response', (done) => {
    request(app)
      .post('/api/signin')
      .send({
        email: 'testing123@example.com',
        password: "sixchar1",
      })
      .expect(200)
      .then(response => {
        assert(response.body["token"] !== null);
        done()
      })
  });
})
