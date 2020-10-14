import Component from '@glimmer/component';
import {
  isBlank,
  isPresent,
} from '@ember/utils';
import moment from 'moment';
import { tracked } from "@glimmer/tracking";
import { inject as service } from '@ember/service';
export default class NewsListComponent extends Component {
  @service
  router
  @tracked
  isMediaPage = false;
  constructor() {
    super(...arguments);
    if(this.router.currentRouteName == "news-room.index") {
        this.isMediaPage = true;
        
    }
}
  get isViewingArchiveByYear() {
    let { args: { setArchiveYear } } = this;

    return isPresent(setArchiveYear)
  }

  archiveYearOptions = [
    2017,
    2016,
    2015,
    2014,
    2013,
    2012,
    2011,
    2010,
    2009,
    2008,
    2007,
    2006,
    2005,
    2004,
    2003,
    2002,
    2001

  ];
  
  get filteredNews() {
    let {
      args: {
        filters,
        newsItems,
        archiveYear,
      },
      isViewingArchiveByYear
    } = this;

    if (isBlank(newsItems))
      return [];
    let filteredNews = [];
      filteredNews = newsItems;
    if (isPresent(filters) && isPresent(filters.filterBy)) {
      switch(filters.filterBy) {        
        case 'year':
          if (isPresent(filters.year)) {
            filteredNews = newsItems.filter(item => {
              return isPresent(item.field_date_to_be_published) && Number(moment(item.field_date_to_be_published).format('YYYY')) === Number(filters.year) || isPresent(item.field_date) && Number(moment(item.field_date).format('YYYY')) === Number(filters.year);
            });
          }
          break;
        
        case 'region':
          if (isPresent(filters.region)) {
            filteredNews = newsItems.filter(item => {
              return (isPresent(item.field_region) && item.field_region === filters.region || isPresent(item.field_news_release_regions) && item.field_news_release_regions === filters.region);
            });
          }
          break;
  
        case 'state':
          if (isPresent(filters.state)) {
            filteredNews = newsItems.filter(item => {
              return isPresent(item.field_state) && item.field_state === filters.state;
            });
          }
          break;
  
        case 'topic':
          if (isPresent(filters.topic)) {
            filteredNews = newsItems.filter(item => {
              return isPresent(item.field_issue_number) && item.field_issue_number === filters.topic;
            });
          }
          break;
        default:
          break;
      }
    }

    if (isViewingArchiveByYear && isPresent(archiveYear)) {
      return filteredNews.filter(item => { 
        return isPresent(item.field_date_to_be_published) && Number(moment(item.field_date_to_be_published).format('YYYY')) === Number(archiveYear) || isPresent(item.field_date) && Number(moment(item.field_date).format('YYYY')) === Number(archiveYear);
      });
    }
    return filteredNews;
  }
}