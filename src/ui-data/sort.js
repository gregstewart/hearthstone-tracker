import { mori } from 'datascript-mori';

const { get } = mori;

export function highestToLowest (a, b) {
  return (get(b, 'total') - get(a, 'total'));
}
