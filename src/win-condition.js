const WIN_CONDITION = 'WON';

export const winCondition = (player) => {
  return player.status === WIN_CONDITION;
};
