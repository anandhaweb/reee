import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import SideBarComponent from '../side-bar/component';
import { action } from '@ember/object';
import $ from 'jquery';
export default class NewsDetailComponent extends SideBarComponent {
    @service
    router
    @tracked
    newsRelaseFilter
    @tracked
    parentModel
    @tracked
    isBreadCumHide
    constructor() { 
        super(...arguments);
        this.isBreadCumHide = this.args.listBreadCrumb
        this.parentModel = this.router.currentRoute.parent.name.split('.')[1];
       if(this.router.currentRoute.paramNames[0] == 'title' ){
        $('.app-card-primary').css('display','none');
       } else {
        $('.app-card-primary').css('display','block');
       }
    }
    @action
	async setCurrentTab1(modelName) {
		this.router.transitionTo(modelName);
	}	
     
}