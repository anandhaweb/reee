import Model, { attr } from '@ember-data/model';

export default class SpeechModel extends Model {
  @attr('string')
  title
  
  @attr('string')
  body

  @attr('string')
  field_area_office
  
  @attr('string')
  field_audio_link
  
  @attr('date')
  field_date
  
  @attr('string')
  field_emergency_number
  
  @attr('string')
  field_event

  @attr()
  field_image
  
  @attr('string')
  field_important_links_1
  
  @attr('string')
  field_important_links_2
  
  @attr('string')
  field_important_links_3
  
  @attr('string')
  field_issue_category
  
  @attr('string')
  field_keywords
  
  @attr('string')
  field_persons_title
  
  @attr('string')
  field_person_giving_speech
  
  @attr('string')
  field_place_of_speech
  
  @attr('string')
  field_region
  
  @attr('string')
  field_state
  
  @attr('string')
  field_sub_title
  
  @attr('string')
  field_video_link
}