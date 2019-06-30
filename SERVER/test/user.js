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
      result.body.should.eql({ status: 400, error: 'please fill in required fields'});
    });

    // it('it should not allow repeated signup of the same user', async () => {
    //   const result = await chai
    //     .request(server)
    //     .post('/api/v1/auth/signup')
    //     .send({userOne})
    //   result.body.should.be.a('object');
    //   result.status.should.equal(404);
    //   result.body.should.eql({ status: 404, error:'A user with the specified email already exist'});
    // });
  });

  // describe('SIGNIN', () => {
  //   it('it should return a 401 authentication failed for unauthorised user', async () => {
  //     const result = await chai
  //       .request(server)
  //       .patch(`/api/v1/order/${orderOneId}/price`)
  //       .send(orderOne)
  //     result.status.should.equal(401);
  //     result.body.should.eql({ status: 401, error: 'Authentication failed' });
  //   });

  //   it('it should be successful with 200 response upon authorization', async () => {
  //     const result = await chai
  //       .request(server)
  //       .patch(`/api/v1/order/${orderTwoId}/price`)
  //       .set('Authorization', userToken)
  //       .send(orderOne)
  //     result.status.should.equal(200);
  //   })


  //   it('it should be an object with keys and values', async () => {
  //     const result = await chai
  //       .request(server)
  //       .patch(`/api/v1/order/${orderTwoId}/price`)
  //       .send(orderOne)
  //     result.body.should.be.a('object');
  //     result.status.should.equal(200);
  //     result.body.modifiedOrder.should.have.property('price_offered');
  //     result.body.modifiedOrder.should.have.property('price');
  //     result.body.modifiedOrder.price.should.equal('200000');
  //     result.body.modifiedOrder.should.have.property('car_id');
  //     result.body.modifiedOrder.should.have.property('buyer');
  //     result.body.modifiedOrder.should.have.property('status');
  //     result.body.modifiedOrder.should.have.property('old_price_offered');
  //     result.body.modifiedOrder.should.have.property('new_price_offered');
  //     result.body.modifiedOrder.should.have.property('id');

  //   })
  //   it('it should return a 400 error if required fields are missing', async () => {
  //     const result = await chai
  //       .request(server)
  //       .patch(`/api/v1/order/${orderTwoId}/price`)
  //       .set('Authorization', userToken)
  //       .send({})
  //     result.body.should.be.a('object');
  //     result.status.should.equal(400);
  //     result.body.should.eql({ status: 400, error: 'please enter new price offered and car ID'});
  //   });
  //   it('it should return a 404 error if status is not pending', async () => {
  //     const result = await chai
  //       .request(server)
  //       .patch(`/api/v1/order/${orderOneId}/price`)
  //       .set('Authorization', userToken)
  //       .send({ new_price_offered: 800000, })
  //     result.body.should.be.a('object');
  //     result.status.should.equal(404);
  //     result.body.should.eql({ status: 404, error: `cannot update price, status is available` });
  //   });
  //   it('it should update an order if status is pending', async () => {

  //     const result = await chai
  //       .request(server)
  //       .patch(`/api/v1/order/${orderTwoId}/price`)
  //       .set('Authorization', userToken)
  //       .send({
  //         new_price_offered: '800000',
  //       })

  //     result.status.should.equal(200);
  //     result.body.modifiedOrder.should.have.property('new_price_offered');
  //     result.body.modifiedOrder.new_price_offered.should.equal('800000');
  //   });
  // });
});
