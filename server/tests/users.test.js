const chaiHttp = require('chai-http');
const chai = require('chai');
const supertest = require('supertest');
const should = require('chai').should;
expect = require('chai').expect;
chai.use(chaiHttp);

api = supertest('http://localhost:3000');

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
  it('should delete a user', (done) => {
    api.delete('/api/user/:id', (error, response, body) => {
      expect(response.statusCode).toEqual(204);
      expect(response.statusMessage).toEqual('Cool');
    });
    done();
  })
})
