const chaiHttp = require('chai-http');
const chai = require('chai');
const supertest = require('supertest');
const request = require('supertest');
const should = require('chai').should;
const expect = require('chai').expect;
const sinon = require('sinon');
require('sinon-as-promised');
const assert = chai.assert;

const User = require('../server/models').User;
const app = require('../app');

chai.use(chaiHttp);

let token = '';

api = supertest('http://localhost:3000');

const Usertest = {
  username: 'Nnana_Larhy',
  firstname: 'Natalie',
  lastname: 'Elizabeth',
  email: 'nnanalarhy@gmail.com',
  password: 'issastrongpassword',
  role_id: 1

};

describe('/POST user', () => {
  const endpoint = '/api/users';

  it('should fail when POST user is called without params', (done) => {
    request(app)
      .post(endpoint)
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        assert.equal(res.body.message, "Missing required field name");
        done();
      });
  });
  it('')

});

describe('Users', () => {
  it('should create user on /users/POST', (done) => {
    api.post('/api/users', (error, response, body) => {
      expect(response.statusCode).toEqual(201);
      expect(response.statusMessage).toEqual('User successful created');
      expect(body).to.equal(true);
    });
    done();
  })
  it('should Get all users', (done) => {
    api.get('/api/users', (error, response, body) => {
      expect(response.statusCode).toEqual(200);
      expect(response.statusMessage).toEqual('Cool');
    });
    done();
  })
  it('should list a single user', (done) => {
    api.get('/api/users/:id', (error, response, body) => {
      expect(response.statusCode).toEqual(200);
      expect(response.statusMessage).toEqual('Cool');
    });
    done();
  })
  it('should update a single user\'s information', (done) => {
    api.put('/api/users/:id', (error, response, body) => {
      expect(expect(response.statusCode).to.equal(200));
      expect(response.body.username).to.not.equal(null);
      expect(response.body.email).to.not.equal(null);
      expect(response.body.password).to.not.equal(null);

    });
    done();
  })
  it('should delete a user', (done) => {
    api.delete('/api/user/:id', (error, response, body) => {
      expect(response.statusCode).toEqual(204);
      expect(response.statusMessage).toEqual('Cool');
      expect(body).to.be.a('object');
    });
    done();
  })
})
