import React, { useRef, useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { getStockData } from '../../actions/stocks'
import IncomeStatement from './FinancialStatements/IncomeStatement/IncomeStatement';
import BalanceSheet from './FinancialStatements/BalanceSheet/BalanceSheet';
import CashflowStatement from './FinancialStatements/CashflowStatement/CashflowStatement';

export default function StockPage({ statemnt }) {
  const stock = useSelector((state) => state.stockPage)
  const { id } = useParams()
  const dispatch = useDispatch()
  //const location = useLocation()
  const linkUrl = `/stocks/${id}/financial-statements`


  useEffect(() => {
    dispatch(getStockData(id, 'FETCH_STOCK'))

  }, [dispatch])

  if (stock.length == 0) { return }
  return (
    <>
      { }

    </>
  )
}
