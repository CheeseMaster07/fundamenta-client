import React, { useRef, useEffect, useState } from 'react';
import { Outlet, useParams, Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

import { getStockData } from '../../actions/stockPage'
import { getFinancialStatementsToggled } from '../../actions/financialStatementsToggled'

import '../../css/stockPageHeader.css'

export default function StockPageHeader() {
  const stock = useSelector((state) => state.stockPage)
  const { id } = useParams()
  const dispatch = useDispatch()
  //const stockUrl = `/stocks/${id}`
  const overview_url = `/stocks/${id}`
  const financialStatements_url = `/stocks/${id}/financial-statements`
  const ratios_url = `/stocks/${id}/ratios`
  const dividends_url = `/stocks/${id}/dividends`
  const segments_url = `/stocks/${id}/segments`
  const forecasts_url = `/stocks/${id}/forecasts`
  const location = useLocation()
  //console.log(useSelector((state) => state))



  useEffect(() => {
    dispatch(getStockData(id))

  }, [dispatch])


  //console.log('State:', location.state)

  function isChoosedSegment(segment) {
    const segmentPathname = `/stocks/${id}/${segment}`
    if (location.pathname === segmentPathname) {
      return true
    } else if (location.pathname === `/stocks/${id}${segment}`) {
      return true
    } else if (location.pathname == `/stocks/${id}/${segment}/income-statement` || location.pathname == `/stocks/${id}/${segment}/balance-sheet` || location.pathname == `/stocks/${id}/${segment}/cashflow-statement`) {
      return true
    } else {
      return false
    }
  }

  return (
    <>
      <div className="stock-nav">

        <div className="stock-title">
          <h1 ><Link className="stock-title-link" to={overview_url} state={stock} >{stock.name}</Link></h1>
        </div >
        <div className="stock-segments">
          {isChoosedSegment('') ?
            <div className="stock-segment-choosed">
              <Link className="stock-segment-link-choosed" to={overview_url} state={stock} >Overview</Link>
            </div>
            :
            <div className="stock-segment">
              <Link className="stock-segment-link" to={overview_url} state={stock} >Overview</Link>
            </div>
          }
          {isChoosedSegment('financial-statements') ?
            <div className="stock-segment-choosed">
              <Link className="stock-segment-link-choosed" to={financialStatements_url} state={stock} >Financial Statements</Link>
            </div>
            :
            <div className="stock-segment">
              <Link className="stock-segment-link" to={financialStatements_url} state={stock} >Financial Statements</Link>
            </div>
          }
          {isChoosedSegment('ratios') ?
            <div className="stock-segment-choosed">
              <Link className="stock-segment-link-choosed" to={ratios_url} state={stock} >Ratios</Link>
            </div>
            :
            <div className="stock-segment">
              <Link className="stock-segment-link" to={ratios_url} state={stock} >Ratios</Link>
            </div>
          }
          {isChoosedSegment('dividends') ?
            <div className="stock-segment-choosed">
              <Link className="stock-segment-link-choosed" to={dividends_url} state={stock} >Dividends</Link>
            </div>
            :
            <div className="stock-segment">
              <Link className="stock-segment-link" to={dividends_url} state={stock} >Dividends</Link>
            </div>
          }
          {isChoosedSegment('segments') ?
            <div className="stock-segment-choosed">
              <Link className="stock-segment-link-choosed" to={segments_url} state={stock} >Segments</Link>
            </div>
            :
            <div className="stock-segment">
              <Link className="stock-segment-link" to={segments_url} state={stock} >Segments</Link>
            </div>
          }
          {isChoosedSegment('forecasts') ?
            <div className="stock-segment-choosed">
              <Link className="stock-segment-link-choosed" to={forecasts_url} state={stock} >Forecasts</Link>
            </div>
            :
            <div className="stock-segment">
              <Link className="stock-segment-link" to={forecasts_url} state={stock} >Forecasts</Link>
            </div>
          }

        </div>

      </div>
      <Outlet />
    </>
  )
}
