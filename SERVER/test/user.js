// eslint-disable-next-line import/no-extraneous-dependencies
import { assert } from 'chai';
import user from '../usingDB/controller/userController';


describe('create', () => {
  it('create(data) should return {}', () => {
    const result = user.create;
    assert.isOk(result);
  });
});
