// eslint-disable-next-line import/no-extraneous-dependencies
import { assert } from 'chai';
import order from '../usingDB/controller/orderController';


describe('create', () => {
  it('create(data) should return {}', () => {
    const result = order.create;
    assert.isOk(result);
  });
});
