import { module, test } from 'qunit';
import { setupRenderingTest } from 'tic-tac-toe-emberjs-rails/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | ttt-grid', function (hooks) {
  setupRenderingTest(hooks);

  test('Click <td> and show symbols', async function (assert) {
    await render(hbs`<TttGame  updateStatus="updateStatus" />`);
    assert.dom(this.element.querySelectorAll('td')[0]).hasText('');
    this.element.querySelectorAll('td')[0].click();
    assert.dom(this.element.querySelectorAll('td')[0]).hasText('X');
    this.element.querySelectorAll('td')[1].click();
    assert.dom(this.element.querySelectorAll('td')[1]).hasText('O');
  });

  test('Win game - Show button - Display win message', async function (assert) {
    await render(hbs`<TttGame  updateStatus="updateStatus" />`);
    assert.dom(this.element.querySelector('button')).doesNotExist();
    this.element.querySelectorAll('td')[0].click();
    this.element.querySelectorAll('td')[3].click();
    this.element.querySelectorAll('td')[1].click();
    this.element.querySelectorAll('td')[4].click();
    this.element.querySelectorAll('td')[2].click();
    assert.dom(this.element.querySelector('button')).exists();
    assert.dom(this.element.querySelector('h2')).hasText('Player 1 won!');
  });

  test('Draw game - Show button - Display draw message', async function (assert) {
    await render(hbs`<TttGame  updateStatus="updateStatus" />`);
    assert.dom(this.element.querySelector('button')).doesNotExist();
    this.element.querySelectorAll('td')[0].click();
    this.element.querySelectorAll('td')[4].click();
    this.element.querySelectorAll('td')[2].click();
    this.element.querySelectorAll('td')[1].click();
    this.element.querySelectorAll('td')[5].click();
    this.element.querySelectorAll('td')[8].click();
    this.element.querySelectorAll('td')[6].click();
    this.element.querySelectorAll('td')[3].click();
    this.element.querySelectorAll('td')[7].click();
    assert.dom(this.element.querySelector('button')).exists();
    assert.dom(this.element.querySelector('h2')).hasText("It's a draw!");
  });
});
