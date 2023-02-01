import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class TttGameComponent extends Component {
  @tracked playerNumber = '1';
  @tracked endGame = false;

  @action
  setMessage(endGame) {
    if (!endGame) {
      this.playerNumber = this.playerNumber == '1' ? '2' : '1';
    }
    else {
      this.endGame = endGame
    }
  }
}