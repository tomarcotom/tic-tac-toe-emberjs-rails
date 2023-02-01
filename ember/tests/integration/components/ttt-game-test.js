import { module, test } from 'qunit';
import { setupRenderingTest } from 'tic-tac-toe-emberjs-rails/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | ttt-game', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<TttGame />`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      <TttGame>
        template block text
      </TttGame>
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
