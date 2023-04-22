import * as fs from 'fs';

import { IPick } from './state';
import { Deck } from './deck';
import { GameState } from './game-state';
import { getCardName } from './card-idx';

const games: {
  picks: IPick[];
  score: number;
}[] = [];

const doDeck = (deckArg: Deck, gamePicks: IPick[]) => {
  const { qty, picks: deckPicks } = deckArg.getPicks();

  deckPicks.forEach(({ idx, deck }) => {
    if (gamePicks.length < 2) {
      console.log(`Picking lvl${gamePicks.length}, idx ${idx}`);
    }

    const picks = [
      ...gamePicks,
      { idx, name: getCardName(idx), probabilityFactor: qty },
    ];

    const game = new GameState(picks);

    if (game.isEnough) {
      games.push({
        picks,
        score: game.score > 21 ? 22 : game.score,
      });
    } else {
      doDeck(deck, picks);
    }
  });
};

export const iterate = () => {
  doDeck(Deck.getFullDeck(), []);
  fs.writeFileSync('games.json', JSON.stringify(games, undefined, 2));
};
