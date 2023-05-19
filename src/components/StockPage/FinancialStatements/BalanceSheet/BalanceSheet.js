import React, { useEffect, useState } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'


import '../../../../css/table.css'
import Header from '../FinancialStatementsHeader'
import { getFinancialStatementsToggled } from '../../../../actions/financialStatementsToggled'

import BalanceSheet_yearly from './Periods/BalanceSheet_yearly'
import BalanceSheet_quarterly from './Periods/BalanceSheet_quarterly'


export default function BalanceSheet() {
  const location = useLocation()
  const dispatch = useDispatch()
  const stock = location.state
  const isYearlyorQuarterly = useSelector((state) => state.getIsYearlyorQuarterly)

  const fiscalYears = [...new Set(stock.FinancialStatements.BalanceSheet.annualReports.map((report) => report.fiscalDateEnding.split('-')[0]))];
  const fiscalQuaters = [...new Set(stock.FinancialStatements.BalanceSheet.quarterlyReports.map((report) => report.fiscalDateEnding.split('-')[0] + '-' + report.fiscalDateEnding.split('-')[1]))];
  fiscalYears.reverse()
  fiscalQuaters.reverse()

  const [toggleTotalAssets, setToggleTotalAssets] = useState(true)
  const [toggleTotalLiabilities, setToggleTotalLiabilities] = useState(true)
  const [toggleTotalEquity, setToggleTotalEquity] = useState(false)

  useEffect(() => {
    dispatch(getFinancialStatementsToggled({ toggleTotalAssets: toggleTotalAssets }))
  }, [toggleTotalAssets])

  useEffect(() => {
    dispatch(getFinancialStatementsToggled({ toggleTotalLiabilities: toggleTotalLiabilities }))
  }, [toggleTotalLiabilities])

  useEffect(() => {
    dispatch(getFinancialStatementsToggled({ toggleTotalEquity: toggleTotalEquity }))
  }, [toggleTotalEquity])


  return (
    <>
      {isYearlyorQuarterly.isYearly ?
        <BalanceSheet_yearly toggledMetrics={{
          toggleTotalAssets: toggleTotalAssets,
          toggleTotalLiabilities: toggleTotalLiabilities,
          toggleTotalEquity: toggleTotalEquity,
        }}
          setToggledMetrics={{
            setToggleTotalAssets: setToggleTotalAssets,
            setToggleTotalLiabilities: setToggleTotalLiabilities,
            setToggleTotalEquity: setToggleTotalEquity,
          }} />
        :
        <BalanceSheet_quarterly toggledMetrics={{
          toggleTotalAssets: toggleTotalAssets,
          toggleTotalLiabilities: toggleTotalLiabilities,
          toggleTotalEquity: toggleTotalEquity,
        }}
          setToggledMetrics={{
            setToggleTotalAssets: setToggleTotalAssets,
            setToggleTotalLiabilities: setToggleTotalLiabilities,
            setToggleTotalEquity: setToggleTotalEquity,
          }} />
      }


    </>
  )
}
