const chaiHttp = require('chai-http');
const chai = require('chai');
const supertest = require('supertest');
const should = require('chai').should;
expect = require('chai').expect;
chai.use(chaiHttp);
const request = require('supertest');
expect = require('chai').expect;
const assert = chai.assert;
chai.use(chaiHttp);
const User = require('../server/models').User;
const sinon = require('sinon');
require('sinon-as-promised');
const bcrypt = require('bcrypt-nodejs');
const Role = require('../server/models').Role;

api = supertest('http://localhost:8080');
const app = require('../app');

let token = '';

const testRole = {
  name: 'Olga'
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
      .send(testRole)
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        createStub.restore();
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
  })
  it('should update a single role', (done) => {
    api.put('/api/roles/:id', (error, response, body) => {
      expect(expect(response.statusCode).to.equal(200));
      expect(response.body.name).to.not.equal(null);


    });
    done();
  });
});


