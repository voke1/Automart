// eslint-disable-next-line import/no-extraneous-dependencies
import { assert } from 'chai';
import user from '../usingDB/controller/userController';


describe('create', () => {
  it('create(data) should return {} if no items are passed in', () => {
    const result = user.create;
    assert.isObject(result, {});
  });
});
