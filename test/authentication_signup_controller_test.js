const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = mongoose.model('user');

describe('authentication controller', () => {
  it('handles successful sigup', (done) => {
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
  });

  it('check token in response', (done) => {
    request(app)
      .post('/api/signup')
      .send({
        email: 'testing123@example.com',
        password: "sixchar1",
        fullName: "Bob Smith",
        userName: "bobsmith"
      })
      .expect(200)
      .then(response => {
        assert(response.body["token"] !== null);
        done()
      })
  });

  it('handles user with same email', (done) => {
    bob = new User ({email: 'testing123@example.com', password: "sixchar1", fullName: "Bob Smith", userName: "bobsmith"});
    bob.save().then(() => done());

    User.count().then( count => {
      request(app)
      .post('/api/signup')
      .send({
        email: 'testing123@example.com',
        password: "sixchar1",
        fullName: "Bob Smith",
        userName: "bobsmith"
      })
      .end(() => {
        User.count().then(newCount => {
          assert(count === newCount);
          done();
        })
      })
    });
  })
})
