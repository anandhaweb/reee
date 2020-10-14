import Model, { attr } from '@ember-data/model';

export default class NewsReleaseModel extends Model {
	@attr('string')
	title
	
	@attr('string')
	body
	
	@attr('string')
	field_area_office
	
	@attr('date')
	field_date_to_be_published
	
	@attr()
	field_image
	
	@attr('string')
	field_important_links_1
	
	@attr('string')
	field_important_links_2
	
	@attr('string')
	field_issue_category
	
	@attr('string')
	field_issue_number
	
	@attr('string')
	field_keywords
	
	@attr('string')
	field_primary_contact_email
	
	@attr('string')
	field_primary_contact_name
	
	@attr('string')
	field_primary_contact_phone

	@attr('string')
	field_news_release_regions
	
	@attr('string')
	field_region
	
	@attr('string')
	field_secondary_contact_email
	
	@attr('string')
	field_secondary_contact_name
	
	@attr('string')
	field_secondary_contact_phone
	
	@attr('string')
	field_state
	
	@attr('string')
	field_story
	
	@attr('string')
	field_sub_headline

}