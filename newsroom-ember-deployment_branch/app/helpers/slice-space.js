import { helper } from '@ember/component/helper';

export function sliceSpace(param) {
    return  param[0] && param[0].replace(/\s/g , "-");
}

export default helper(sliceSpace);
