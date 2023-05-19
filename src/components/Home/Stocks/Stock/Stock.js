import React from 'react'
import { Link } from 'react-router-dom'

export default function Stock({ stock }) {
  const linkUrl = `/stocks/${stock.symbol}`


  return (
    <p>
      <Link to={linkUrl} refresh="true">{stock.symbol} </Link>
    </p>
  )
}
