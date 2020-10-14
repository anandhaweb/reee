import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';

export default class ShowController extends Controller {
  @controller('news-room') ShowController;

  get queryParamValues() {
    let {
      newsRoomController: {
        queryParamValues,
      },
    } = this;
    return queryParamValues;
  }
}
