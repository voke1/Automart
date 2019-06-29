// eslint-disable-next-line import/no-extraneous-dependencies
import { assert } from 'chai';
import flag from '../usingDB/controller/flagController';


describe('create', () => {
  it('create(data) should return {}', () => {
    const result = flag.create;
    assert.isOk(result);
  });
});
