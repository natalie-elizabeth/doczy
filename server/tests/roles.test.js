const chaiHttp = require('chai-http');
const chai = require('chai');
const supertest = require('supertest');
const should = require('chai').should;
expect = require('chai').expect;
chai.use(chaiHttp);

api = supertest('http://localhost:3000');

describe('Roles', () => {
  it('should create user on /roles/POST', (done) => {
    api.post('/api/roles', (error, response, body) => {
      expect(response.statusCode).toEqual(201);
      expect(response.data).toEqual('Role successful created');
      expect(body).to.equal(true);
    });
    done();
  })

  it('should Get all roles', (done) => {
    api.get('/api/roles', (error, response, body) => {
      expect(response.statusCode).toEqual(200);
      expect(response.statusMessage).toEqual('OK');
    });
    done();
  })

  it('should list a single role', (done) => {
    api.get('/api/roles/:id', (error, response, body) => {
      expect(response.statusCode).toEqual(200);
      expect(response.statusMessage).toEqual('OK');
    });
    done();
  })

  it('should delete a role', (done) => {
    api.delete('/api/roles/:id', (error, response, body) => {
      expect(response.statusCode).toEqual(204);
      expect(response.statusMessage).toEqual('OK');
    });
    done();
  })
})
