import { expect } from 'chai';
import { transformGameBreakdownDetails, transformSummaryStats } from '../../src/ui-data/transformers';

describe('Transformers', () => {
  it('transforms summary stats data into the UI shape', () => {
    const expected = [
      {id: 1, label: "Wins", text: "3"},
      {id: 2, label: "Losses", text: "2"},
      {id: 3, label: "Ratio", text: "60%"}
    ];
    const input = {
      wins: 3,
      losses: 2,
      ratio: 0.6 * 100 + '%'
    };

    expect(expected).to.deep.equal(transformSummaryStats(input));
  });

  // it('transforms the match breakdown into the UI shape', () => {
  //   const expected = {
  //     wins:
  //     [ { class: 'Rogue', total: "2", percentage: '66.66666666666666%' },
  //       { class: 'Priest', total: "1", percentage: '33.33333333333333%' }
  //     ],
  //     losses:
  //     [ { class: 'Rogue', total: "1", percentage: '50%' },
  //       { class: 'Warlock', total: "1", percentage: '50%' }
  //     ]
  //   };
  //   const input = {
  //     wins: {"class" "Rogue", "value" 2, "percentage" "66.66666666666666%"} {"class" "Priest", "value" 1, "percentage" "33.33333333333333%"},
  //     losses: {"class" "Rogue", "value" 1, "percentage" "50%"} {"class" "Warlock", "value" 1, "percentage" "50%"}
  //   });
  //
  //   expect(expected).to.deep.equal(transformGameBreakdownDetails(input));
  // });
});
