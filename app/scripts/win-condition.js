const WIN_CONDITION = 'WON';

export default function (player) {
  return player.status === WIN_CONDITION;
}
