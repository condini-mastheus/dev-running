import React from 'react';
import moment from 'moment-timezone'

const Timezone = props => {
  const { date, timezone } = props
  const gmtDate = moment.tz(date, 'GMT');
  const tzDate = gmtDate.clone().tz(timezone);

  const timezoneStr = tzDate.format('DD/MM/YYYY HH:mm:ss');

  return <span>{timezoneStr}</span>
};

export default Timezone;