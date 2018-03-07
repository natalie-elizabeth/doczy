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
const bcrypt = require('bcrypt-nodejs');
const Role = require('../server/models').Role;
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY || 'some secret';
api = supertest('http://localhost:8080');
const app = require('../app');

chai.use(chaiHttp);


const token = jwt.sign({ userId: 1, roleId: 1 }, secretKey, { expiresIn: '24h' });

let role = 1;
const testRole = {
  role_name: 'Olga'
};


describe('actions', () => {
  const endpoint = '/api/roles';

  it('should return all roles', (done => {
    request(app)
      .get('/api/roles')
      .set('x-access-login', token)
      .accept('application/json')
      .end(function (err, res) {
        expect(res.status).to.equal(401);
        done();
      });
  }));
  it('should fail when create fails', (done) => {
    let createStub = sinon.stub(Role, 'create').rejects({});

    request(app)
      .post(endpoint)
      .set('x-access-token', token)
      .send(testRole)
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        createStub.restore();
        done();
      });
  });
  it('should fail to delete when role id is not found', (done) => {
    let findByIdStub = sinon.stub(Role, 'findById').resolves();
    request(app)
      .delete('/api/roles/1')
      .set('x-access-token', token)
      .expect(404)
      .end((err, res) => {
        if (err) throw err;
        findByIdStub.restore();
        done();
      });
  });
  it('should fail when update fails', (done) => {
    let findByIdStub = sinon.stub(Role, 'findById').resolves({
      update: () => new Promise((resolve, reject) => reject())
    });

    request(app)
      .put('/api/roles/1')
      .set('x-access-token', token)
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        findByIdStub.restore();
        done();
      });
  });
  it('should update fields sucessfully', (done) => {
    let findByIdStub = sinon.stub(Role, 'findById').resolves({
      update: () => new Promise((resolve, reject) => resolve())
    });
    request(app)
      .put('/api/roles/1')
      .set('x-access-token', token)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        findByIdStub.restore();
        done();
      });
  });
  it('should fail to delete', (done) => {
    let findByIdStub = sinon.stub(Role, 'findById').rejects();
    request(app)
      .delete('/api/roles/1')
      .set('x-access-token', token)
      .expect(400)
      .end(function (err, res) {
        findByIdStub.restore();
        done();
      });
  });



});


describe('Roles', () => {
  it('should create user on /roles/POST', (done) => {
    api.post('/api/roles', (error, response, body) => {
      expect(response.statusCode).toEqual(201);
      expect(response.data).toEqual('Role successful created');
      expect(body).to.equal(true);
    });
    done();
  });

  it('should Get all roles', (done) => {
    api.get('/api/roles', (error, response, body) => {
      expect(response.statusCode).toEqual(200);
      expect(response.statusMessage).toEqual('OK');
    });
    done();
  });

  it('should list a single role', (done) => {
    api.get('/api/roles/:id', (error, response, body) => {
      expect(response.statusCode).toEqual(200);
      expect(response.statusMessage).toEqual('OK');
    });
    done();
  });

  it('should delete a role', (done) => {
    api.delete('/api/roles/:id', (error, response, body) => {
      expect(response.statusCode).toEqual(204);
      expect(response.statusMessage).toEqual('OK');
    });
    done();
  });
  it('should update a single role', (done) => {
    api.put('/api/roles/:id', (error, response, body) => {
      expect(expect(response.statusCode).to.equal(200));
      expect(response.body.name).to.not.equal(null);


    });
    done();
  });
});


