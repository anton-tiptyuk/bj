// cards:
// 2..10 (9x 0..8)
// J Q K A -> (4x) 9 10 11 12
// totals 13x

const names = {
  9: 'J',
  10: 'Q',
  11: 'K',
  12: 'A',
};

export const getCardName = (idx: number) => names[idx] || String(2 + idx);
