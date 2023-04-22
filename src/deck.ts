// 4 suits * 6 decks = 24 of each card

export class Deck {
  constructor(
    private readonly remainingCards: number[],
    private readonly qty: number
  ) {}

  static getFullDeck() {
    const deckArray = new Array<number>(13).fill(24);
    return new Deck(deckArray, 24 * 13);
  }

  private pickCard(pickIdx: number) {
    return new Deck(
      this.remainingCards.map((val, idx) => (pickIdx === idx ? val - 1 : val)),
      this.qty - 1
    );
  }

  getPicks() {
    return {
      qty: this.qty,
      picks: this.remainingCards
        .map((val, idx) => ({
          val,
          idx,
          deck: val && this.pickCard(idx),
        }))
        .filter((x) => x.val),
    };
  }
}
