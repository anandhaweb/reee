import Component from '@glimmer/component';
import { tracked } from "@glimmer/tracking";
import { inject as service} from '@ember/service';
import { action } from '@ember/object';
import { isPresent } from '@ember/utils';
import $ from 'jquery';

export default class NewsLoaderComponent extends Component {
  @service
  store
  @service
  router
  @tracked
  newsItems = []
  @tracked
  detailsViewItems = []
  @tracked
  loading = false
  @tracked
  paginationLoder = true
  indexValue
  query
  loadedData = []
  initialiseCount= true
  isNextAction = false
  isPreAction = false
  isDetailView = false
  @tracked
  header
  @tracked
  selectedItem1
  @tracked
  newsRelaseFilter
  @tracked
  isContentLoaded = false
  @tracked
  newsItemVideo = []
  getApplicableParams(params, archiveYear) {
		const {
			filterBy
		} = params;
		if (isPresent(archiveYear)) {
			if(this.router.currentRoute.localName == 'archive' && archiveYear == '2017'){
				let param
				if( params && params.field_story ) {
					param = {
						from: `2017-01-01`,
						to: `2017-01-21`,
						field_story:1

					}	
				} else {
					param = {
						from: `2017-01-01`,
						to: `2017-01-21`
					}	
				}
				return param;
			} else {

				let paramYear;
				if (params && params.field_story ) {
					paramYear = { year:archiveYear,field_story:1 }
				} else {
					paramYear= { year:archiveYear }
				}
				return paramYear;
			}
		}
		if(params.year == '2017'){
			return {
				from: `2017-01-21`,
				to: `2017-12-31`
			}
		}
		if (isPresent(filterBy) && isPresent(params[filterBy])) {
			if(params.field_story){
				let filter = {
					[filterBy]: params[filterBy]
				}
				return Object.assign({},{field_story:1},filter)
			}
			return {
				[filterBy]: params[filterBy],
			}
		}
		if(params.field_story){
			if(this.router.currentRoute.localName == 'archive') {
			return {
				field_story:1,
				from: `2017-01-01`,
				to: `2017-01-21`
			}
			} else {
				return { field_story:1 }
			}
		}
		if(this.router.currentRoute.localName == 'archive'){
			return {
				from: `2017-01-01`,
				to: `2017-01-21`
			}
		}

	}



  @action
  async loader(modelName, queryParams, archiveYear, index) {
	$('.app-card-primary').css('display','block');
	this.selectedItem1 = 'Speeches';
	this._header(modelName, queryParams, archiveYear, index)
	this.indexValue = index;
	this.paginationLoder = true;
	// if(this.indexValue){
	// 	this.paginationLoder = true;
	// }
	let pageIndex = {
		start_pager: this.indexValue
		
	}
	if(queryParams){
		this.query = this.getApplicableParams(queryParams, archiveYear);
	}
	this.loading = false;
	let that = this;
	this.store.unloadAll(modelName);
	await this.store.findAll(modelName, { reload: true,
      adapterOptions: {
		query: Object.assign({},that.query,pageIndex),
		
      },
		}).then(function(item) {
			if(queryParams == 'indexRoute'){
				that.newsItems = item.toArray().slice(0, 3);
				return true;
			}
			if(queryParams == 'indexRouteVideo'){
				that.newsItemVideo = item.toArray()[0]
				return true;
			}
			that.detailsViewItems = [];
			that.loading = true;
			that.paginationLoder = false;
			if(item.length == 0){
				that.isContentLoaded = true;
			}
			if(that.isDetailView){
				that.isDetailView = false;
				that.detailsViewItems = item.toArray();
			} else {
				if(item && item.length > 10){
					let deSelectedRows;
					if(that.newsItems && that.newsItems.length == 10 && that.initialiseCount){
						deSelectedRows = that.newsItems;
						that.initialiseCount = false;
					}
	
					if(that.loadedData && that.loadedData.length > 10){
						deSelectedRows = that.loadedData;
					}
					that.loadedData = item.toArray();
					let selectedRows = item.toArray();
					let ids = new Set(deSelectedRows.map(({ id }) => id));
					selectedRows = selectedRows.filter(({ id }) => !ids.has(id));
					that.newsItems = selectedRows;
				} else {
					if(item && item.toArray()[0].field_date_to_be_published){
						that.newsItems = that.newsItems.pushObject(item.toArray().sortBy('field_date_to_be_published').reverse());
					}else if(item && item.toArray()[0].field_date){
						that.newsItems = item.toArray().sortBy('field_date').reverse();
					} else {
						that.newsItems = item.toArray()
					}
			   }
			}
				 	
		  }).catch(function(error){
			that.paginationLoder = false;
		  });
  }
  @action
  setNextTab(modelName, queryParams, archiveYear){
	this.isNextAction = true
	if(this.indexValue == 0){
		this.indexValue = this.indexValue + 11;
	}else{
		this.indexValue = this.indexValue + 10;
	}
	
	this.loader(modelName, queryParams, archiveYear,this.indexValue)
  }
  @action
  setPrevTab(modelName, queryParams, archiveYear){
	  this.isPreAction = true;
	  if(this.indexValue == 11){
		this.indexValue = this.indexValue - 11;
		this.loader(modelName, queryParams, archiveYear,this.indexValue)
	  } else if(this.indexValue > 11) {
		this.indexValue = this.indexValue - 10;
		this.loader(modelName, queryParams, archiveYear,this.indexValue)
	  }
	  
  }
  _header(modelName, queryParams, archiveYear, index){
	  if(queryParams != undefined && queryParams.field_story == '1'){
		if(this.router._router.currentRoute.localName == 'archive') {
			this.header ='News Stories archive';
		} else {
			this.header = 'News Stories';
		}
	  } else if(this.router._router.currentRoute.localName == 'archive') {
		  this.header = modelName +' '+'archive';
	  } else {
		this.header = modelName;
	  }
	  
	  if(queryParams && queryParams.filterBy == 'region'){
		  this.newsRelaseFilter = queryParams.region;
	  }
	  if(queryParams &&  queryParams.filterBy == 'year'){
		this.newsRelaseFilter = queryParams.year;
	  }
	  if(queryParams &&  queryParams.filterBy == 'state'){
		this.newsRelaseFilter = queryParams.state;
	  }
	  if(queryParams &&  queryParams.filterBy == 'topic'){
		this.newsRelaseFilter = queryParams.topic;
	  }
  }
  
} 