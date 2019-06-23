// eslint-disable-next-line import/no-extraneous-dependencies
import { assert } from 'chai';
import flag from '../usingDB/controller/flagController';


describe('create', () => {
  it('create(data) should return {} if no items are passed in', () => {
    const result = flag.create;
    assert.isObject(result, {});
  });
});
