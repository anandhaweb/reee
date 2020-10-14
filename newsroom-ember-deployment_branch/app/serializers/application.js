import JSONAPISerializer from '@ember-data/serializer/json-api';
import { underscore } from '@ember/string';

export default class ApplicationSerializer extends JSONAPISerializer {

  keyForAttribute(attr) {
    return underscore(attr);
  }

  normalizeFindAllResponse(store, primaryModelClass, payload, id, requestType) {
    let payloadData = {
      data: [],
    };

    for (let record of payload) {
      let data = {
        id: record.id,
        type: record.type,
        changed: record.changed,
        attributes: record.content,
      }
      payloadData.data.push(data);
    }

    return this._normalizeResponse(store, primaryModelClass, payloadData, id, requestType, false);
  }
}