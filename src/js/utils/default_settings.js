import _ from 'lodash';

let config = {
  shapesPerSecond: 1,
  gravity: 3,
  gravityStep: 1,
  gravityMultiply: 0.00001,
}

const setting = _.cloneDeep(config);

export default setting;