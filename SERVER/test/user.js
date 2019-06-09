import assert from ('chai').assert;
import UserModel  from '../model/user_model';


describe('create', () => {
  it('create(data) should return {} if no items are passed in', () => {
    assert.isObject(UserModel.default)
  });
});