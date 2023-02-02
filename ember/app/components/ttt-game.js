import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class TttGameComponent extends Component {
  @tracked playerNumber = '1';
  @tracked endGame = false;
  @tracked isDraw = false;
  @tracked player1Count = 0;
  @tracked player2Count = 0;

  //update parent status messages when actions are performed in ttt-grid
  @action
  updateStatus(end, restart, isDraw) {
    if (!end && !restart && !isDraw) {
      this.playerNumber = this.playerNumber == '1' ? '2' : '1';
    } else if (end && !restart) {
      this.endGame = end;
      if (this.playerNumber === '1') this.player1Count++;
      else this.player2Count++;
    } else if (restart) {
      this.endGame = false;
      this.playerNumber = '1';
    }
    this.isDraw = isDraw;
  }

  get drawMessage() {
    return "It's a draw!";
  }

  get winnerMessage() {
    return `Player ${this.playerNumber} won!`;
  }

  get turnMessage() {
    return `Player ${this.playerNumber} has to play now!`;
  }
}
