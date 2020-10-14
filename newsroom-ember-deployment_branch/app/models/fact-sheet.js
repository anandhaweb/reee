import Model, { attr } from '@ember-data/model';

export default class FactSheetModel extends Model {
	@attr('string')
	title
	
	@attr('string')
	body
	
	@attr()
	field_image
}