import Route from '@ember/routing/route';
import {
  inject as service
} from '@ember/service';
import moment from 'moment';
import data from 'ember-drupal/utilities/sample-responses';

export default Route.extend({
  breadcrumbs: service(),
  controllerName: 'news',
  model: function(params) {
    let breadcrumbs = [{
      route: 'news',
      text: 'News Releases'
    }];
    let thisMinute = moment().utc().format('YYYY-MM-DDTHH:MM');
    let queryFilter = [{
        field: 'field_date_to_be_published',
        type: 'gt',
        value: '2017-01-18'
      },
      {
        field: 'field_date_to_be_published',
        type: 'lt',
        value: thisMinute
      },
      {
        field: 'field_story',
        type: 'eq',
        value: 0
      }
    ];
    let orderBy = {};
    orderBy[0] = {
      field: 'field_date_to_be_published',
      type: 'field',
      direction: 'desc'
    };
    // Add this into queryFilter to disregard news stories
    this.get('breadcrumbs').set('breadcrumbsLinks', breadcrumbs);
    this.controllerFor('news').set('navActive', {
      news: true
    });

    return data;

    // return this.get('store').query('news', {
    //   page: {
    //     number: params.page,
    //     size: params.size
    //   }
    // }).then((results) => {
    //   this.controllerFor('news').set('lastPage', results.get('meta').pageCount);
    //   this.controllerFor('news').set('canLoadMore', results.get('meta').totalRecords > 1);
    //   this.controllerFor('news').set('first', results.get('links').first)
    //   this.controllerFor('news').set('previous', results.get('links').previous)
    //   this.controllerFor('news').set('next', results.get('links').next)
    //   this.controllerFor('news').set('last', results.get('links').last)
    //   return results;
    // });
  },
  setupController(controller, model) {
    this._super(controller, model);
    this.controllerFor('news').set('activeFilters', []);
    this.controllerFor('news').set('filterBy', []);
    this.controllerFor('news').set('contentType', 'contentType');
    this.controllerFor('news').set('archivedDateField', 'field_date_to_be_published');
    this.controllerFor('news').set('archivedDateDescription', 'Archived News Releases');
    this.controllerFor('news').set('isStory', 0);
    this.controllerFor('news').set('pageHeader', null);
  },
  queryParams: {
    page: {
      refreshModel: true
    },
    size: {
      refreshModel: true
    }
  }
});
