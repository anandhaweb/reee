import { helper } from '@ember/component/helper';
import { isPresent } from '@ember/utils';

export function stringContains([kidString, popString]) {
  return isPresent(popString) && popString.includes(kidString);
}

export default helper(stringContains);

