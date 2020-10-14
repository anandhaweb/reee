import Route from '@ember/routing/route';

export default class NewsRoomRoute extends Route {
	queryParams = {
		filterBy: {
			refreshModel: true,
		},
    year: {
			refreshModel: true,
		},
    region: {
			refreshModel: true,
		},
    state: {
			refreshModel: true,
		},
		topic: {
			refreshModel: true,
		},
		field_story: {
			refreshModel: true,
		},
	};
}
