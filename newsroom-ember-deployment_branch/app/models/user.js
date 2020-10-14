import Model, { attr } from '@ember-data/model';

export default class UserModel extends Model {
	@attr('string') name
	@attr('string') pass
	@attr()
	field_image
	
}