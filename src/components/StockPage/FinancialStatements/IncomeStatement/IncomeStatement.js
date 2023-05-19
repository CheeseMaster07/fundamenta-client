import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { UseTable } from 'react-table'
import { useSelector, useDispatch } from 'react-redux'

import BarChart from '../../../Charts/BarChart'
import '../../../../css/table.css'
import '../../../../css/chart.css'
import Header from '../FinancialStatementsHeader'
import { getFinancialStatementsToggled } from '../../../../actions/financialStatementsToggled'

import IncomeStatement_yearly from './Periods/IncomeStatement_yearly'
import IncomeStatement_quarterly from './Periods/IncomeStatement_quarterly'


export default function IncomeStatement() {
  const location = useLocation()
  const dispatch = useDispatch()
  const isYearlyorQuarterly = useSelector((state) => state.getIsYearlyorQuarterly)

  const [toggleTotalRevenue, setToggleTotalRevenue] = useState(true)
  const [toggleCostOfGoodsAndServicesSold, setToggleCostOfGoodsAndServicesSold] = useState(false)
  const [toggleGrossProfit, setToggleGrossProfit] = useState(false)
  const [toggleOperatingExpenses, setToggleOperatingExpenses] = useState(false)
  const [toggleOperatingIncome, setToggleOperatingIncome] = useState(false)
  const [toggleNonOperatingIncome, setToggleNonOperatingIncome] = useState(false)
  const [togglePretaxIncome, setTogglePretaxIncome] = useState(false)
  const [toggleTaxes, setToggleTaxes] = useState(false)
  const [toggleNetIncome, setToggleNetIncome] = useState(true)



  useEffect(() => {
    dispatch(getFinancialStatementsToggled({ toggleTotalRevenue: toggleTotalRevenue }))
  }, [toggleTotalRevenue])

  useEffect(() => {
    dispatch(getFinancialStatementsToggled({ toggleCostOfGoodsAndServicesSold: toggleCostOfGoodsAndServicesSold }))
  }, [toggleCostOfGoodsAndServicesSold])

  useEffect(() => {
    dispatch(getFinancialStatementsToggled({ toggleGrossProfit: toggleGrossProfit }))
  }, [toggleGrossProfit])

  useEffect(() => {
    dispatch(getFinancialStatementsToggled({ toggleOperatingExpenses: toggleOperatingExpenses }))
  }, [toggleOperatingExpenses])

  useEffect(() => {
    dispatch(getFinancialStatementsToggled({ toggleOperatingIncome: toggleOperatingIncome }))
  }, [toggleOperatingIncome])

  useEffect(() => {
    dispatch(getFinancialStatementsToggled({ toggleNonOperatingIncome: toggleNonOperatingIncome }))
  }, [toggleNonOperatingIncome])

  useEffect(() => {
    dispatch(getFinancialStatementsToggled({ togglePretaxIncome: togglePretaxIncome }))
  }, [togglePretaxIncome])

  useEffect(() => {
    dispatch(getFinancialStatementsToggled({ toggleTaxes: toggleTaxes }))
  }, [toggleTaxes])

  useEffect(() => {
    dispatch(getFinancialStatementsToggled({ toggleNetIncome: toggleNetIncome }))
  }, [toggleNetIncome])

  //console.log(stock.FinancialStatements.IncomeStatement.TotalRevenue.find({ date: '2020' }))
  return (
    <>
      {isYearlyorQuarterly.isYearly ?
        <IncomeStatement_yearly toggledMetrics={{
          toggleTotalRevenue: toggleTotalRevenue,
          toggleCostOfGoodsAndServicesSold: toggleCostOfGoodsAndServicesSold,
          toggleGrossProfit: toggleGrossProfit,
          toggleOperatingExpenses: toggleOperatingExpenses,
          toggleOperatingIncome: toggleOperatingIncome,
          toggleNonOperatingIncome: toggleNonOperatingIncome,
          togglePretaxIncome: togglePretaxIncome,
          toggleTaxes: toggleTaxes,
          toggleNetIncome: toggleNetIncome,
        }}
          setToggledMetrics={{
            setToggleTotalRevenue: setToggleTotalRevenue,
            setToggleCostOfGoodsAndServicesSold: setToggleCostOfGoodsAndServicesSold,
            setToggleGrossProfit: setToggleGrossProfit,
            setToggleOperatingExpenses: setToggleOperatingExpenses,
            setToggleOperatingIncome: setToggleOperatingIncome,
            setToggleNonOperatingIncome: setToggleNonOperatingIncome,
            setTogglePretaxIncome: setTogglePretaxIncome,
            setToggleTaxes: setToggleTaxes,
            setToggleNetIncome: setToggleNetIncome,
          }} />
        :
        <IncomeStatement_quarterly toggledMetrics={{
          toggleTotalRevenue: toggleTotalRevenue,
          toggleCostOfGoodsAndServicesSold: toggleCostOfGoodsAndServicesSold,
          toggleGrossProfit: toggleGrossProfit,
          toggleOperatingExpenses: toggleOperatingExpenses,
          toggleOperatingIncome: toggleOperatingIncome,
          toggleNonOperatingIncome: toggleNonOperatingIncome,
          togglePretaxIncome: togglePretaxIncome,
          toggleTaxes: toggleTaxes,
          toggleNetIncome: toggleNetIncome,
        }}
          setToggledMetrics={{
            setToggleTotalRevenue: setToggleTotalRevenue,
            setToggleCostOfGoodsAndServicesSold: setToggleCostOfGoodsAndServicesSold,
            setToggleGrossProfit: setToggleGrossProfit,
            setToggleOperatingExpenses: setToggleOperatingExpenses,
            setToggleOperatingIncome: setToggleOperatingIncome,
            setToggleNonOperatingIncome: setToggleNonOperatingIncome,
            setTogglePretaxIncome: setTogglePretaxIncome,
            setToggleTaxes: setToggleTaxes,
            setToggleNetIncome: setToggleNetIncome,
          }} />
      }
    </>
  )

}
