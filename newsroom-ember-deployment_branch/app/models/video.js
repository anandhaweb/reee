import Model, { attr } from '@ember-data/model';

export default class VideoModel extends Model {
    @attr('string') title
    @attr('string') body
    @attr('date') field_date
    @attr('string') field_time_zone
    @attr('string') field_video
	
}