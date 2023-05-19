import React from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'


import IncomeStatement from './IncomeStatement/IncomeStatement';
import BalanceSheet from './BalanceSheet/BalanceSheet';
import CashflowStatement from './CashflowStatement/CashflowStatement';


export default function FinancialStatements(statement) {
  const { id } = useParams()
  const location = useLocation()
  const whichFinancialStatement = useSelector((state) => state.whichFinancialStatement)

  console.log(whichFinancialStatement)

  return (
    <>
      {whichFinancialStatement === 'incomeStatement' ?
        <IncomeStatement />
        :
        <></>
      }
      {whichFinancialStatement === 'balanceSheet' ?
        <BalanceSheet />
        :
        <></>
      }
      {whichFinancialStatement === 'cashflowStatement' ?
        <CashflowStatement />
        :
        <></>
      }
    </>
  )
}
