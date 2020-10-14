import { helper } from '@ember/component/helper';

export function sliceHypen(param) {
    
    return  param[0] && param[0].replace(/-/g, ' ');
}

export default helper(sliceHypen);
