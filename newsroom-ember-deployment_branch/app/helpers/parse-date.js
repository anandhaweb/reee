import { helper } from '@ember/component/helper';
import moment from 'moment';

export function parseDate(param) {
    return moment(param).format("MMMM Do, YYYY");
}

export default helper(parseDate);
