import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import spaceToHypen from '../../utilities/space-to-hypen';
import { inject as service } from '@ember/service';
export default class NewsDetailComponent extends Component {
    @tracked modelName;
    @service
    router
    @tracked titletext;
    @tracked isNewsStory = false;
    constructor() {
        super(...arguments);
        let title;
        if(this.router.currentRoute.queryParams.field_story = "1"){
            this.isNewsStory = true;
        }
        if(this.router.currentRoute.attributes != undefined){
            title = this.router.currentRoute.attributes.title;
            this.titletext = title;
        } else if(this.router.currentRoute.params.title != undefined){
            title = this.router.currentRoute.params.title;
            this.titletext = title;
        }
        
        //let url = spaceToHypen(title);
       // history.pushState({}, null, url);
      }
     
}