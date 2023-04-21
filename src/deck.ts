// cards:
// 2..10 (9x 0..8)
// J Q K A -> (4x) 9 10 11 12
// totals 13x

// 4 suits * 6 decks = 24 of each card

export class Deck {
  private readonly remainingCards: number[];
  private possibleCards: number[];

  constructor() {
    this.remainingCards = new Array<number>(13).fill(24);
    this.possibleCards = this.remainingCards.map((_, idx) => idx);
  }
}
