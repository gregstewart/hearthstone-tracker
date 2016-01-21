const isFriendly = (element) => {
  if (element.team === 'FRIENDLY') {
    return element;
  }

  return false;
};

export function parseFriendlyPlayer (players) {
  return players.find(isFriendly);
}

export function parsePlayerById (players, id) {
  return players.find((element) => {
    if (element.id === id) {
      return element;
    }

    return false;
  });
}

export function extractPlayerName (players, id) {
  let player = parsePlayerById(players, id);
  return player.name;
}
