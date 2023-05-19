import React, { useState, useEffect } from 'react'
import { useParams, Link, useLocation, Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'


import '../../../css/financialStatementsHeader.css'

import BarChart from '../../Charts/BarChart'
import LineChart from '../../Charts/LineChart'
import { getIsYearlyOrQuarterly } from '../../../actions/isYearlyorQuarterly'
import { getWhichFinancialStatement } from '../../../actions/whichFinancialStatement'


export default function FinancialStatementsHeader() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const financialStatementsToggled = useSelector((state) => state.getFinancialStatementsToggled)
  const financialStatement = useSelector((state) => state.whichFinancialStatement)
  const isYearlyorQuarterly = useSelector((state) => state.getIsYearlyorQuarterly)


  const location = useLocation()
  const linkUrl_IncomeStatement = `/stocks/${id}/financial-statements/income-statement`
  const linkUrl_BalanceSheet = `/stocks/${id}/financial-statements/balance-sheet`
  const linkUrl_CashflowStatement = `/stocks/${id}/financial-statements/cashflow-statement`
  const stock = location.state
  let fiscalReports = stock.FinancialStatements.IncomeStatement.annualReports
  let fiscalPeriod = 'Year'
  let datasets = []
  const [isYearly, setIsYearly] = useState(true)
  const [isQuarterly, setIsQuarterly] = useState(false)
  const [whichFinancialStatement, setWhichFinancialStatement] = useState('incomeStatement')

  useEffect(() => {
    dispatch(getIsYearlyOrQuarterly({ isYearly: isYearly }))
  }, [isYearly])

  useEffect(() => {
    dispatch(getIsYearlyOrQuarterly({ isQuarterly: isQuarterly }))
  }, [isQuarterly])

  useEffect(() => {
    dispatch(getWhichFinancialStatement(whichFinancialStatement))
  }, [whichFinancialStatement])

  function formatNumber(num) {
    if (typeof num === 'number') {
      num = num.toString()
    }
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

  switch (financialStatement) {

    // Income Statement
    case 'incomeStatement':
      if (isYearlyorQuarterly.isYearly) {
        fiscalReports = stock.FinancialStatements.IncomeStatement.annualReports
      } else {
        fiscalReports = stock.FinancialStatements.IncomeStatement.quarterlyReports
      }


      if (financialStatementsToggled.toggleTotalRevenue) {
        datasets.push(
          {
            label: "Total Revenue",
            data: fiscalReports.map(data => data.totalRevenue).reverse(),
            backgroundColor: 'rgb(0, 81, 255)',
            barPercentage: .8,
            borderRadius: 3,
          }
        )
      }
      if (financialStatementsToggled.toggleCostOfGoodsAndServicesSold) {
        datasets.push(
          {
            label: "Gross Profit",
            data: fiscalReports.map(data => data.costofGoodsAndServicesSold).reverse(),
            backgroundColor: 'rgb(231, 12, 12)',
            barPercentage: .8,
            borderRadius: 3,
          }
        )
      }
      if (financialStatementsToggled.toggleGrossProfit) {
        datasets.push(
          {
            label: "Gross Profit",
            data: fiscalReports.map(data => data.grossProfit).reverse(),
            backgroundColor: 'rgb(30, 231, 12)',
            barPercentage: .8,
            borderRadius: 3,
          }
        )
      }
      if (financialStatementsToggled.toggleOperatingExpenses) {
        datasets.push(
          {
            label: "Gross Profit",
            data: fiscalReports.map(data => data.operatingExpenses).reverse(),
            backgroundColor: 'rgb(231, 12, 12)',
            barPercentage: .8,
            borderRadius: 3,
          }
        )
      }
      if (financialStatementsToggled.toggleOperatingIncome) {
        datasets.push(
          {
            label: "Gross Profit",
            data: fiscalReports.map(data => data.operatingIncome).reverse(),
            backgroundColor: 'rgb(231, 12, 12)',
            barPercentage: .8,
            borderRadius: 3,
          }
        )
      }
      if (financialStatementsToggled.toggleNonOperatingIncome) {
        datasets.push(
          {
            label: "Gross Profit",
            data: fiscalReports.map(data => data.otherNonOperatingIncome).reverse(),
            backgroundColor: 'rgb(231, 12, 12)',
            barPercentage: .8,
            borderRadius: 3,
          }
        )
      }
      if (financialStatementsToggled.togglePretaxIncome) {
        datasets.push(
          {
            label: "Gross Profit",
            data: fiscalReports.map(data => data.incomeBeforeTax).reverse(),
            backgroundColor: 'rgb(231, 12, 12)',
            barPercentage: .8,
            borderRadius: 3,
          }
        )
      }
      if (financialStatementsToggled.toggleTaxes) {
        datasets.push(
          {
            label: "Gross Profit",
            data: fiscalReports.map(data => data.incomeTaxExpense).reverse(),
            backgroundColor: 'rgb(231, 12, 12)',
            barPercentage: .8,
            borderRadius: 3,
          }
        )
      }
      if (financialStatementsToggled.toggleNetIncome) {
        datasets.push(
          {
            label: "Net Income",
            data: fiscalReports.map(data => data.netIncome).reverse(),
            backgroundColor: 'rgb(255, 255, 0)',
            barPercentage: .8,
            borderRadius: 3,
          }
        )
      }

      break


    // Balance Sheet
    case 'balanceSheet':
      if (isYearlyorQuarterly.isYearly) {
        fiscalReports = stock.FinancialStatements.BalanceSheet.annualReports
      } else {
        fiscalReports = stock.FinancialStatements.BalanceSheet.quarterlyReports
      }
      if (financialStatementsToggled.toggleTotalAssets) {
        datasets.push(
          {
            label: "Assets",
            data: fiscalReports.map(data => data.totalAssets).reverse(),
            backgroundColor: 'rgb(0, 81, 255)',
            barPercentage: .8,
            borderRadius: 3,
          }
        )
      }
      if (financialStatementsToggled.toggleTotalLiabilities) {
        datasets.push(
          {
            label: "Liabilities",
            data: fiscalReports.map(data => data.totalLiabilities).reverse(),
            backgroundColor: 'rgb(3, 245, 164)',
            barPercentage: .8,
            borderRadius: 3,
          }
        )
      }
      if (financialStatementsToggled.toggleTotalEquity) {
        datasets.push(
          {
            label: "Equity",
            data: fiscalReports.map(data => data.totalShareholderEquity).reverse(),
            backgroundColor: 'rgb(255, 238, 0)',
            barPercentage: .8,
            borderRadius: 3,
          }
        )
      }

      // datasets = [
      //   {
      //     label: "Assets",
      //     data: fiscalReports.map(data => data.totalAssets).reverse(),
      //     backgroundColor: 'blue'
      //   },
      //   {
      //     label: "Liabilities",
      //     data: fiscalReports.map(data => data.totalLiabilities).reverse(),
      //     backgroundColor: 'rgb(63, 219, 24)'
      //   }
      // ]
      break;

    // Cashflow Statement
    case 'cashflowStatement':
      if (isYearlyorQuarterly.isYearly) {
        fiscalReports = stock.FinancialStatements.CashflowStatement.annualReports
      } else {
        fiscalReports = stock.FinancialStatements.CashflowStatement.quarterlyReports
      }
      if (financialStatementsToggled.toggleOperatingCashflow) {
        datasets.push(
          {
            label: "Cash from operation activities",
            data: fiscalReports.map(data => data.operatingCashflow).reverse(),
            backgroundColor: 'rgb(0, 81, 255)',
            barPercentage: .8,
            borderRadius: 3,
          }
        )
      }
      if (financialStatementsToggled.toggleInvestingCashflow) {
        datasets.push(
          {
            label: "Cash from investing activities",
            data: fiscalReports.map(data => data.cashflowFromInvestment).reverse(),
            backgroundColor: 'rgb(3, 245, 164)',
            barPercentage: .8,
            borderRadius: 3,
          }
        )
      }
      if (financialStatementsToggled.toggleFinancingCashflow) {
        datasets.push(
          {
            label: "Cash from financing activities",
            data: fiscalReports.map(data => data.cashflowFromFinancing).reverse(),
            backgroundColor: 'rgb(255, 77, 225)',
            barPercentage: .8,
            borderRadius: 3,
          }
        )
      }
      if (financialStatementsToggled.toggleFreeCashflow) {
        datasets.push(
          {
            label: "Free Cash Flow",
            data: fiscalReports.map(data => data.freeCashflow).reverse(),
            backgroundColor: 'rgb(255, 238, 0)',
            barPercentage: .8,
            borderRadius: 3,
          }
        )
      }

      break;

    default:
      break;
  }




  if (isYearlyorQuarterly.isYearly) {
    fiscalPeriod = [...new Set(fiscalReports.map((report) => report.fiscalDateEnding.split('-')[0]))];
    fiscalPeriod.reverse()
  } else {
    fiscalPeriod = [...new Set(fiscalReports.map((report) => report.fiscalDateEnding.split('-')[0] + '-' + report.fiscalDateEnding.split('-')[1]))].reverse().slice(12);
    for (let i = 0; i < fiscalPeriod.length; i++) {
      const [year, month] = fiscalPeriod[i].split('-');
      let quarter = '';
      if (month === '03') {
        quarter = 'Q1';
      } else if (month === '06') {
        quarter = 'Q2';
      } else if (month === '09') {
        quarter = 'Q3';
      } else if (month === '12') {
        quarter = 'Q4';
      }
      fiscalPeriod[i] = `${quarter} ${year}`;
    }
  }


  const [chartData, setChartData] = useState({
    labels: fiscalPeriod,
    datasets: datasets.map((dataset) => dataset)
  })

  useEffect(() => {
    setChartData({
      labels: fiscalPeriod,
      datasets: datasets.map((dataset) => dataset)
    })
  }, [financialStatementsToggled, isYearlyorQuarterly])


  function isChoosedSegment(statement) {
    if (location.pathname.includes(statement)) {
      return true
    } else {
      return false
    }
  }

  return (
    <>

      <div className="chart-div">
        <div className="chart">
          <BarChart data={chartData} />
        </div>
      </div>

      <div className="nav-div">

        <div className="financial-statements-nav">


          <div className="financial-statements-segments">

            {whichFinancialStatement === 'incomeStatement' ?
              <div className="financial-statements-segment-choosed">
                <div className="financial-statements-segment-link-choosed">Income Statement</div>
              </div>
              :
              <div onClick={() => {
                setWhichFinancialStatement('incomeStatement')
              }} className="financial-statements-segment">
                <div className="financial-statements-segment-link">Income Statement</div>
              </div>
            }
            {whichFinancialStatement === 'balanceSheet' ?
              <div className="financial-statements-segment-choosed">
                <div className="financial-statements-segment-link-choosed">Balance Sheet</div>
              </div>
              :
              <div onClick={() => {
                setWhichFinancialStatement('balanceSheet')
              }} className="financial-statements-segment">
                <div className="financial-statements-segment-link">Balance Sheet</div>
              </div>
            }
            {whichFinancialStatement === 'cashflowStatement' ?
              <div className="financial-statements-segment-choosed">
                <div className="financial-statements-segment-link-choosed">Cashflow Statement</div>
              </div>
              :
              <div onClick={() => {
                setWhichFinancialStatement('cashflowStatement')
              }} className="financial-statements-segment">
                <div className="financial-statements-segment-link">Cashflow Statement</div>
              </div>
            }

          </div>



        </div>
        <div className="yearly-quarterly-nav">

          <div className="yearly-quarterly-segments">
            {isYearly ?
              <div onClick={() => {
                if (!isYearly) {
                  setIsYearly(true)
                  setIsQuarterly(false)
                }
              }} className="yearly-quarterly-segment-choosed">
                <div className="yearly-quarterly-segment-link-choosed">Yearly</div>
              </div>
              :
              <div onClick={() => {
                if (!isYearly) {
                  setIsYearly(true)
                  setIsQuarterly(false)
                }
              }} className="yearly-quarterly-segment">
                <div className="yearly-quarterly-segment-link">Yearly</div>
              </div>
            }
            {isQuarterly ?
              <div onClick={() => {
                if (!isQuarterly) {
                  setIsQuarterly(true)
                  setIsYearly(false)
                }
              }} className="yearly-quarterly-segment-choosed">
                <div className="yearly-quarterly-segment-link-choosed">Quarterly</div>
              </div>
              :
              <div onClick={() => {
                if (!isQuarterly) {
                  setIsQuarterly(true)
                  setIsYearly(false)
                }
              }} className="yearly-quarterly-segment">
                <div className="yearly-quarterly-segment-link">Quarterly</div>
              </div>
            }
          </div>
        </div>

      </div>





      <Outlet />
    </>
  )
}

{/*  */ }