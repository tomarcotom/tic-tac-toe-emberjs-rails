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
    let index = event.target.id.split('');
    let cellClicked = this.gridRows[index[0]][index[1]];
    if (!cellClicked.value && !this.end) {
      cellClicked.value = this.plays % 2 === 0 ? 'X' : 'O';
      this.plays++;
      let tmp = JSON.parse(JSON.stringify(this.gridRows));
      this.gridRows = [].concat(tmp);
      this.checkWinner();
    }
  }

  checkWinner() {
    this.winningCombinations.forEach((comb) => {
      const [a, b, c] = comb;
      if (
        this.gridRows[a[0]][a[1]].value &&
        this.gridRows[a[0]][a[1]].value === this.gridRows[b[0]][b[1]].value &&
        this.gridRows[b[0]][b[1]].value === this.gridRows[c[0]][c[1]].value
      ) {
        this.gridRows[a[0]][a[1]].class = this.gridRows[b[0]][b[1]].class = this.gridRows[c[0]][c[1]].class = 'winningCell';
        this.end = true;
      }
    });
    if (this.plays === 9 && !this.end) this.isDraw = true;
    this.args.updateStatus(this.end, false, this.isDraw);
  }

  @action
  initialiseBoard() {
    this.initialiseVariables();
    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 3; i++) {
        this.board.push({ key: [j, i].join(''), value: '', class: '' });
      }
    }
    for (let i = 0; i < this.board.length; i += 3) {
      this.gridRows.push(this.board.slice(i, i + 3));
    }
  }

  @action
  restart() {
    this.initialiseBoard();
    this.args.updateStatus(this.end, true, this.isDraw);
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
