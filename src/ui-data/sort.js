import { mori } from 'datascript-mori';

const { get, first } = mori;

export function highestToLowest (a, b) {
  return (get(b, 'total') - get(a, 'total'));
}

export function byTimeStamp (a, b) {
  return (first(b) - first(a));
}
