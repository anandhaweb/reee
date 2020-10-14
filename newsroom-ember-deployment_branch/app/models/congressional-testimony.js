import Model, { attr } from '@ember-data/model';

export default class CongressionalTestimonyModel extends Model {
  @attr('string')
  title

  @attr('string')
  body

  @attr('string')
  field_bill_name

  @attr('string')
  field_bill_number

  @attr('string')
  field_city_state

  @attr()
  field_image
  
  @attr('string')
  field_committee

  @attr('date')
  field_date

  @attr('string')
  field_keywords

  @attr('string')
  field_name

  @attr('string')
  field_position

  @attr('string')
  field_senate_or_house

  @attr('string')
  field_sub_committee

  @attr('string')
  field_video_link
}