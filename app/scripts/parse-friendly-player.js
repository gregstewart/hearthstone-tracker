const isFriendly = (element) => {
  if (element.team === 'FRIENDLY') {
    return element;
  }

  return false;
};

export function parseFriendlyPlayer (players) {
  return players.find(isFriendly);
}

export function parseFriendlyPlayerById (players, id) {
  return players.find((element) => {
    if (element.id === id) {
      return element;
    }

    return false;
  });
}
