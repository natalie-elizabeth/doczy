const chaiHttp = require('chai-http');
const chai = require('chai');
const supertest = require('supertest');
const should = require('chai').should;
expect = require('chai').expect;
const assert = chai.assert;
chai.use(chaiHttp);
const User = require('../server/models').User;
const sinon = require('sinon');
require('sinon-as-promised');

api = supertest('http://localhost:8080');
const app = require('../app');

let token = '';


describe('Documents', () => {
    it('should create user on /documents/POST', (done) => {
        api.post('/api/documents', (error, response, body) => {
            expect(response.statusCode).toEqual(201);
            expect(response.statusMessage).toEqual('User successful created');
            expect(body).to.equal(true);
        });
        done();
    });
    it('should Get all documents', (done) => {
        api.get('/api/documents', (error, response, body) => {
            expect(response.statusCode).toEqual(200);
            expect(response.statusMessage).toEqual('Cool');
        });
        done();
    });
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
    it('should update a single document\'s information', (done) => {
        api.put('/api/documents/:id', (error, response, body) => {
            expect(expect(response.statusCode).to.equal(200));
            expect(response.body.title).to.not.equal(null);
            expect(response.body.body).to.not.equal(null);
            expect(response.body.access).to.not.equal(null);
        });
        done();
    })
})
