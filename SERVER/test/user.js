/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

chai.use(chaiHttp);
should = chai.should();

// During the test the env variable is set to test
process.env.NODE_ENV = 'test';


// Our parent block
describe('USER', () => {
// let userToken;

  const userOne = {
    email: 'testemail3@gmail.com',
    password: 'password',
  };
  const userTwo = {
    email: 'testemail4@gmail.com',
    password: 'password',
  };
  const userThree = {
    email: 'testemail5@gmail.com',
    password: 'password',
  };
  before(async () => {
    const result = await chai
      .request(server)
      .post('/api/v1/auth/signup')
      .send(userOne);
    result.status.should.equal(201);
    // userToken = result.body.user.token;
  });

  describe('SIGNUP', () => {
    it('it should be an object with keys and values', async () => {
      const result = await chai
        .request(server)
        .post('/api/v1/auth/signup')
        .send(userTwo);
      result.body.should.be.a('object');
      result.status.should.equal(201);
      result.body.user.should.have.property('email');
      result.body.user.should.have.property('password');
      result.body.user.email.should.equal('testemail4@gmail.com');
      result.body.user.should.have.property('id');
    });
    it('it should return a signin token', async () => {
      const result = await chai
        .request(server)
        .post('/api/v1/auth/signup')
        .send(userThree);
      result.body.user.should.be.a('object');
      result.status.should.equal(201);
      result.body.user.should.have.property('token');
    });
    it('it should return a 400 error if required fields are missing for authorized login', async () => {
      const result = await chai
        .request(server)
        .post('/api/v1/auth/signup')
        .send({});
      result.body.should.be.a('object');
      result.status.should.equal(400);
      result.body.should.eql({ status: 400, error: 'please fill in required fields' });
    });

    // it('it should not allow repeated signup of the same user', async () => {
    //   const result = await chai
    //     .request(server)
    //     .post('/api/v1/auth/signup')
    //     .send({userOne})
    //   result.body.should.be.a('object');
    //   result.status.should.equal(404);
    // eslint-disable-next-line max-len
    //   result.body.should.eql({ status: 404, error:'A user with the specified email already exist'});
    // });
  });

  describe('SIGNIN', () => {
    it('it should be an object with keys and values', async () => {
      const result = await chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send(userTwo);
      result.body.should.be.a('object');
      result.status.should.equal(200);
      result.body.signedUser.should.have.property('email');
      result.body.signedUser.should.have.property('password');
      result.body.signedUser.email.should.equal('testemail4@gmail.com');
      result.body.signedUser.should.have.property('id');
    });
    it('it should return a signin token', async () => {
      const result = await chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send(userThree);
      result.body.signedUser.should.be.a('object');
      result.status.should.equal(200);
      result.body.signedUser.should.have.property('token');
    });
  });
});
