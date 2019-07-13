// /* eslint-disable no-undef */
// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import server from '../app';

// chai.use(chaiHttp);
// should = chai.should();

// // During the test the env variable is set to test
// process.env.NODE_ENV = 'test';


// // Our parent block
// describe('FLAG', () => {
//   const userOne = {
//     email: 'testemail@gmail.com',
//     password: 'password',
//   };

//   const flagOne = {
//     id: 1,
//     car_id: 3,
//     reason: 'first reason',
//     description: 'first description',
//     status: 'available',
//     created_date: 12345,
//     modified_date: 12345,
//   };
//   const flagTwo = {
//     id: 2,
//     car_id: 4,
//     reason: 'second reason',
//     description: 'second description',
//     status: 'pending',
//     created_date: 12345,
//     modified_date: 12345,
//   };

//   let userToken;

//   before(async () => {
//     const result = await chai
//       .request(server)
//       .post('/api/v1/auth/signup')
//       .send(userOne);
//     result.status.should.equal(201);
//     userToken = result.body.data.token;
//   });
//   describe('/POST api/v1/flag', () => {
//     it('it should return a 401 authentication failed', async () => {
//       const result = await chai
//         .request(server)
//         .post('/api/v1/flag')
//         .send(flagOne);
//       result.status.should.equal(401);
//       result.body.should.eql({ status: 401, error: 'Authentication failed' });
//     });

//     it('it should return a 201 response upon authorization', async () => {
//       const result = await chai
//         .request(server)
//         .post('/api/v1/flag')
//         .set('Authorization', userToken)
//         .send(flagOne);
//       result.status.should.equal(201);
//     });

//     it('it should be an object with keys and values for authorised login', async () => {
//       const result = await chai
//         .request(server)
//         .post('/api/v1/flag')
//         .set('Authorization', userToken)
//         .send(flagTwo);
//       result.body.should.be.a('object');
//       result.status.should.equal(201);
//       result.body.flag.should.have.property('reason');
//       result.body.flag.should.have.property('car_id');
//       result.body.flag.reason.should.equal('second reason');
//       result.body.flag.should.have.property('description');
//     });
//     it('it should return a 400 error if required fields are missing for authorized login', async () => {
//       const result = await chai
//         .request(server)
//         .post('/api/v1/flag')
//         .set('Authorization', userToken)
//         .send({});
//       result.body.should.be.a('object');
//       result.status.should.equal(400);
//       result.body.should.eql({ status: 400, error: 'please enter car Id and reason for report' });
//     });
//   });
// });
