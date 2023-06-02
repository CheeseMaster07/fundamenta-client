import React from 'react'

export default function Button({ isChoosed, segmentName, func }) {
  return (
    <div onClick={func} className={`segment${isChoosed}`}>
      <div className={`segment-link${isChoosed}`}>{segmentName}</div>
    </div>
  )
}
