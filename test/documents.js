const chaiHttp = require('chai-http');
const chai = require('chai');
const supertest = require('supertest');
const request = require('supertest');
const should = require('chai').should;
expect = require('chai').expect;
const assert = chai.assert;
chai.use(chaiHttp);
const User = require('../server/models').User;
const sinon = require('sinon');
require('sinon-as-promised');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY || 'some secret';

const Document = require('../server/models').Document;


api = supertest('http://localhost:8080');
const app = require('../app');

// const token = jwt.sign({ userId: 1, roleId: 1 }, secretKey, { expiresIn: '24h' });
let token = '';

const testDocument = {
  title: 'Radiants',
  content: 'Are you back?',
  access: 'public'
};

describe('/POST documents', () => {
  const endpoint = '/api/documents';

  it('should return user logged in successfully', (done) => {
    const saltRounds = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync('issastrongpassword', saltRounds);
    let findOneStub = sinon.stub(User, 'findOne').resolves({ password, id: 1 });
    request(app)
      .post('/api/users/login')
      .send({
        username: 'Gavilar',
        password: 'issastrongpassword'
      })
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        // assert(res.body.message, 'You were successfully logged in');
        assert.property(res.body, 'token');
        token = res.body.token;
        findOneStub.restore();
        done();
      });
  });

  it('should fail to add a document', (done) => {
    let createStub = sinon.stub(Document, 'create').rejects();
    request(app)
      .post(endpoint)
      .set('x-access-token', token)
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        createStub.restore();
        done();
      });
  });
  it('should fail to delete when document id not found', (done) => {
    let findByIdStub = sinon.stub(Document, 'findById').resolves();
    request(app)
      .delete('/api/documents/1')
      .set('x-access-token', token)
      .expect(404)
      .end((err, res) => {
        if (err) throw err;
        findByIdStub.restore();
        done();
      });
  });
  it('should fail when update fails', (done) => {
    let findByIdStub = sinon.stub(Document, 'findById').resolves({
      update: () => new Promise((resolve, reject) => reject())
    });

    request(app)
      .put('/api/documents/1')
      .set('x-access-token', token)
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        findByIdStub.restore();
        done();
      });
  });

  it('should update fields sucessfully', (done) => {
    let findByIdStub = sinon.stub(Document, 'findById').resolves({
      update: () => new Promise((resolve, reject) => resolve())
    });
    request(app)
      .put('/api/documents/1')
      .set('x-access-token', token)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        findByIdStub.restore();
        done();
      });
  });
  it('Should return all the documents', function (done) {
    let findAllStub = sinon.stub(Document, 'findAll').resolves([{}, {}]);
    request(app)
      .get('/api/documents')
      .set('x-access-token', token)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        assert.deepEqual(res.body, [{}, {}]);
        findAllStub.restore();
        done();
      });
  });

  it('Should  fail to return all the documents', function (done) {
    let findAllStub = sinon.stub(Document, 'findAll').rejects([{}, {}]);
    request(app)
      .get('/api/documents')
      .set('x-access-token', token)
      .expect(404)
      .end((err, res) => {
        if (err) throw err;
        assert.deepEqual(res.body, [{}, {}]);
        findAllStub.restore();
        done();
      });
  });
  it('should fail to retrieve one document', done => {
    let findByIdStub = sinon.stub(Document, 'findById').resolves();
    request(app)
      .get('/api/documents/1')
      .set('x-access-token', token)
      .expect(404)
      .end((err, res) => {
        if (err) throw err;
        findByIdStub.restore();
        done();
      });
  });


  it('should delete a document successfully ', (done) => {
    let findByIdStub = sinon.stub(Document, 'findById').resolves({
      destroy: () => new Promise((resolve, reject) => {
        resolve(true);
      })
    });
    let destroyStub = sinon.stub(Document, 'destroy').resolves({});
    request(app)
      .delete('/api/documents/1')
      .set('x-access-token', token)
      .expect(204)
      .end((err, res) => {
        if (err) throw err;
        findByIdStub.restore();
        destroyStub.restore();
        done();
      });
  });
  it('should retrieve one document by id', (done) => {
    let findByIdStub = sinon.stub(Document, 'findById').resolves({ id: 1 });
    request(app)
      .get('/api/documents/1')
      .set('x-access-token', token)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        assert.deepEqual(res.body, { id: 1 });
        findByIdStub.restore();
        done();
      });
  });
  it('should fail to delete when document id not found', (done) => {
    let findByIdStub = sinon.stub(Document, 'findById').resolves();
    request(app)
      .delete('/api/documents/1')
      .set('x-access-token', token)
      .expect(404)
      .end((err, res) => {
        if (err) throw err;
        findByIdStub.restore();
        done();
      });
  });

  it('Should return all the documents with pagination', function (done) {
    let findAllStub = sinon.stub(Document, 'findAll').resolves([{}, {}]);
    request(app)
      .get('/api/documents')
      .query({ limit: 2, offset: 3 })
      .set('x-access-token', token)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        assert.deepEqual(res.body, [{}, {}]);
        findAllStub.restore();
        done();
      });
  });
});


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
  });
  it('should delete a document', (done) => {
    api.delete('/api/documents/:id', (error, response, body) => {
      expect(response.statusCode).toEqual(204);
      expect(response.statusMessage).toEqual('Cool');
    });
    done();
  });
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
