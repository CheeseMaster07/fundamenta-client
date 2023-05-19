import React from 'react'

import Stock from './Stock/Stock'

export default function Stocks({ stocks }) {
  return (
    <>
      <div className="dropdown">
        {
          stocks.map(stock => {
            return <div className="dropdown-row">{stock.symbol}</div>
          })
        }
      </div>

    </>
  )
}

//return <Stock key={stock.CIK} stock={stock} />