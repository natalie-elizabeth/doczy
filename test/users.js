const chaiHttp = require('chai-http');
const chai = require('chai');
const supertest = require('supertest');
const request = require('supertest');
const should = require('chai').should;
const expect = require('chai').expect;
const sinon = require('sinon');
require('sinon-as-promised');
const assert = chai.assert;
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY || 'some secret';

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

describe('POST user', () => {
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

  it('should not login an invalid user', done => {
    let findOneStub = sinon.stub(User, 'findOne').rejects();

    request(app)
      .post('/api/users/login')
      .send({
        email: 'john.doe@gmail.com',
        password: 'issastrongpassword'
      })
      .expect(401)
      .end((err, res) => {
        if (err) throw err;
        assert.equal(res.body.message, "invalid");
        findOneStub.restore();
        done();
      });
  });

  it('should fail when user not found', done => {
    let findOneStub = sinon.stub(User, 'findOne').resolves();

    request(app)
      .post('/api/users/login')
      .send({
        email: 'john.doe@gmail.com',
        password: 'issastrongpassword'
      })
      .expect(403)
      .end((err, res) => {
        if (err) throw err;
        assert.equal(res.body.message, "Invalid user");
        findOneStub.restore();
        done();
      });
  });

  it('Should fail with wrong password and email combination', (done) => {
    const saltRounds = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync('issaStrongPassword', saltRounds);
    let findOneStub = sinon.stub(User, 'findOne').resolves({ password, id: 1 });

    request(app)
      .post('/api/users/login')
      .send({
        email: 'stuff',
        password: 'wrongpassword'
      })
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        assert(res.body.message, "password or email is incorrect");
        findOneStub.restore();
        done();
      });
  });

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
  it('should create new user successfully', (done) => {
    let createStub = sinon.stub(User, 'create').resolves({ id: 1 });
    request(app)
      .post('/api/users')
      .send(userTest)
      .expect(201)
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
        expect(res.status).to.equal(401);
        done();
      });
  }));


  // deletion tests
  it('should successfully delete a user', (done) => {
    let findByIdStub = sinon.stub(User, 'findById').resolves({
      destroy: () => new Promise((resolve, reject) => {
        resolve(true);
      })
    });
    let destroyStub = sinon.stub(User, 'destroy').resolves({});
    request(app)
      .delete('/api/users/1')
      .set('x-access-token', token)
      .expect(204)
      .end(function (err, res) {
        findByIdStub.restore();
        destroyStub.restore();
        done();
      });
  });
  it('should fail to delete', (done) => {
    let findByIdStub = sinon.stub(User, 'findById').rejects();
    request(app)
      .delete('/api/users/1')
      .set('x-access-token', token)
      .expect(400)
      .end(function (err, res) {
        findByIdStub.restore();
        done();
      });
  });

  it('should fail to delete if id is not found', (done) => {
    let findByIdStub = sinon.stub(User, 'findById').resolves();
    request(app)
      .delete('/api/users/1')
      .set('x-access-token', token)
      .expect(404)
      .end(function (err, res) {
        findByIdStub.restore();
        done();
      });
  });

  it('should fail to delete a user ', (done) => {
    let findByIdStub = sinon.stub(User, 'findById').resolves({
      destroy: () => new Promise((resolve, reject) => {
        reject();
      })
    });
    let destroyStub = sinon.stub(User, 'destroy').resolves({});
    request(app)
      .delete('/api/users/1')
      .set('x-access-token', token)
      .expect(400)
      .end(function (err, res) {
        findByIdStub.restore();
        destroyStub.restore();
        done();
      });
  });
  it('should fail to find user', (done) => {
    let findAllStub = sinon.stub(User, 'findAll').rejects();
    request(app)
      .get('/api/search/users')
      .set('x-access-token', token)
      .expect(400)
      .end(function (err, res) {
        findAllStub.restore();
        done();
      });
  });
  it('should fail to retrieve one user when error occurs', done => {
    let findByIdStub = sinon.stub(User, 'findById').rejects();
    request(app)
      .get('/api/users/1')
      .set('x-access-token', token)
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        findByIdStub.restore();
        done();
      });
  });
  it('should fail to retrieve one user', done => {
    let findByIdStub = sinon.stub(User, 'findById').resolves();
    request(app)
      .get('/api/users/1')
      .set('x-access-token', token)
      .expect(404)
      .end((err, res) => {
        if (err) throw err;
        findByIdStub.restore();
        done();
      });
  });
  it('should fail to retrieve all available users', done => {
    let findAllStub = sinon.stub(User, 'findAll').rejects();
    request(app)
      .get('/api/users')
      .set('x-access-token', token)
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        findAllStub.restore();
        done();
      });
  });
  it('should update fields sucessfully', (done) => {
    let findByIdStub = sinon.stub(User, 'findById').resolves({
      update: () => new Promise((resolve, reject) => resolve({}))
    });
    // let updateStub = sinon.stub(user, 'update').resolves({});
    request(app)
      .put('/api/users/1')
      .set('x-access-token', token)
      .expect(201)
      .end((err, res) => {
        if (err) throw err;
        findByIdStub.restore();
        // updateStub.restore();
        done();
      });
  });

  it('should  fail when update fails', (done) => {
    let findByIdStub = sinon.stub(User, 'findById').resolves({});
    let updateStub = sinon.stub(User, 'update').rejects({});
    request(app)
      .put('/api/users/1')
      .set('x-access-token', token)
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        findByIdStub.restore();
        updateStub.restore();
        done();
      });
  });

});


describe('Users', () => {
  it('should create user on /users/POST', (done) => {
    api.post('/api/users', (error, response, body) => {
      expect(response.statusCode).toEqual(201);
      expect(response.statusMessage).toEqual('User successful created');
      expect(body).to.equal(true);
    });
    done();
  });
  it('should Get all users', (done) => {
    api.get('/api/users', (error, response, body) => {
      expect(response.statusCode).toEqual(200);
      expect(response.statusMessage).toEqual('Cool');
    });
    done();
  });
  it('should list a single user', (done) => {
    api.get('/api/users/:id', (error, response, body) => {
      expect(response.statusCode).toEqual(200);
      expect(response.statusMessage).toEqual('Cool');
    });
    done();
  });
  it('should update a single user\'s information', (done) => {
    api.put('/api/users/:id', (error, response, body) => {
      expect(expect(response.statusCode).to.equal(200));
      expect(response.body.username).to.not.equal(null);
      expect(response.body.email).to.not.equal(null);
      expect(response.body.password).to.not.equal(null);

    });
    done();
  });
  it('should delete a user', (done) => {
    api.delete('/api/user/:id', (error, response, body) => {
      expect(response.statusCode).toEqual(204);
      expect(response.statusMessage).toEqual('Cool');
      expect(body).to.be.a('object');
    });
    done();
  });
});
