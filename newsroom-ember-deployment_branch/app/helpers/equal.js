import { helper } from '@ember/component/helper';

export function equal([x, y]) {
    return x === y;
}

export default helper(equal);

