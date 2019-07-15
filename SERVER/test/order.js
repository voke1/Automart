/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

chai.use(chaiHttp);
should = chai.should();

// During the test the env variable is set to test
process.env.NODE_ENV = 'test';


// Our parent block
describe('ORDER', () => {
  const userOne = {
    email: 'testemail@gmail.com',
    password: 'password',
  };

  const orderOne = {
    id: 1,
    car_id: 3,
    price: 200000,
    buyer: 'John Doe',
    status: 'available',
    price_offered: 250000,
    old_price_offered: 250000,
    new_price_offered: 300000,
    created_date: 12345,
    modified_date: 12345,
  };
  const orderTwo = {
    id: 2,
    car_id: 4,
    price: 200000,
    buyer: 'John Williams',
    status: 'pending',
    price_offered: 250000,
    old_price_offered: 250000,
    new_price_offered: 300000,
    created_date: 12345,
    modified_date: 12345,
  };

  let userToken; let orderOneId; let orderTwoId;

  before(async () => {
    const result = await chai
      .request(server)
      .post('/api/v1/auth/signup')
      .send(userOne);
    result.status.should.equal(201);
    userToken = result.body.data.token;
  });
  before(async () => {
    const firstOrder = await chai
      .request(server)
      .post('/api/v1/order')
      .set('token', userToken)
      .send(orderOne);
    firstOrder.status.should.equal(201);
    orderOneId = firstOrder.body.data.id;
  });
  before(async () => {
    const secondOrder = await chai
      .request(server)
      .post('/api/v1/order')
      .set('token', userToken)
      .send(orderTwo);
    secondOrder.status.should.equal(201);
    orderTwoId = secondOrder.body.data.id;
  });

  describe('/POST api/v1/order', () => {
    it('it should return a 401 authentication failed', async () => {
      const result = await chai
        .request(server)
        .post('/api/v1/order')
        .send(orderOne);
      result.status.should.equal(401);
      result.body.should.eql({ status: 401, error: 'Authentication failed' });
    });

    it('it should return a 201 response upon authorization', async () => {
      const result = await chai
        .request(server)
        .post('/api/v1/order')
        .set('token', userToken)
        .send(orderOne);
      result.status.should.equal(201);
    });

    it('it should be an object with keys and values for authorised login', async () => {
      const result = await chai
        .request(server)
        .post('/api/v1/order')
        .set('token', userToken)
        .send(orderTwo);
      result.body.should.be.a('object');
      result.status.should.equal(201);
      result.body.data.should.have.property('price_offered');
      result.body.data.should.have.property('price');
      result.body.data.price.should.equal('200000');
      result.body.data.should.have.property('car_id');
      result.body.data.should.have.property('buyer');
      result.body.data.should.have.property('status');
      result.body.data.should.have.property('old_price_offered');
      result.body.data.should.have.property('new_price_offered');
      result.body.data.should.have.property('id');
    });
    it('it should return a 400 error if required fields are missing for authorized login', async () => {
      const result = await chai
        .request(server)
        .post('/api/v1/order')
        .set('token', userToken)
        .send({});
      result.body.should.be.a('object');
      result.status.should.equal(400);
      result.body.should.eql({ status: 400, error: 'please enter price offered and car ID' });
    });
  });

  describe('/api/v1/order/:orderId/price: update price of purchase order', () => {
    it('it should return a 401 authentication failed for unauthorised user', async () => {
      const result = await chai
        .request(server)
        .patch(`/api/v1/order/${orderOneId}/price`)
        .send(orderOne);
      result.status.should.equal(401);
      result.body.should.eql({ status: 401, error: 'Authentication failed' });
    });

    it('it should be successful with 200 response upon authorization', async () => {
      const result = await chai
        .request(server)
        .patch(`/api/v1/order/${orderTwoId}/price`)
        .set('token', userToken)
        .send(orderOne);
      result.status.should.equal(200);
    });


    it('it should be an object with keys and values', async () => {
      const result = await chai
        .request(server)
        .patch(`/api/v1/order/${orderTwoId}/price`)
        .set('token', userToken)
        .send(orderOne);
      result.body.should.be.a('object');
      result.status.should.equal(200);
      result.body.data.should.have.property('price_offered');
      result.body.data.should.have.property('price');
      result.body.data.price.should.equal('200000');
      result.body.data.should.have.property('car_id');
      result.body.data.should.have.property('buyer');
      result.body.data.should.have.property('status');
      result.body.data.should.have.property('old_price_offered');
      result.body.data.should.have.property('new_price_offered');
      result.body.data.should.have.property('id');
    });
    it('it should return a 400 error if required fields are missing', async () => {
      const result = await chai
        .request(server)
        .patch(`/api/v1/order/${orderTwoId}/price`)
        .set('token', userToken)
        .send({});
      result.body.should.be.a('object');
      result.status.should.equal(400);
      result.body.should.eql({ status: 400, error: 'please enter new price offered and car ID' });
    });
    it('it should update an order if status is pending', async () => {
      const result = await chai
        .request(server)
        .patch(`/api/v1/order/${orderTwoId}/price`)
        .set('token', userToken)
        .send({
          price: '800000',
        });

      result.status.should.equal(200);
      result.body.data.should.have.property('new_price_offered');
      result.body.data.price.should.equal('800000');
    });
  });
});
