import { helper } from '@ember/component/helper';

export function sliceHypen(str) {
  let hypenString = str && str[0].replace(/\s/g , "-");
  if(hypenString.length > 70) hypenString = hypenString.substring(0,70);
  return hypenString
}

export default helper(sliceHypen);
