import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class NewsReleaseArchiveControler extends Controller {
  queryParams = [
    'archiveYear',
  ]

  @tracked archiveYear

  @controller('news-room') newsRoomController;

  get queryParamValues() {
    let {
      newsRoomController: {
        queryParamValues,
      },
    } = this;
    return queryParamValues;
  }

  @action
  setArchiveYear(value) {
    this.archiveYear = value;
  }
}
