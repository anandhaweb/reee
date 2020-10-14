import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';
import config from 'ember-drupal/config/environment';

const {
  hostURL
} = config;

export default OAuth2PasswordGrant.extend({
  serverTokenEndpoint: [hostURL, 'rest/session', 'token'].join('/')
});

