import React from 'react'
import { useLocation } from 'react-router-dom'


export default function Overview() {
  const location = useLocation()
  const stock = location.state
  console.log(stock)
  return (
    <>
      Overview

    </>
  )
}
