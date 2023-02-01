import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class TttGameComponent extends Component {
  @tracked playerNumber = '1';
  @tracked endGame = false;
  @tracked isDraw = false;
  @tracked player1Count = 0;
  @tracked player2Count = 0;
/*   @tracked messageToShow = this.turnMessage;
  winnerMessage = `Player ${this.playerNumber} won!`;
  turnMessage = `Player ${this.playerNumber} has to play now!`;
  drawMessage = `It's a draw!`; */

  @action
  setMessage(end, restart, isDraw) {
    if (!end && !restart && !isDraw) {
      this.playerNumber = this.playerNumber == '1' ? '2' : '1';
    } else if (end && !restart) {
      this.endGame = end;
      if (this.playerNumber === '1') this.player1Count++;
       else this.player2Count++;
    } else if (restart) {
      if (!isDraw) {
        /* if (this.playerNumber === '1') this.player1Count++;
        else this.player2Count++; */
      }
      this.endGame = false;
      this.playerNumber = '1';
    }
    this.isDraw = isDraw;
  }
}
