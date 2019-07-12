/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

chai.use(chaiHttp);
should = chai.should();

// During the test the env variable is set to test
process.env.NODE_ENV = 'test';


// Our parent block
describe('CAR', () => {
  const userOne = {
    email: 'testemail@gmail.com',
    password: 'password',
  };

  const firstCar = {
    id: 1,
    car_id: 3,
    price: 200000,
    buyer: 'John Doe',
    status: 'available',
    manufacturer: 'Toyota',
    state: 'new',
    created_date: 12345,
    modified_date: 12345,
  };
  const secondCar = {
    id: 2,
    car_id: 4,
    price: 200000,
    buyer: 'John Williams',
    status: 'pending',
    manufacturer: 'Toyota',
    state: 'used',
    created_date: 12345,
    modified_date: 12345,
  };

  let userToken; let firstCarId; let secondCarId;

  before(async () => {
    const result = await chai
      .request(server)
      .post('/api/v1/auth/signup')
      .send(userOne);
    result.status.should.equal(201);
    userToken = result.body.user.token;
  });
  // before(async () => {
  //   const result = await chai
  //     .request(server)
  //     .post('/api/v1/car')
  //     .set('Authorization', userToken)
  //     .send(firstCar);
  //   result.status.should.equal(201);
  //   firstCarId = result.body.data.id;
  // });
  // before(async () => {
  //   const result = await chai
  //     .request(server)
  //     .post('/api/v1/car')
  //     .set('Authorization', userToken)
  //     .send(secondCar);
  //   result.status.should.equal(201);
  //   secondCarId = result.body.data.id;
  // });

  describe('/POST api/v1/car:   post a Car Ad', () => {
    it('it should return a 401 authentication failed', async () => {
      const result = await chai
        .request(server)
        .post('/api/v1/car')
        .send(firstCar);
      result.status.should.equal(401);
      result.body.should.eql({ status: 401, error: 'Authentication failed' });
    });

    // it('it should return a 201 response upon authorization', async () => {
    //   const result = await chai
    //     .request(server)
    //     .post('/api/v1/car')
    //     .set('Authorization', userToken)
    //     .send(firstCar);
    //   result.status.should.equal(201);
    // });

  //   it('it should be an object with keys and values for authorised login', async () => {
  //     const result = await chai
  //       .request(server)
  //       .post('/api/v1/car')
  //       .set('Authorization', userToken)
  //       .send(secondCar);
  //     result.body.should.be.a('object');
  //     result.status.should.equal(201);
  //     result.body.data.should.have.property('price');
  //     result.body.data.price.should.equal('200000');
  //     result.body.data.should.have.property('manufacturer');
  //     result.body.data.should.have.property('state');
  //     result.body.data.should.have.property('status');
  //   });
  //   it('it should return a 400 error if required fields are missing for authorized login', async () => {
  //     const result = await chai
  //       .request(server)
  //       .post('/api/v1/car')
  //       .set('Authorization', userToken)
  //       .send({});
  //     result.body.should.be.a('object');
  //     result.status.should.equal(400);
  //     result.body.should.eql({ status: 400, error: 'please enter required fields' });
  //   });
  // });

  // describe('/api/v1/car/:carId/price: update price of purchase car', () => {
  //   it('it should return a 401 authentication failed for unauthorised user', async () => {
  //     const result = await chai
  //       .request(server)
  //       .patch(`/api/v1/car/${firstCarId}/price`)
  //       .send(firstCar);
  //     result.status.should.equal(401);
  //     result.body.should.eql({ status: 401, error: 'Authentication failed' });
  //   });

  //   it('it should be successful with 200 response upon authorization', async () => {
  //     const result = await chai
  //       .request(server)
  //       .patch(`/api/v1/car/${secondCarId}/price`)
  //       .set('Authorization', userToken)
  //       .send(firstCar);
  //     result.status.should.equal(200);
  //   });


  //   it('it should be an object with keys and values', async () => {
  //     const result = await chai
  //       .request(server)
  //       .patch(`/api/v1/car/${secondCarId}/price`)
  //       .set('Authorization', userToken)
  //       .send(firstCar);
  //     result.body.should.be.a('object');
  //     result.status.should.equal(200);
  //     result.body.updatedAd.should.have.property('price');
  //     result.body.updatedAd.price.should.equal('200000');
  //     result.body.updatedAd.should.have.property('manufacturer');
  //     result.body.updatedAd.should.have.property('state');
  //     result.body.updatedAd.should.have.property('status');
  //   });
  //   it('it should return a 400 error if required fields are missing', async () => {
  //     const result = await chai
  //       .request(server)
  //       .patch(`/api/v1/car/${secondCarId}/price`)
  //       .set('Authorization', userToken)
  //       .send({});
  //     result.body.should.be.a('object');
  //     result.status.should.equal(400);
  //     result.body.should.eql({ status: 400, error: 'please enter required fields' });
  //   });
  //   it('it should update car Ad price', async () => {
  //     const result = await chai
  //       .request(server)
  //       .patch(`/api/v1/car/${secondCarId}/price`)
  //       .set('Authorization', userToken)
  //       .send({
  //         price: '800000',
  //       });

  //     result.status.should.equal(200);
  //     result.body.updatedAd.should.have.property('price');
  //     result.body.updatedAd.price.should.equal('800000');
  //   });
   });
});
