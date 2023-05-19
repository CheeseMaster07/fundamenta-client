import React, { useEffect, useState } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'


import { getFinancialStatementsToggled } from '../../../../actions/financialStatementsToggled'

import '../../../../css/table.css'

import CashflowStatement_yearly from './Periods/CashflowStatement_yearly'
import CashflowStatement_quarterly from './Periods/CashflowStatement_quarterly'


export default function CashflowStatement() {
  const dispatch = useDispatch()
  const location = useLocation()
  const stock = location.state
  const isYearlyorQuarterly = useSelector((state) => state.getIsYearlyorQuarterly)
  const fiscalYears = [...new Set(stock.FinancialStatements.CashflowStatement.annualReports.map((report) => report.fiscalDateEnding.split('-')[0]))];
  fiscalYears.reverse()

  const [toggleOperatingCashflow, setToggleOperatingCashflow] = useState(true)
  const [toggleInvestingCashflow, setToggleInvestingCashflow] = useState(false)
  const [toggleFinancingCashflow, setToggleFinancingCashflow] = useState(false)
  const [toggleFreeCashflow, setToggleFreeCashflow] = useState(true)




  useEffect(() => {
    dispatch(getFinancialStatementsToggled({ toggleOperatingCashflow: toggleOperatingCashflow }))
  }, [toggleOperatingCashflow])

  useEffect(() => {
    dispatch(getFinancialStatementsToggled({ toggleInvestingCashflow: toggleInvestingCashflow }))
  }, [toggleInvestingCashflow])

  useEffect(() => {
    dispatch(getFinancialStatementsToggled({ toggleFinancingCashflow: toggleFinancingCashflow }))
  }, [toggleFinancingCashflow])

  useEffect(() => {
    dispatch(getFinancialStatementsToggled({ toggleFreeCashflow: toggleFreeCashflow }))
  }, [toggleFreeCashflow])



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

      {isYearlyorQuarterly.isYearly ?
        <CashflowStatement_yearly toggledMetrics={{
          toggleOperatingCashflow: toggleOperatingCashflow,
          toggleFinancingCashflow: toggleFinancingCashflow,
          toggleInvestingCashflow: toggleInvestingCashflow,
          toggleFreeCashflow: toggleFreeCashflow,
        }}
          setToggledMetrics={{
            setToggleOperatingCashflow: setToggleOperatingCashflow,
            setToggleInvestingCashflow: setToggleInvestingCashflow,
            setToggleFinancingCashflow: setToggleFinancingCashflow,
            setToggleFreeCashflow: setToggleFreeCashflow,
          }} />
        :
        <CashflowStatement_quarterly toggledMetrics={{
          toggleOperatingCashflow: toggleOperatingCashflow,
          toggleFinancingCashflow: toggleFinancingCashflow,
          toggleInvestingCashflow: toggleInvestingCashflow,
          toggleFreeCashflow: toggleFreeCashflow,
        }}
          setToggledMetrics={{
            setToggleOperatingCashflow: setToggleOperatingCashflow,
            setToggleInvestingCashflow: setToggleInvestingCashflow,
            setToggleFinancingCashflow: setToggleFinancingCashflow,
            setToggleFreeCashflow: setToggleFreeCashflow,
          }} />
      }

    </>
  )
}
