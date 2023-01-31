import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class TttGridComponent extends Component {
  @tracked plays = [];
  @tracked value = [1, 2];
  @tracked board = [];
  @tracked plays = 0;
  @tracked gridRows = []

  constructor() {
    super(...arguments);
    // initialize board
    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 3; i++) {
        //this.board.push({ key: [i, j], value: '-' });
        this.board.push({ key: [i, j].join(''), value: '' });
      }
    }
    console.log('calling constructor')
    console.log(this.board)
    let threePartIndex = Math.ceil(this.board.length / 3);
    this.gridRows.push(this.board.splice(-threePartIndex));
    this.gridRows.push(this.board.splice(-threePartIndex));
    this.gridRows.push(this.board);
    console.log(this.gridRows)
  }

  @action
  log() {
    console.log('hey');
  }

  @action
  ciao(event) {
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
    //this.gridRows = this.gridRows.concat([...temp])
    console.log(this.gridRows)
/*     this.plays.push({
      play: 0,
      id: event.target.id,
    }); */
    //console.log(get(this, event.target.id));
    /* console.log(this.plays[event.target.id] || null); */
  }

  @action
  getSymbol(event) {
    console.log('in get symbol');
    console.log(event.target.id);
    return this.plays.length % 2 === 0 ? 'X' : 'O';
  }
}
