const chaiHttp = require('chai-http');
const chai = require('chai');
const supertest = require('supertest');
const should = require('chai').should;
expect = require('chai').expect;
chai.use(chaiHttp);

api = supertest('http://localhost:3000');

describe('Documentss', () => {
  it('should create user on /documents/POST', (done) => {
    api.post('/api/documents', (error, response, body) => {
      expect(response.statusCode).toEqual(201);
      expect(response.statusMessage).toEqual('User successful created');
      expect(body).to.equal(true);
    });
    done();
  })
  it('should Get all documents', (done) => {
    api.get('/api/documents', (error, response, body) => {
      expect(response.statusCode).toEqual(200);
      expect(response.statusMessage).toEqual('Cool');
    });
    done();
  })
  it('should show a single document', (done) => {
    api.get('/api/documents/:id', (error, response, body) => {
      expect(response.statusCode).toEqual(200);
      expect(response.statusMessage).toEqual('Cool');
    });
    done();
  })
  it('should delete a document', (done) => {
    api.delete('/api/documents/:id', (error, response, body) => {
      expect(response.statusCode).toEqual(204);
      expect(response.statusMessage).toEqual('Cool');
    });
    done();
  })
})
