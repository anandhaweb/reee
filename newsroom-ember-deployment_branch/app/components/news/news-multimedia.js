import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import NewsLoaderComponent from '../news/loader';
export default class NewsMultimediaComponent extends NewsLoaderComponent {
    @service
    router
    @service
    store
    @tracked
    newsItems
    @tracked
    isContentLoaded = false
    constructor() { 
      super(...arguments)
      window.history.replaceState({},{}, window.location.pathname);
      this.loader('news-release','indexRoute','',0);
      this.loader('video','indexRouteVideo','',0);
    }
    
    
    
     
}