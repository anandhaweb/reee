import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template';

export function trimString(string) {
    return htmlSafe(string)
}
export default helper(trimString);

