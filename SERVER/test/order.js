// eslint-disable-next-line import/no-extraneous-dependencies
import { assert } from 'chai';
import order from '../usingDB/controller/orderController';


describe('create', () => {
  it('create(data) should return {} if no items are passed in', () => {
    const result = order.create;
    assert.isObject(result, {});
  });
});
