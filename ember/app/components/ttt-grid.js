import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class TttGridComponent extends Component {
  @tracked board = [];
  @tracked plays = 0;
  @tracked gridRows = [];
  @tracked matchEnded = false;
  @tracked end = false;
  @tracked isDraw = false;
  winningCombinations = [
    [[0, 0],[0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]],
  ];

  constructor() {
    super(...arguments);
    this.initialiseBoard();
  }

  @action
  play(event) {
    let validPlay = false;
    this.gridRows.forEach((elem) => {
      elem.forEach((innerElem) => {
        if (innerElem.key == event.target.id && !innerElem.value) {
          innerElem.value = this.plays % 2 === 0 ? 'X' : 'O';
          this.plays++;
          validPlay = true;
        }
      });
    });
    let tmp = JSON.parse(JSON.stringify(this.gridRows));
    this.gridRows = [].concat(tmp);
    if (validPlay) this.checkWinner();
  }

  checkWinner() {
    this.winningCombinations.forEach((comb) => {
      const [a, b, c] = comb;
      if (
        this.gridRows[a[0]][a[1]].value &&
        this.gridRows[a[0]][a[1]].value === this.gridRows[b[0]][b[1]].value &&
        this.gridRows[b[0]][b[1]].value === this.gridRows[c[0]][c[1]].value
      ) {
        this.end = true;
      }
    });
    if (this.plays === 9 && !this.end) this.isDraw = true;
    this.args.setMessage(this.end, false, this.isDraw);
  }

  @action
  initialiseBoard() {
    this.initialiseVariables();
    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 3; i++) {
        this.board.push({ key: [i, j].join(''), value: '' });
      }
    }
    for (let i = 0; i < this.board.length; i += 3) {
      this.gridRows.push(this.board.slice(i, i + 3));
    }
  }

  @action
  restart() {
    this.initialiseBoard();
    this.args.setMessage(this.end, true, this.isDraw);
  }

  initialiseVariables() {
    this.gridRows = [].concat([]);
    this.board = [];
    this.end = false;
    this.plays = 0;
    this.isDraw = false;
  }

  get showRestartButton() {
    return this.end || this.isDraw;
  }
}
