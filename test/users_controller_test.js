const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

const User = mongoose.model('user')

describe('users controller', () => {
  let bob, joe, steve

  beforeEach((done) => {
    bob = new User ({email: 'bobsmith@example.com', password: "sixchar1", fullName: "Bob Smith", userName: "bobsmith"});
    joe = new User ({email: 'joesmith@example.com', password: "sixchar1", fullName: "Joe Smith", userName: "joesmith"});
    steve = new User ({email: 'stevejohnson@example.com', password: 'sixchar1', fullName: "Steve Johnson", userName: "stevejohnson"});

    Promise.all([bob.save(), joe.save(), steve.save()])
    .then( () => done());
  });

  it('returns all users', (done) => {
    request(app)
    .get('/api/users')
    .then(response => {
      assert(response.body.users.length === 3);
      assert(response.body.users[0]._id.toString() === bob._id.toString());
      assert(response.body.users[1]._id.toString() === joe._id.toString());
      assert(response.body.users[2]._id.toString() === steve._id.toString());
      done()
    })
  })

  it('return current user', (done) => {
    request(app)
    .get(`/api/user/${bob._id}`)
    .then(response => {
      assert(response.body.user.length === 1);
      assert(response.body.user[0]._id.toString() === bob._id.toString());
      done()
    })
  })

  it('updates current user', (done) => {
    request(app)
    .put(`/api/user/${bob._id}`)
    .send({
      email: 'testing123@example.com',
      password: "sixchar1",
      fullName: "Bob Smith",
      userName: "testing123"
    })
    .then(response => {
      assert(response.body.user.email === 'testing123@example.com')
      assert(response.body.user.userName === 'testing123')
      assert(response.body.message === 'Profile Updated');
      done()
    })
  })
})
