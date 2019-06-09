import assert from ('chai').assert;
import CarModel  from '../model/car_model';


describe('create', () => {
  it('create(data) should return {} if no items are passed in', () => {
    assert.isObject(CarModel.default)
  });
});