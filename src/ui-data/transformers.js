import { mori } from 'datascript-mori';
import { statsShape } from '../constants';

const { assoc, find, get, last, map, toClj, toJs } = mori;

export function transformSummaryStats (input) {
  const shape = toClj(statsShape);

  let output = map((element) => {
    let keyToFind = get(element, 'label').toLowerCase();
    let foundValue = find(toClj(input), keyToFind);
    return assoc(element, 'text', last(foundValue).toString());
  }, shape);

  return toJs(output);
}

export function formattedPercentage (val) {
  return val * 100 + '%';
}
