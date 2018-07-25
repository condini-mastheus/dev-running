import React from 'react';

const Distance = props => {
  const { distance, metric } = props
  let distanceStr = '';

  switch (metric) {
    case 'metric':
      distanceStr = `${distance.toFixed(2)}Km`
      break;
    case 'imperial':
      const KM = 1.60934
      const distanceMi = distance / KM
      distanceStr = `${distanceMi.toFixed(2)}mi`
      break;
    default:
      return 'ERROR'
  }

  return <span>{distanceStr}</span>
}
export default Distance;