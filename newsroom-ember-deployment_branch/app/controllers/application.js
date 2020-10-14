import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

const AUTHENTICATOR = 'authenticator:oauth2';

export default class ApplicationController extends Controller {
  @service session
  @service store
  
  @action
  async onSignUp() {
    let attrs = {
      name: 'admin',
      pass: 'drupal'
    };
    // let user = this.store.createRecord('user', attrs);
    // await user.save();
    let session = this.get('session');
    await session.authenticate(AUTHENTICATOR, attrs.name, attrs.pass);
  }
}
