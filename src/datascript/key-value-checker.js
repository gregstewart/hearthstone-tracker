import { mori } from 'datascript-mori';

const { every, toClj, getIn, vector } = mori;

export default function (item) {
  const checkKeys = (doc) => {
    const element = toClj(doc);
    const keysToCheck = vector("startTime",
      "endTime",
      "for.name",
      "for.id",
      "for.class",
      "against.name",
      "against.id",
      "against.class",
      "hasWon");

    return every((key) => {
      return getIn(element, key.split(".")) !== null && getIn(element, key.split(".")) !== '';
    }, keysToCheck);
  };

  return typeof item !== 'undefined' && typeof item.doc !== 'undefined' && checkKeys(item.doc);
}
