import { filter, get } from 'mori';

export function byWinCondition (rows, condition) {
  return filter((row) => {
    const result = get(row, 'doc');
    if (get(result, 'hasWon') === condition) {
      return result;
    }
  }, rows);
}
