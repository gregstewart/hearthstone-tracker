import React from 'react';
import {PanelItem} from './panel-item.jsx';

const getLabel = (summaryStat) => {
  let label;
  switch (summaryStat) {
    case "today":
      label = "Today";
      break;
    case "thisWeek":
      label = "This week";
      break;
    case "thisMonth":
      label = "Current season";
      break;
    case "lastMonth":
      label = "Last season";
      break;
    case "allTime":
      label = "All time";
      break;
    default:
      label = "Unknown";
      break;
  }

  return label;
};

export const StatsPanel = ({data}) => {
  let panels = [];
  for (let key in data) {
    panels.push(<PanelItem data={data[key]} key={key.toString()} label={getLabel(key)} />);
  }
  return (
    <div>
      {panels}
    </div>
  );
};
