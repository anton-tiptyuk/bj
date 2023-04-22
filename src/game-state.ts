import { IPick } from 'state';

export class GameState {
  private readonly _picks: IPick[] = [];
  private _score = 0;

  constructor(picks: IPick[]) {
    picks.forEach((p) => this.addPick(p));
  }

  addPick(pick: IPick) {
    this._picks.push(pick);

    const { idx } = pick;

    let value = 2 + idx;
    if (value > 10) value = 10;

    // ace
    if (12 === idx) {
      if (this._score <= 21 - 11) {
        value = 11;
      } else value = 1;
    }

    this._score += value;
  }

  get score() {
    return this._score;
  }

  get isEnough() {
    return this._score >= 17;
  }

  get picks() {
    return [...this.picks];
  }
}
