import { module, test } from 'qunit';
import { setupRenderingTest } from 'tic-tac-toe-emberjs-rails/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | ttt-grid', function (hooks) {
  setupRenderingTest(hooks);

  test('Click <td> and show symbols', async function (assert) {
    await render(hbs`<TttGame  setMessage="setMessage" />`);
    assert.dom(this.element.querySelectorAll('td')[0]).hasText('');
    this.element.querySelectorAll('td')[0].click();
    assert.dom(this.element.querySelectorAll('td')[0]).hasText('O');
    this.element.querySelectorAll('td')[1].click();
    assert.dom(this.element.querySelectorAll('td')[1]).hasText('X');
  });

  test('Win game and show button', async function (assert) {
    await render(hbs`<TttGame  setMessage="setMessage" />`);
    assert.dom(this.element.querySelector('button')).doesNotExist();
    this.element.querySelectorAll('td')[0].click();
    this.element.querySelectorAll('td')[3].click();
    this.element.querySelectorAll('td')[1].click();
    this.element.querySelectorAll('td')[4].click();
    this.element.querySelectorAll('td')[2].click();
    assert.dom(this.element.querySelector('button')).exists();
  });
});
