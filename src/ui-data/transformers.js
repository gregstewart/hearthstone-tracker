import { assoc, find, get, last, map, toClj, toJs } from 'mori';
import { statsShape } from '../constants';

export function transformSummaryStats (input) {
  const shape = toClj(statsShape);

  let output = map((element) => {
    let keyToFind = get(element, 'label').toLowerCase();
    let foundValue = find(toClj(input), keyToFind);
    return assoc(element, 'text', last(foundValue).toString());
  }, shape);

  return toJs(output);
}
