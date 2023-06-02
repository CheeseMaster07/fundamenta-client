import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { UseTable } from 'react-table'
import { useSelector, useDispatch } from 'react-redux'

import BarChart from '../../../Charts/BarChart'
import '../../../../css/table.css'
import '../../../../css/chart.css'
import Header from '../FinancialStatementsHeader'
import { getFinancialStatementsToggled } from '../../../../actions/financialStatementsToggled'

import IncomeStatement_yearly from './Periods/IncomeStatement_component'




export default function IncomeStatement() {
  const location = useLocation()
  const dispatch = useDispatch()
  const isYearlyorQuarterly = useSelector((state) => state.getIsYearlyorQuarterly)

  const stock = location.state;
  const annualReports = stock.FinancialStatements.IncomeStatement.annualReports;
  const fiscalYears = [...new Set(annualReports.map((report) => report.fiscalDateEnding.split('-')[0]))];
  fiscalYears.reverse();
  const quarterlyReports = stock.FinancialStatements.IncomeStatement.quarterlyReports
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

  console.log(fiscalPeriods)

  const [toggleTotalRevenue, setToggleTotalRevenue] = useState(true)
  const [toggleTotalRevenueYoY, setToggleTotalRevenueYoY] = useState(false)

  const [toggleCostOfGoodsAndServicesSold, setToggleCostOfGoodsAndServicesSold] = useState(false)
  const [toggleCostOfGoodsAndServicesSoldYoY, setToggleCostOfGoodsAndServicesSoldYoY] = useState(false)
  const [toggleCostOfGoodsAndServicesSoldMargin, setToggleCostOfGoodsAndServicesSoldMargin] = useState(false)
  const [toggleCostOfGoodsAndServicesSoldSubrows, setToggleCostOfGoodsAndServicesSoldSubrows] = useState(false)

  const [toggleGrossProfit, setToggleGrossProfit] = useState(true)
  const [toggleGrossProfitYoY, setToggleGrossProfitYoY] = useState(false)
  const [toggleGrossProfitMargin, setToggleGrossProfitMargin] = useState(false)

  const [toggleOperatingExpenses, setToggleOperatingExpenses] = useState(false)
  const [toggleOperatingExpensesYoY, setToggleOperatingExpensesYoY] = useState(false)
  const [toggleOperatingExpensesMargin, setToggleOperatingExpensesMargin] = useState(false)

  const [toggleOperatingIncome, setToggleOperatingIncome] = useState(true)
  const [toggleOperatingIncomeYoY, setToggleOperatingIncomeYoY] = useState(false)
  const [toggleOperatingIncomeMargin, setToggleOperatingIncomeMargin] = useState(false)

  const [toggleNonOperatingIncome, setToggleNonOperatingIncome] = useState(false)
  const [toggleNonOperatingIncomeYoY, setToggleNonOperatingIncomeYoY] = useState(false)
  const [toggleNonOperatingIncomeMargin, setToggleNonOperatingIncomeMargin] = useState(false)

  const [togglePretaxIncome, setTogglePretaxIncome] = useState(true)
  const [togglePretaxIncomeYoY, setTogglePretaxIncomeYoY] = useState(false)
  const [togglePretaxIncomeMargin, setTogglePretaxIncomeMargin] = useState(false)

  const [toggleTaxes, setToggleTaxes] = useState(false)
  const [toggleTaxesYoY, setToggleTaxesYoY] = useState(false)
  const [toggleTaxesMargin, setToggleTaxesMargin] = useState(false)

  const [toggleNetIncome, setToggleNetIncome] = useState(true)
  const [toggleNetIncomeYoY, setToggleNetIncomeYoY] = useState(false)
  const [toggleNetIncomeMargin, setToggleNetIncomeMargin] = useState(false)


  useEffect(() => {
    dispatch(getFinancialStatementsToggled({ toggleTotalRevenue: toggleTotalRevenue }))
    dispatch(getFinancialStatementsToggled({ toggleTotalRevenueYoY: toggleTotalRevenueYoY }))
  }, [toggleTotalRevenue, toggleTotalRevenueYoY])


  useEffect(() => {
    dispatch(getFinancialStatementsToggled({ toggleCostOfGoodsAndServicesSold: toggleCostOfGoodsAndServicesSold }))
    dispatch(getFinancialStatementsToggled({ toggleCostOfGoodsAndServicesSoldYoY: toggleCostOfGoodsAndServicesSoldYoY }))
    dispatch(getFinancialStatementsToggled({ toggleCostOfGoodsAndServicesSoldMargin: toggleCostOfGoodsAndServicesSoldMargin }))
    dispatch(getFinancialStatementsToggled({ toggleCostOfGoodsAndServicesSoldSubrows: toggleCostOfGoodsAndServicesSoldSubrows }))
  }, [toggleCostOfGoodsAndServicesSold, toggleCostOfGoodsAndServicesSoldYoY, toggleCostOfGoodsAndServicesSoldMargin, toggleCostOfGoodsAndServicesSoldSubrows])

  useEffect(() => {
    dispatch(getFinancialStatementsToggled({ toggleGrossProfit: toggleGrossProfit }))
    dispatch(getFinancialStatementsToggled({ toggleGrossProfitYoY: toggleGrossProfitYoY }))
    dispatch(getFinancialStatementsToggled({ toggleGrossProfitMargin: toggleGrossProfitMargin }))
  }, [toggleGrossProfit, toggleGrossProfitYoY, toggleGrossProfitMargin])

  useEffect(() => {
    dispatch(getFinancialStatementsToggled({ toggleOperatingExpenses: toggleOperatingExpenses }))
    dispatch(getFinancialStatementsToggled({ toggleOperatingExpensesYoY: toggleOperatingExpensesYoY }))
    dispatch(getFinancialStatementsToggled({ toggleOperatingExpensesMargin: toggleOperatingExpensesMargin }))
  }, [toggleOperatingExpenses, toggleOperatingExpensesYoY, toggleOperatingExpensesMargin])

  useEffect(() => {
    dispatch(getFinancialStatementsToggled({ toggleOperatingIncome: toggleOperatingIncome }))
    dispatch(getFinancialStatementsToggled({ toggleOperatingIncomeYoY: toggleOperatingIncomeYoY }))
    dispatch(getFinancialStatementsToggled({ toggleOperatingIncomeMargin: toggleOperatingIncomeMargin }))
  }, [toggleOperatingIncome, toggleOperatingIncomeYoY, toggleOperatingIncomeMargin])

  useEffect(() => {
    dispatch(getFinancialStatementsToggled({ toggleNonOperatingIncome: toggleNonOperatingIncome }))
    dispatch(getFinancialStatementsToggled({ toggleNonOperatingIncomeYoY: toggleNonOperatingIncomeYoY }))
    dispatch(getFinancialStatementsToggled({ toggleNonOperatingIncomeMargin: toggleNonOperatingIncomeMargin }))
  }, [toggleNonOperatingIncome, toggleNonOperatingIncomeYoY, toggleNonOperatingIncomeMargin])

  useEffect(() => {
    dispatch(getFinancialStatementsToggled({ togglePretaxIncome: togglePretaxIncome }))
    dispatch(getFinancialStatementsToggled({ togglePretaxIncomeYoY: togglePretaxIncomeYoY }))
    dispatch(getFinancialStatementsToggled({ togglePretaxIncomeMargin: togglePretaxIncomeMargin }))
  }, [togglePretaxIncome, togglePretaxIncomeYoY, togglePretaxIncomeMargin])

  useEffect(() => {
    dispatch(getFinancialStatementsToggled({ toggleTaxes: toggleTaxes }))
    dispatch(getFinancialStatementsToggled({ toggleTaxesYoY: toggleTaxesYoY }))
    dispatch(getFinancialStatementsToggled({ toggleTaxesMargin: toggleTaxesMargin }))
  }, [toggleTaxes, toggleTaxesYoY, toggleTaxesMargin])

  useEffect(() => {
    dispatch(getFinancialStatementsToggled({ toggleNetIncome: toggleNetIncome }))
    dispatch(getFinancialStatementsToggled({ toggleNetIncomeYoY: toggleNetIncomeYoY }))
    dispatch(getFinancialStatementsToggled({ toggleNetIncomeMargin: toggleNetIncomeMargin }))
  }, [toggleNetIncome, toggleNetIncomeYoY, toggleNetIncomeMargin])

  //console.log(stock.FinancialStatements.IncomeStatement.TotalRevenue.find({ date: '2020' }))
  return (
    <>
      <IncomeStatement_yearly fiscalPeriods={fiscalPeriods} fiscalReports={fiscalReports}
        toggledMetrics={{
          toggleTotalRevenue: toggleTotalRevenue,
          toggleTotalRevenueYoY: toggleTotalRevenueYoY,

          toggleCostOfGoodsAndServicesSold: toggleCostOfGoodsAndServicesSold,
          toggleCostOfGoodsAndServicesSoldYoY: toggleCostOfGoodsAndServicesSoldYoY,
          toggleCostOfGoodsAndServicesSoldMargin: toggleCostOfGoodsAndServicesSoldMargin,
          toggleCostOfGoodsAndServicesSoldSubrows: toggleCostOfGoodsAndServicesSoldSubrows,

          toggleGrossProfit: toggleGrossProfit,
          toggleGrossProfitYoY: toggleGrossProfitYoY,
          toggleGrossProfitMargin: toggleGrossProfitMargin,

          toggleOperatingExpenses: toggleOperatingExpenses,
          toggleOperatingExpensesYoY: toggleOperatingExpensesYoY,
          toggleOperatingExpensesMargin: toggleOperatingExpensesMargin,

          toggleOperatingIncome: toggleOperatingIncome,
          toggleOperatingIncomeYoY: toggleOperatingIncomeYoY,
          toggleOperatingIncomeMargin: toggleOperatingIncomeMargin,

          toggleNonOperatingIncome: toggleNonOperatingIncome,
          toggleNonOperatingIncomeYoY: toggleNonOperatingIncomeYoY,
          toggleNonOperatingIncomeMargin: toggleNonOperatingIncomeMargin,

          togglePretaxIncome: togglePretaxIncome,
          togglePretaxIncomeYoY: togglePretaxIncomeYoY,
          togglePretaxIncomeMargin: togglePretaxIncomeMargin,

          toggleTaxes: toggleTaxes,
          toggleTaxesYoY: toggleTaxesYoY,
          toggleTaxesMargin: toggleTaxesMargin,

          toggleNetIncome: toggleNetIncome,
          toggleNetIncomeYoY: toggleNetIncomeYoY,
          toggleNetIncomeMargin: toggleNetIncomeMargin,
        }}
        setToggledMetrics={{
          setToggleTotalRevenue: setToggleTotalRevenue,
          setToggleTotalRevenueYoY: setToggleTotalRevenueYoY,

          setToggleCostOfGoodsAndServicesSold: setToggleCostOfGoodsAndServicesSold,
          setToggleCostOfGoodsAndServicesSoldYoY: setToggleCostOfGoodsAndServicesSoldYoY,
          setToggleCostOfGoodsAndServicesSoldMargin: setToggleCostOfGoodsAndServicesSoldMargin,
          setToggleCostOfGoodsAndServicesSoldSubrows: setToggleCostOfGoodsAndServicesSoldSubrows,

          setToggleGrossProfit: setToggleGrossProfit,
          setToggleGrossProfitYoY: setToggleGrossProfitYoY,
          setToggleGrossProfitMargin: setToggleGrossProfitMargin,

          setToggleOperatingExpenses: setToggleOperatingExpenses,
          setToggleOperatingExpensesYoY: setToggleOperatingExpensesYoY,
          setToggleOperatingExpensesMargin: setToggleOperatingExpensesMargin,

          setToggleOperatingIncome: setToggleOperatingIncome,
          setToggleOperatingIncomeYoY: setToggleOperatingIncomeYoY,
          setToggleOperatingIncomeMargin: setToggleOperatingIncomeMargin,

          setToggleNonOperatingIncome: setToggleNonOperatingIncome,
          setToggleNonOperatingIncomeYoY: setToggleNonOperatingIncomeYoY,
          setToggleNonOperatingIncomeMargin: setToggleNonOperatingIncomeMargin,

          setTogglePretaxIncome: setTogglePretaxIncome,
          setTogglePretaxIncomeYoY: setTogglePretaxIncomeYoY,
          setTogglePretaxIncomeMargin: setTogglePretaxIncomeMargin,

          setToggleTaxes: setToggleTaxes,
          setToggleTaxesYoY: setToggleTaxesYoY,
          setToggleTaxesMargin: setToggleTaxesMargin,

          setToggleNetIncome: setToggleNetIncome,
          setToggleNetIncomeYoY: setToggleNetIncomeYoY,
          setToggleNetIncomeMargin: setToggleNetIncomeMargin,
        }} />

    </>
  )

}
