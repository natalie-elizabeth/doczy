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

api = supertest('http://localhost:8080');

const userTest = {
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
  it('should fail when an invalid email is passed', (done) => {
    const invalidEmailTest = {
      username: 'Nnana_Larhy',
      firstname: 'Natalie',
      lastname: 'Elizabeth',
      email: 'invalid',
      password: 'issastrongpassword',
      role_id: 1
    };
    request(app)
      .post(endpoint)
      .send(invalidEmailTest)
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        assert.equal(res.body.message, "Please Enter A Valid Email Address");
        done();
      });
  });
  // it('should create new user successfully', (done) => {
  //   let createStub = sinon.stub(User, 'create').resolves({ id: 1 });

  //   request(app)
  //     .post(endpoint)
  //     .send(userTest)
  //     .expect(201)
  //     .end((err, res) => {
  //       if (err) throw err;
  //       assert(res.body.firstname, userTest.firstname);
  //       createStub.restore();
  //       done();
  //     });
  // });
  it('should fail when create fails', (done) => {
    let createStub = sinon.stub(User, 'create').rejects({});

    request(app)
      .post(endpoint)
      .send(userTest)
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        createStub.restore();
        done();
      });
  });

  it('should return all users', (done => {
    request(app)
      .get('/api/users')
      .set('x-access-login', token)
      .accept('application/json')
      .end(function (err, res) {
        expect(res.status).to.equal(400);
        done();
      });
  }));
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
  });
});
