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

  deckPicks.forEach(({ idx, deck, val: divident }) => {
    const picks = [
      ...gamePicks,
      <IPick>{ idx, name: getCardName(idx), divident, factor: qty },
    ];

    const game = new GameState(picks);

    if (game.isEnough) {
      games.push({
        picks,
        score: game.score,
        // score: game.score > 21 ? 22 : game.score,
      });
    } else {
      doDeck(deck, picks);
    }
  });
};

export const iterate = () => {
  doDeck(Deck.getFullDeck(), []);

  fs.writeFileSync('games.json', JSON.stringify(games, undefined, 2));

  const probabilities = games.map(({ picks, score }) => {
    let totalDivident = 1;
    let totalFactor = 1;

    picks.forEach(({ divident, factor }) => {
      totalDivident *= divident;
      totalFactor *= factor;
    });

    return {
      totalDivident,
      totalFactor,
      probability: totalDivident / totalFactor,
      score: score > 21 ? 22 : score,
    };
  });

  fs.writeFileSync(
    'probabilities.json',
    JSON.stringify(probabilities, undefined, 2)
  );

  const probabilitySum = probabilities.reduce((acc, { score, probability }) => {
    if (undefined === acc[score]) {
      acc[score] = 0;
    }
    acc[score] += probability;
    return acc;
  }, <Record<number, number>>{});

  fs.writeFileSync(
    'probabilitySum.json',
    JSON.stringify(probabilitySum, undefined, 2)
  );

  console.log(
    Object.values(probabilitySum).reduce((acc, val) => {
      return acc + val;
    }, 0)
  );
};
