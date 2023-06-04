import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { UseTable } from 'react-table'
import { useSelector, useDispatch } from 'react-redux'


import '../../../../css/table.css'
import Header from '../FinancialStatementsHeader'
import { getFinancialStatementsToggled } from '../../../../actions/financialStatementsToggled'

import BalanceSheet_yearly from './Periods/BalanceSheet_component'
import BalanceSheet_quarterly from './Periods/BalanceSheet_quarterly'


export default function BalanceSheet() {

  const location = useLocation()
  const dispatch = useDispatch()
  const isYearlyorQuarterly = useSelector((state) => state.getIsYearlyorQuarterly)

  const stock = location.state;
  const annualReports = stock.FinancialStatements.BalanceSheet.annualReports;
  const fiscalYears = [...new Set(annualReports.map((report) => report.fiscalDateEnding.split('-')[0]))];
  fiscalYears.reverse();
  const quarterlyReports = stock.FinancialStatements.BalanceSheet.quarterlyReports
  const fiscalQuarters = [...new Set(quarterlyReports.map((report) => report.fiscalDateEnding.split('-')[0] + '-' + report.fiscalDateEnding.split('-')[1]))].slice(0, 8).reverse();
  let fiscalPeriods
  let fiscalReports

  if (isYearlyorQuarterly.isYearly) {
    fiscalPeriods = fiscalYears
    fiscalReports = annualReports
  } else {
    fiscalPeriods = fiscalQuarters
    fiscalReports = quarterlyReports
  }


  const [toggleTotalAssets, setToggleTotalAssets] = useState(true)
  const [toggleTotalAssetsYoY, setToggleTotalAssetsYoY] = useState(false)

  const [toggleTotalLiabilities, setToggleTotalLiabilities] = useState(true)
  const [toggleTotalLiabilitiesYoY, setToggleTotalLiabilitiesYoY] = useState(false)

  const [toggleTotalEquity, setToggleTotalEquity] = useState(false)
  const [toggleTotalEquityYoY, setToggleTotalEquityYoY] = useState(false)

  useEffect(() => {
    dispatch(getFinancialStatementsToggled({ toggleTotalAssets: toggleTotalAssets }))
    dispatch(getFinancialStatementsToggled({ toggleTotalAssetsYoY: toggleTotalAssetsYoY }))
  }, [toggleTotalAssets, toggleTotalAssetsYoY])

  useEffect(() => {
    dispatch(getFinancialStatementsToggled({ toggleTotalLiabilities: toggleTotalLiabilities }))
    dispatch(getFinancialStatementsToggled({ toggleTotalLiabilitiesYoY: toggleTotalLiabilitiesYoY }))
  }, [toggleTotalLiabilities, toggleTotalLiabilitiesYoY])

  useEffect(() => {
    dispatch(getFinancialStatementsToggled({ toggleTotalEquity: toggleTotalEquity }))
    dispatch(getFinancialStatementsToggled({ toggleTotalEquityYoY: toggleTotalEquityYoY }))
  }, [toggleTotalEquity, toggleTotalEquityYoY])


  return (
    <>

      <BalanceSheet_yearly fiscalPeriods={fiscalPeriods} fiscalReports={fiscalReports}
        toggledMetrics={{
          toggleTotalAssets: toggleTotalAssets,
          toggleTotalAssetsYoY: toggleTotalAssetsYoY,

          toggleTotalLiabilities: toggleTotalLiabilities,
          toggleTotalLiabilitiesYoY: toggleTotalLiabilitiesYoY,

          toggleTotalEquity: toggleTotalEquity,
          toggleTotalEquityYoY: toggleTotalEquityYoY,
        }}
        setToggledMetrics={{
          setToggleTotalAssets: setToggleTotalAssets,
          setToggleTotalAssetsYoY: setToggleTotalAssetsYoY,

          setToggleTotalLiabilities: setToggleTotalLiabilities,
          setToggleTotalLiabilitiesYoY: setToggleTotalLiabilitiesYoY,

          setToggleTotalEquity: setToggleTotalEquity,
          setToggleTotalEquityYoY: setToggleTotalEquityYoY,
        }} />


    </>
  )
}
