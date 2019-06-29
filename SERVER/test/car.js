// eslint-disable-next-line import/no-extraneous-dependencies
import { assert } from 'chai';
import car from '../usingDB/controller/carController';


describe('create', () => {
  it('create(data) should return {} ', () => {
    const result = car.create;
    assert.isOk(result);
  });
});
