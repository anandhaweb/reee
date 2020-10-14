import Component from '@glimmer/component';
import { action } from '@ember/object'
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import NewsLoaderComponent from '../news/loader';

export default class SideBarComponent extends NewsLoaderComponent {
  @service
  router
  params=[]
  archiveParams=[]
  filterState = false
  filterStateString
  filterValueReset
  filterNameReset
  @tracked isRouteIndex = false;
  @tracked selectedItem
  @tracked selectedNav = ''
  @tracked archiveState = ''
  constructor() { 
    super(...arguments);
    if(this.router.currentRoute.name == 'news-room.index'){
      this.isRouteIndex = true;
    } else {
      this.isRouteIndex = false;
    }
  }
  newsReleaseFilterOptions = [
    {
      propertyName:'year',
      subOptions: [
        2020,
        2019,
        2018,
        2017,
      ],
    }, {
      propertyName:'region',
      subOptions: [
        "Commissioner's Office",
        'Arkansas-Rio Grande-Texas Gulf',
        'California-Great Basin',
        'Columbia-Pacific Northwest',
        'Lower Colorado Basin',
        'Missouri Basin',
        'Upper Colorado Basin',
      ],
    }, {
      propertyName:'state',
      subOptions: [
        'Arizona',
        'California',
        'Colorado',
        'Hawaii',
        'Idaho',
        'Kansas',
        'Montana',
        'Nebraska',
        'Nevada',
        'New Mexico',
        'North Dakota',
        'Oklahoma',
        'Oregon',
        'South Dakota',
        'Texas',
        'Utah',
        'Washington',
        'Washington, D.C.',
        'Wyoming',
      ],
    }, {
      propertyName:'topic',
      subOptions: [
        'Bureau of Reclamation',
        'California Water',
        'Ecosystem Restoration',
        'Hydropower',
        'Facilities',
        'Recreation',
        'Research',
        'Rural Water',
        'Safety of Dams',
        'Supporting Tribal Nations',
        'WaterSMART',
        'Youth',
      ],
    }
  ];
  newsReleaseFilterOptionsSpeech = [
    {
      propertyName:'year',
      subOptions: [
        2020,
        2019,
        2018,
        2017,
      ]
    }
  ];
  newsStoriesFilterOptions = [
   {
        propertyName:'region',
        subOptions: [
            "Commissioner's Office",
            'Arkansas-Rio Grande-Texas Gulf',
            'California-Great Basin',
            'Columbia-Pacific Northwest',
            'Lower Colorado Basin',
            'Missouri Basin',
            'Upper Colorado Basin',
        ],
      }, {
        propertyName:'topic',
        subOptions: [
          'Bureau of Reclamation',
          'California Water',
          'Ecosystem Restoration',
          'Hydropower',
          'Facilities',
          'Recreation',
          'Research',
          'Rural Water',
          'Safety of Dams',
          'Supporting Tribal Nations',
          'WaterSMART',
          'Youth',
        ],
      }
  ];

  sideBarItems = [
    {
      label: 'News & Multimedia'
    },
    {
      label: 'News Releases',
      routeName: 'news-room.news-release',
      filters: this.newsReleaseFilterOptions
    }, {
      label: 'News Stories',
      routeName: 'news-room.news-release',
      filters: this.newsStoriesFilterOptions
    }, {
      label: 'Speeches',
      routeName: 'news-room.speech',
      filters: this.newsReleaseFilterOptionsSpeech
    }, {
      label: 'Congressional Testimony',
      routeName: 'news-room.congressional-testimony',
      filters: this.newsReleaseFilterOptionsSpeech
    }
    , {
      label: 'Fact Sheet',
      routeName: 'https://www.usbr.gov/main/about/fact.html',
    },
    {
      label: 'Leadership Bios',
      routeName: 'news-room.biography',
    },
    {
      label: 'Organization Chart',
      routeName: '../assets/pdf/br_org_chart.pdf'
    },
    {
      label: 'Photos',
      routeName: 'https://www.usbr.gov/main/multimedia/index.html#photos'
    },
    {
      label: 'Multimedia',
      routeName: 'https://www.usbr.gov/main/multimedia/index.html#video'
    },
    {
      label: 'Social Media',
      routeName: 'https://www.usbr.gov/main/multimedia/index.html#social'
    }
  ];
  @action
  setMultimedia() {
    this.router.transitionTo('news-room');
    this.isRouteIndex = true;
    this.selectedItem = '';
    this.args.setQueryParams('multimedia', null);
  }
  @action
  setFilter(filterName, filterValue, routePath ) {
    this.isRouteIndex = false;
    // if(news-room.news-release == 'news-room.index'){
    //   this.isRouteIndex = true;
    // } else {
    //   this.isRouteIndex = false;
    // }
    this.args.setQueryParams('breadcum',routePath,filterValue);
    if(filterName == "breadcum"){
      this.selectedNav = '';
      let params = this.router.currentRoute.queryParams;
      for (let key in params) {
             if (params.hasOwnProperty(key)) {
               this.args.setQueryParams(key, null);
             }
           }
    }
    if(filterValue == 'archive') {
      this.archiveParams.filter(item => {
        this.args.setQueryParams(item, null);
      });
      if(this.router.currentRoute.queryParams.field_story == 1){
        this.args.setQueryParams('field_story', 1);
      }
       this.router.transitionTo(`${filterName}.archive`);
    } else {
        if(!(filterName == 'field_story') && this.filterNameReset != 'field_story'){
          if(!(Object.keys(this.router.currentRoute.queryParams).indexOf('field_story'))){
            this.args.setQueryParams('field_story', null);
          }
        }else if(this.filterNameReset != 'field_story') {
          this.args.setQueryParams('filterBy', null);
          //this.args.setQueryParams('filterBy', null);
         // Object.keys(this.router.currentRoute.queryParams)[0]
        }   
        if(this.selectedItem  != 'News Stories'){
          if(this.args.setQueryParams){
            this.args.setQueryParams('field_story', null);
          } 
        }       
          this.params =[];
          this.params.pushObject(filterName);
          this.archiveParams.pushObject(filterName);
          this.params.filter(item => {
          this.args.setQueryParams('item', null);
        });
          this.router.transitionTo(`${routePath}`);
        
          this.args.setQueryParams(filterName, filterValue);
          //this.args.setQueryParams('field_story', 1);
          if( !this.filterState && this.filterValueReset == filterValue){
            this.args.setQueryParams(filterName, null);
            this.filterState = false;
          }   
    }
    this.filterValueReset = filterValue;  
    this.filterNameReset = filterName;
  }

  @action
  toggleFilter(routePath) {
    this.filterState = !this.filterState;
    this.filterStateString = 'checked'
  }
  @action
  setCurrentTab(selectedItem){
    this.selectedItem = selectedItem;
  }
  @action
  setCurrentNav(selectedItem){
    this.archiveState = '';
    this.selectedNav = selectedItem;
  }

  @action
  setCurrentArchi(selectedItem){
    this.selectedNav = ''
    this.archiveState = selectedItem;
  }
  
}