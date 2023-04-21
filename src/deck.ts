// cards:
// 2..10 (9x 0..8)
// J Q K A -> (4x) 9 10 11 12
// totals 13x

// 4 suits * 6 decks = 24 of each card

export class Deck {
  private possibleCards: number[];

  constructor(private readonly remainingCards: number[]) {
    this.possibleCards = this.remainingCards.map((_, idx) => idx);
  }

  static getFullDeck() {
    return new Array<number>(13).fill(24);
  }

  pickCard(pickIdx: number) {
    return new Deck(
      this.remainingCards.map((val, idx) => (pickIdx === idx ? val - 1 : val))
    );
  }
}
