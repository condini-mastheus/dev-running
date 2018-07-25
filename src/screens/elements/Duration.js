import React from 'react';

const Duration = props => {
  let { duration } = props
  const h = 360
  const m = 60
  const timeFormat = n => n.toString().padStart(2, '0')

  const hours = Math.floor(duration / h)
  duration = hours !== 0 ? duration % (hours * h) : duration
  const minutes = Math.floor(duration / m)
  const seconds = minutes !== 0 ? Math.floor(duration % (minutes * m)) : Math.floor(duration)

  const durationStr = `${timeFormat(hours)}h:${timeFormat(minutes)}m:${timeFormat(seconds)}s`

  return <span>{durationStr}</span>
}

export default Duration;