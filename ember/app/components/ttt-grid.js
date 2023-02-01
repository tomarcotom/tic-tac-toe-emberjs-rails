import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class TttGridComponent extends Component {
  @tracked board = [];
  @tracked plays = 0;
  @tracked gridRows = [];
  @tracked matchEnded = false;

  constructor() {
    super(...arguments);
    this.initialiseBoard();
  }

  @action
  play(event) {
    console.log(event.target.id)
    this.plays++;
    this.gridRows.forEach((elem) => {
      elem.forEach((innerElem) => {
        if (innerElem.key == event.target.id) {
          innerElem.value = !innerElem.value && this.plays % 2 === 0 ? 'X' : 'O';
        }
      });
    });
    let tmp = JSON.parse(JSON.stringify(this.gridRows));
    this.gridRows = [].concat(tmp);
    this.checkWinner();
  }

  checkWinner() {
    var winningCombinations = [
      [[0,0], [0, 1], [0, 2]],
      [[0,0], [0, 1], [0, 2]],
      [[0,2], [1, 2], [2, 2]],
      [[2,2], [2, 1], [2, 0]],
      [[2,0], [1, 0], [0, 0]],
      [[0,2], [1, 1], [2, 0]],
      [[2,2], [1, 1], [0, 0]],
    ];
    console.log('&&&&&&&')
    winningCombinations.forEach((comb) => {
      console.log(comb)
      const [a, b, c] = comb
      console.log(a)
      console.log(b)
      console.log(c)
      //console.log(this.gridRows[comb[0][0]][comb[0][1]].value)
      console.log('$$$$$$$')
      if (
        this.gridRows[a[0]][a[1]].value != '' &&
        this.gridRows[a[0]][a[1]].value === this.gridRows[b[0]][b[1]].value && this.gridRows[b[0]][b[1]].value === this.gridRows[c[0]][c[1]].value) {
        console.log("WINNER!!!!!")
      }
    })
    if(this.plays === 5) {
      this.args.setMessage(true);
    } else {
      this.args.setMessage(false);
    }
  }

  initialiseBoard() {
    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 3; i++) {
        this.board.push({ key: [i, j].join(''), value: '' });
      }
    }
    let threePartIndex = Math.ceil(this.board.length / 3);
    this.gridRows.push(this.board.splice(-threePartIndex));
    this.gridRows.push(this.board.splice(-threePartIndex));
    this.gridRows.push(this.board);
    console.log(this.args.updatePlayerName);
  }

}
