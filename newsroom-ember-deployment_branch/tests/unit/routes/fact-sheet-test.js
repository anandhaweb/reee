import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | fact_sheet', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:fact-sheet');
    assert.ok(route);
  });
});
