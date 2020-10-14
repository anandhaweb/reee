import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class NewsRoomControler extends Controller {
  @service
  router
  @tracked isIndexPage = true;
  constructor() {
    super(...arguments);
  }
  queryParams = [
    'filterBy',
    'year',
    'region',
    'state',
    'topic',
    'field_story'
  ];

  @tracked filterBy = null;
  @tracked year = null;
  @tracked region = null;
  @tracked state = null;
  @tracked topic = null;
  @tracked field_story = null;

  @tracked modelBrName;
  @tracked newsRelaseFilter;
  @tracked isArchive = false;
  @tracked isNewsStory = false;
  @tracked currentMenu;
  
  get queryParamValues() {
    let {
      filterBy,
      year,
      region,
      state,
      topic,
      field_story
    } = this;
    return {
      filterBy,
      year,
      region,
      state,
      topic,
      field_story
    }
  }

  @action setQueryParams(queryParamName, queryParamValue, filterValue) {
    this.isIndexPage = false;
    switch(queryParamName) {
      case 'multimedia':
        this.isIndexPage = true; 
        this.modelBrName = '';
      break;
      case 'filterBy':
        this.filterBy = queryParamValue;
        this.year = null;
        this.region = null;
        this.state = null;
        this.topic = null;
        break;
      
      case 'year':
        this.year = queryParamValue;
        this.region = null;
        this.state = null;
        this.topic = null;
        this.setQuery(this.year);
        break;
      
      case 'region':
        this.region = queryParamValue;
        this.year = null;
        this.state = null;
        this.topic = null;
        this.setQuery(this.region);
        break;

      case 'state':
        this.state = queryParamValue;
        this.year = null;
        this.region = null;
        this.topic = null;
        this.setQuery(this.state);
        break;

      case 'topic':
        this.topic = queryParamValue;
        this.year = null;
        this.region = null;
        this.state = null;
        this.setQuery(this.topic);
        break;
      case 'field_story':
        this.field_story = queryParamValue;
        this.year = null;
        this.region = null;
        this.state = null;
        this.topic = null;
        this.setQuery(this.field_story);
        break; 
      case 'breadcum':
        this.isArchive = false;
        if(this.router.currentRoute.queryParams.field_story != '1'){
          this.isNewsStory = false;
        }
        let query = queryParamValue;
        if(typeof query != 'object"' && typeof query != 'function'){
          query = query && query.split('.')[1]
          this.modelBrName = query;
          if(filterValue == 'archive'){
            this.isArchive = true;
          }else if(filterValue == 1){
            this.isNewsStory = true;
          }
        }
        break;    
      default:
        break;
    }
  }
  @action setQuery(queryParamName) {
    this.newsRelaseFilter = queryParamName;

  }
  @action menuTabClick(queryParamName) {
      if(this.currentMenu == queryParamName){
        $('.'+queryParamName).toggleClass('-active');
      } else {
        this.currentMenu = queryParamName;
        $('.Nav-item').removeClass('-active');
        $('.'+queryParamName).addClass('-active');
      }
      
  }
  @action menuListClick(model,params,event) {
    event.stopPropagation();
    $('.Nav-item').removeClass('-active');
    $('.menu-active').removeClass('-active');
    $('.LeftNav-list li').removeClass('-active');
    $('#'+params).addClass('-active');
    if(params == "News-Stories"){
      this.router.transitionTo(model, { queryParams: { field_story: 1 }});
    } else {
      this.router.transitionTo(model, { queryParams: {field_story: null}});
    } 
    return false;
  }
  
  @action outSideClick() {
    $('.Nav-item').removeClass('-active');
  }
}
