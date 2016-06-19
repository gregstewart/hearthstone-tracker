import { mori } from 'datascript-mori';

const { filter, get } = mori;

export function byWinCondition (rows, condition) {
  return filter((row) => {
    const result = get(row, 'doc');
    if (get(result, 'hasWon') === condition) {
      return result;
    }
  }, rows);
}
