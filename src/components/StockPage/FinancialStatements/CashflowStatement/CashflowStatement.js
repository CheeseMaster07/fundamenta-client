import React, { useEffect, useState } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'


import { getFinancialStatementsToggled } from '../../../../actions/financialStatementsToggled'

import '../../../../css/table.css'

import CashflowStatement_component from './Periods/CashflowStatement_component'


export default function CashflowStatement() {
  const location = useLocation()
  const dispatch = useDispatch()
  const isYearlyorQuarterly = useSelector((state) => state.getIsYearlyorQuarterly)

  const stock = location.state;
  const annualReports = stock.FinancialStatements.CashflowStatement.annualReports;
  const fiscalYears = [...new Set(annualReports.map((report) => report.fiscalDateEnding.split('-')[0]))];
  fiscalYears.reverse();
  const quarterlyReports = stock.FinancialStatements.CashflowStatement.quarterlyReports
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

  const [toggleOperatingCashflow, setToggleOperatingCashflow] = useState(true)
  const [toggleOperatingCashflowYoY, setToggleOperatingCashflowYoY] = useState(true)
  const [toggleOperatingCashflowMargin, setToggleOperatingCashflowMargin] = useState(true)

  const [toggleInvestingCashflow, setToggleInvestingCashflow] = useState(false)
  const [toggleInvestingCashflowYoY, setToggleInvestingCashflowYoY] = useState(false)
  const [toggleInvestingCashflowMargin, setToggleInvestingCashflowMargin] = useState(false)

  const [toggleFinancingCashflow, setToggleFinancingCashflow] = useState(false)
  const [toggleFinancingCashflowYoY, setToggleFinancingCashflowYoY] = useState(false)
  const [toggleFinancingCashflowMargin, setToggleFinancingCashflowMargin] = useState(false)

  const [toggleFreeCashflow, setToggleFreeCashflow] = useState(true)
  const [toggleFreeCashflowYoY, setToggleFreeCashflowYoY] = useState(true)
  const [toggleFreeCashflowMargin, setToggleFreeCashflowMargin] = useState(true)


  useEffect(() => {
    dispatch(getFinancialStatementsToggled({ toggleOperatingCashflow: toggleOperatingCashflow }))
    dispatch(getFinancialStatementsToggled({ toggleOperatingCashflowYoY: toggleOperatingCashflowYoY }))
    dispatch(getFinancialStatementsToggled({ toggleOperatingCashflowMargin: toggleOperatingCashflowMargin }))
  }, [toggleOperatingCashflow, toggleOperatingCashflowYoY, toggleOperatingCashflowMargin])

  useEffect(() => {
    dispatch(getFinancialStatementsToggled({ toggleInvestingCashflow: toggleInvestingCashflow }))
    dispatch(getFinancialStatementsToggled({ toggleInvestingCashflowYoY: toggleInvestingCashflowYoY }))
    dispatch(getFinancialStatementsToggled({ toggleInvestingCashflowMargin: toggleInvestingCashflowMargin }))
  }, [toggleInvestingCashflow, toggleInvestingCashflowYoY, toggleInvestingCashflowMargin])

  useEffect(() => {
    dispatch(getFinancialStatementsToggled({ toggleFinancingCashflow: toggleFinancingCashflow }))
    dispatch(getFinancialStatementsToggled({ toggleFinancingCashflowYoY: toggleFinancingCashflowYoY }))
    dispatch(getFinancialStatementsToggled({ toggleFinancingCashflowMargin: toggleFinancingCashflowMargin }))
  }, [toggleFinancingCashflow, toggleFinancingCashflowYoY, toggleFinancingCashflowMargin])

  useEffect(() => {
    dispatch(getFinancialStatementsToggled({ toggleFreeCashflow: toggleFreeCashflow }))
    dispatch(getFinancialStatementsToggled({ toggleFreeCashflowYoY: toggleFreeCashflowYoY }))
    dispatch(getFinancialStatementsToggled({ toggleFreeCashflowMargin: toggleFreeCashflowMargin }))
  }, [toggleFreeCashflow, toggleFreeCashflowYoY, toggleFreeCashflowMargin])



  function formatNumber(num) {

    if (Math.abs(num) >= 1000000000000) {
      return (num / 1000000000000).toFixed(1) + 'T'
    } else if (Math.abs(num) >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B';
    } else if (Math.abs(num) >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (Math.abs(num) >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    } else {
      return num;
    }
  }

  return (
    <>
      <CashflowStatement_component fiscalPeriods={fiscalPeriods} fiscalReports={fiscalReports}
        toggledMetrics={{
          toggleOperatingCashflow: toggleOperatingCashflow,
          toggleOperatingCashflowYoY: toggleOperatingCashflowYoY,
          toggleOperatingCashflowMargin: toggleOperatingCashflowMargin,

          toggleFinancingCashflow: toggleFinancingCashflow,
          toggleFinancingCashflowYoY: toggleFinancingCashflowYoY,
          toggleFinancingCashflowMargin: toggleFinancingCashflowMargin,

          toggleInvestingCashflow: toggleInvestingCashflow,
          toggleInvestingCashflowYoY: toggleInvestingCashflowYoY,
          toggleInvestingCashflowMargin: toggleInvestingCashflowMargin,

          toggleFreeCashflow: toggleFreeCashflow,
          toggleFreeCashflowYoY: toggleFreeCashflowYoY,
          toggleFreeCashflowMargin: toggleFreeCashflowMargin,
        }}
        setToggledMetrics={{
          setToggleOperatingCashflow: setToggleOperatingCashflow,
          setToggleOperatingCashflowYoY: setToggleOperatingCashflowYoY,
          setToggleOperatingCashflowMargin: setToggleOperatingCashflowMargin,

          setToggleInvestingCashflow: setToggleInvestingCashflow,
          setToggleInvestingCashflowYoY: setToggleInvestingCashflowYoY,
          setToggleInvestingCashflowMargin: setToggleInvestingCashflowMargin,

          setToggleFinancingCashflow: setToggleFinancingCashflow,
          setToggleFinancingCashflowYoY: setToggleFinancingCashflowYoY,
          setToggleFinancingCashflowMargin: setToggleFinancingCashflowMargin,

          setToggleFreeCashflow: setToggleFreeCashflow,
          setToggleFreeCashflowYoY: setToggleFreeCashflowYoY,
          setToggleFreeCashflowMargin: setToggleFreeCashflowMargin,
        }} />

    </>
  )
}
