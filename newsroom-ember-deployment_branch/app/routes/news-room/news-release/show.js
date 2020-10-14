import Route from '@ember/routing/route';
export default Route.extend({
   
  model(params) {
      this._router.transitionTo('news-room.news-release')
  }
});