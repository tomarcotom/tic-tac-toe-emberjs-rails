import { module, test } from 'qunit';
import { setupRenderingTest } from 'tic-tac-toe-emberjs-rails/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | ttt-game', function (hooks) {
  setupRenderingTest(hooks);

  test('render titles', async function (assert) {
    await render(hbs`<TttGame />`);
    assert
      .dom(this.element.querySelector('h1'))
      .hasText('Welcome to Tic-Tac-Toe Challenge!');

    assert
      .dom(this.element.querySelector('h2'))
      .hasText('Player 1 has to play now!');
  });
});
