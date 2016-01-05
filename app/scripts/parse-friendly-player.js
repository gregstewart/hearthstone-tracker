const isFriendly = (element) => {
  if (element.team === 'FRIENDLY') {
    return element;
  }

  return false;
};

export default function (players) {
  return players.find(isFriendly);
}
