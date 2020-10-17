import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('news-room', { path: '/'}, function() {
    this.route('news-release', function() {
      this.route('show', { path: '/:title' });
      this.route('archive');
    });
    this.route('stories', function() {
      this.route('show', { path: '/:news_story_slug' });
      this.route('archive');
    });
    this.route('congressional-testimony', function() {
      this.route('show', { path: '/:title' });
      this.route('archive');
    });

    this.route('speech', function() {
      this.route('show',{ path: '/:title' });
      this.route('archive');
    });

    this.route('fact-sheet', function() {
      //this.route('show',{ path: '/:speech_slug' });
      this.route('archive');
    });

    this.route('biography', function() {
      this.route('show',{ path: '/:title' });
    });

    this.route('video', function() {
      this.route('show',{ path: '/:title' });
    });


    this.route('page', { path: '/:page_slug' });
    this.route('404');
  });
  this.route('fact_sheet');
});
