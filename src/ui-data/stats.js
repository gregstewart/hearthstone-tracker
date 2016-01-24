import mori from 'mori';
import Promise from 'bluebird';

export function summaryStats (data) {
  return new Promise((resolve, reject) => {
    let wins = 3;
    let losses = 2;
    let ratio = wins/(wins+losses) * 100 + '%';
    let result = {
      wins,losses,ratio
    }
    resolve(result);
  });
}

export function transformSummaryStats (input) {
  const shape = mori.toClj([
    {id: 1, label: "Wins", text: ""},
    {id: 2, label: "Losses", text: ""},
    {id: 3, label: "Ratio", text: ""}
  ]);

  let output = mori.map((element) => {
    let keyToFind = mori.get(element, 'label').toLowerCase();
    let foundValue = mori.find(mori.toClj(input), keyToFind);
    return mori.assoc(element, 'text', mori.last(foundValue).toString());
  }, shape);

  return mori.toJs(output);
}
