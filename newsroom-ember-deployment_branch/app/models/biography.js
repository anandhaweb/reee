import Model, { attr } from '@ember-data/model';

export default class BiographyModel extends Model {
	@attr('string')
	title
	
	@attr('string')
	body
	
	@attr('string')
	field_biography_name
	
	@attr()
	field_image

	@attr('string')
	field_important_links_2
	
	@attr('string')
	field_biography_record_number
	
}