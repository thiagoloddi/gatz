import _ from 'lodash';

export default class Immutable {
  clone() {
    return _.cloneDeep(this);
  }
}