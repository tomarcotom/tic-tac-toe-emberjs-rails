import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';
module('Acceptance | some route', (hooks) => {
  setupApplicationTest(hooks);
  test('visiting /', async function (assert) {
    await visit('/');
    assert.strictEqual(
      this.element.querySelector('h2#title').textContent,
      'Welcome to Tic-Tac-Toe Challenge!'
    );
  });
});
