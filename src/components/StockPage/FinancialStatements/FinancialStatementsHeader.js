import React, { useState, useEffect } from 'react'
import { useParams, Link, useLocation, Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'


import '../../../css/financialStatementsHeader.css'

import BarChart from '../../Charts/BarChart'
import LineChart from '../../Charts/LineChart'
import Button from '../Button'
import { getIsYearlyOrQuarterly } from '../../../actions/isYearlyorQuarterly'
import { getWhichFinancialStatement } from '../../../actions/whichFinancialStatement'
import { getFinancialStatementsExtras } from '../../../actions/financialStatementsExtras'


export default function FinancialStatementsHeader() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const financialStatementsToggled = useSelector((state) => state.getFinancialStatementsToggled)
  const financialStatement = useSelector((state) => state.whichFinancialStatement)
  const isYearlyorQuarterly = useSelector((state) => state.getIsYearlyorQuarterly)
  const financialStatementsExtras = useSelector((state) => state.getFinancialStatementsExtras);
  const location = useLocation()
  const linkUrl_IncomeStatement = `/stocks/${id}/financial-statements/income-statement`
  const linkUrl_BalanceSheet = `/stocks/${id}/financial-statements/balance-sheet`
  const linkUrl_CashflowStatement = `/stocks/${id}/financial-statements/cashflow-statement`
  const stock = location.state
  let fiscalReports = stock.FinancialStatements.IncomeStatement.annualReports
  let fiscalPeriod = 'Year'
  let datasets = []
  let chartOptions = {
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: 'white'
        },
        grid: {
          display: false
        }
      },
      y1: {
        type: 'linear',
        display: false,
        position: 'left',
        ticks: {
          callback: function (value) {
            if (Math.abs(value) >= 1000000000000) {
              return (value / 1000000000000).toFixed(1) + 'T'
            } else if (Math.abs(value) >= 1000000000) {
              return (value / 1000000000).toFixed(1) + 'B';
            } else if (Math.abs(value) >= 1000000) {
              return (value / 1000000).toFixed(1) + 'M';
            } else if (Math.abs(value) >= 1000) {
              return (value / 1000).toFixed(1) + 'K';
            } else {
              return value;
            }
          },
          color: 'white'
        },
        grid: {
          color: 'rgb(30, 30, 30)'
        }
      },
      y2: {
        type: 'linear',
        display: false,
        position: 'right',
        max: 0,
        min: 1,
        ticks: {
          callback: function (value) {
            return (value * 100).toFixed(0) + '%'; // convert it to percentage
          },
          color: 'white'
        },
        grid: {
          display: false
        }
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (data) {
            if (data.dataset.yAxisID == 'y1') {
              if (Math.abs(data.raw) >= 1000000000000) {
                return (data.raw / 1000000000000).toFixed(1) + 'T'
              } else if (Math.abs(data.raw) >= 1000000000) {
                return (data.raw / 1000000000).toFixed(1) + 'B';
              } else if (Math.abs(data.raw) >= 1000000) {
                return (data.raw / 1000000).toFixed(1) + 'M';
              } else if (Math.abs(data.raw) >= 1000) {
                return (data.raw / 1000).toFixed(1) + 'K';
              } else {
                return data.raw;
              }
            } else if (data.dataset.yAxisID == 'y2') {
              return (data.raw * 100).toFixed(2) + '%';
            }
          }
        }
      },
      legend: {
        labels: {
          useBorderRadius: true,
          borderRadius: 3,
          usePointStyle: false,
          pointStyle: false,
          color: 'white'
        }
      },
    }
  }

  const [isYearly, setIsYearly] = useState(true)
  const [isQuarterly, setIsQuarterly] = useState(false)
  const [whichFinancialStatement, setWhichFinancialStatement] = useState('incomeStatement')
  const [allYoY, setAllYoY] = useState(false)
  const [allMargin, setAllMargin] = useState(false)
  let isChoosedIncomeStatement
  let isChoosedBalanceSheet
  let isChoosedCashflowStatement
  let isChoosedAllYoY
  let isChoosedAllMargin
  let isChoosedYearly
  let isChoosedQuarterly

  if (whichFinancialStatement === 'incomeStatement') {
    isChoosedIncomeStatement = '-choosed'
  } else {
    isChoosedIncomeStatement = ''
  }
  if (whichFinancialStatement === 'balanceSheet') {
    isChoosedBalanceSheet = '-choosed'
  } else {
    isChoosedBalanceSheet = ''
  }
  if (whichFinancialStatement === 'cashflowStatement') {
    isChoosedCashflowStatement = '-choosed'
  } else {
    isChoosedCashflowStatement = ''
  }
  if (allYoY) {
    isChoosedAllYoY = '-choosed'
  } else {
    isChoosedAllYoY = ''
  }
  if (allMargin) {
    isChoosedAllMargin = '-choosed'
  } else {
    isChoosedAllMargin = ''
  }
  if (isYearly) {
    isChoosedYearly = '-choosed'
  } else {
    isChoosedYearly = ''
  }
  if (isQuarterly) {
    isChoosedQuarterly = '-choosed'
  } else {
    isChoosedQuarterly = ''
  }

  useEffect(() => {
    if (allYoY) {
      for (const metric in financialStatementsExtras) {
        console.log(metric)
        dispatch(getFinancialStatementsExtras({ [metric]: { YoY: true, margin: financialStatementsExtras[metric].margin } }))
      }

    } else {
      for (const metric in financialStatementsExtras) {
        dispatch(getFinancialStatementsExtras({ [metric]: { YoY: false, margin: financialStatementsExtras[metric].margin } }))
      }

    }
  }, [allYoY, dispatch])

  useEffect(() => {
    if (allMargin) {
      for (const metric in financialStatementsExtras) {
        dispatch(getFinancialStatementsExtras({ [metric]: { YoY: financialStatementsExtras[metric].YoY, margin: true } }))
      }

    } else {
      for (const metric in financialStatementsExtras) {
        dispatch(getFinancialStatementsExtras({ [metric]: { YoY: financialStatementsExtras[metric].YoY, margin: false } }))
      }

    }
  }, [allMargin, dispatch])



  useEffect(() => {
    dispatch(getIsYearlyOrQuarterly({ isYearly: isYearly }))
  }, [isYearly])

  useEffect(() => {
    dispatch(getIsYearlyOrQuarterly({ isQuarterly: isQuarterly }))
  }, [isQuarterly])

  useEffect(() => {
    dispatch(getWhichFinancialStatement(whichFinancialStatement))
  }, [whichFinancialStatement])


  switch (financialStatement) {


    // Income Statement
    case 'incomeStatement':
      if (isYearlyorQuarterly.isYearly) {
        fiscalReports = stock.FinancialStatements.IncomeStatement.annualReports
      } else {
        fiscalReports = stock.FinancialStatements.IncomeStatement.quarterlyReports
      }

      const incomeStatement_metrics = [
        {
          realName: 'totalRevenue',
          myName: 'totalRevenue',
          label: 'Total Revenue',
          rgb: 'rgb(68, 138, 255)',
          income_expense: 'income'
        },
        {
          realName: 'costofGoodsAndServicesSold',
          myName: 'costOfGoodsAndServicesSold',
          label: 'Cost of Goods and Services Sold',
          marginLabel: 'Cost of Goods and Services Sold % of Revenue',
          rgb: `rgb(231, 12, 12)`,
          income_expense: 'expense'
        },
        //${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}
        {
          realName: 'grossProfit',
          myName: 'grossProfit',
          label: 'Gross Profit',
          marginLabel: 'Gross Profit % of Revenue',
          rgb: 'rgb(77, 208, 225)',
          income_expense: 'income'
        },
        {
          realName: 'operatingExpenses',
          myName: 'operatingExpenses',
          label: 'Operating Expenses',
          marginLabel: 'Operating Expenses % of Revenue',
          rgb: 'rgb(231, 12, 12)',
          income_expense: 'expense'
        },
        {
          realName: 'operatingIncome',
          myName: 'operatingIncome',
          label: 'Operating Income',
          marginLabel: 'Operating Income % of Revenue',
          rgb: 'rgb(179, 136, 255)',
          income_expense: 'income'
        },
        {
          realName: 'otherNonOperatingIncome',
          myName: 'nonOperatingIncome',
          label: 'Non Operating Income',
          marginLabel: 'Non Operating Income % of Revenue',
          rgb: 'rgb(231, 12, 12)',
          income_expense: 'income'
        },
        {
          realName: 'incomeBeforeTax',
          myName: 'pretaxIncome',
          label: 'Pretax Income',
          marginLabel: 'Pretax % of Revenue',
          rgb: 'rgb(245, 127, 23)',
          income_expense: 'income'
        },
        {
          realName: 'incomeTaxExpense',
          myName: 'taxes',
          label: 'Taxes',
          marginLabel: 'Taxes % of Revenue',
          rgb: 'rgb(231, 12, 12)',
          income_expense: 'expense'
        },
        {
          realName: 'netIncome',
          myName: 'netIncome',
          label: 'Net Income',
          marginLabel: 'Net Income % of Revenue',
          rgb: 'rgb(251, 192, 45)',
          income_expense: 'income'
        },
      ]




      // Margin
      for (const index in incomeStatement_metrics) {
        const realName = incomeStatement_metrics[index].realName
        const myName = incomeStatement_metrics[index].myName
        const label = incomeStatement_metrics[index].marginLabel
        const rgb = incomeStatement_metrics[index].rgb

        if (financialStatementsToggled[`toggle${myName.charAt(0).toUpperCase() + myName.slice(1)}Margin`]) {
          chartOptions.scales.y2.display = true
          chartOptions.plugins.legend.labels.usePointStyle = true
          chartOptions.plugins.legend.labels.pointStyle = 'line'
          if (chartOptions.scales.y2.max < Math.max(...fiscalReports.map(data => (data[realName] / data.totalRevenue))) + .01) {
            chartOptions.scales.y2.max = Math.max(...fiscalReports.map(data => (data[realName] / data.totalRevenue))) + .01
          }
          if (chartOptions.scales.y2.min > Math.min(...fiscalReports.map(data => (data[realName] / data.totalRevenue))) - .01) {
            chartOptions.scales.y2.min = Math.min(...fiscalReports.map(data => (data[realName] / data.totalRevenue))) - .01
          }

          datasets.push(
            {
              type: 'line',
              label: label,
              data: fiscalReports.map(data => (data[realName] / data.totalRevenue)).reverse(),
              yAxisID: 'y2',
              backgroundColor: rgb,
              borderColor: rgb,
              barPercentage: .8,
              borderRadius: 3,
            }
          )
        }
      }

      // Metric
      for (const index in incomeStatement_metrics) {
        const realName = incomeStatement_metrics[index].realName
        const myName = incomeStatement_metrics[index].myName
        const label = incomeStatement_metrics[index].label
        const rgb = incomeStatement_metrics[index].rgb
        const income_expense = incomeStatement_metrics[index].income_expense
        let data = fiscalReports.map(data => data[realName]).reverse()

        if (financialStatementsToggled[`toggle${myName.charAt(0).toUpperCase() + myName.slice(1)}`]) {
          chartOptions.scales.y1.display = true

          if (income_expense == 'expense') {
            data = fiscalReports.map(data => 0 - data[realName]).reverse()
          }

          datasets.push(
            {
              type: 'bar',
              label: label,
              data: data,
              yAxisID: 'y1',
              backgroundColor: rgb,
              barPercentage: .85,
              borderRadius: 5,
            }
          )
        }
      }

      break


    // Balance Sheet
    case 'balanceSheet':
      if (isYearlyorQuarterly.isYearly) {
        fiscalReports = stock.FinancialStatements.BalanceSheet.annualReports
      } else {
        fiscalReports = stock.FinancialStatements.BalanceSheet.quarterlyReports
      }

      const balanceSheet_metrics = [{
        realName: 'totalAssets',
        myName: 'totalAssets',
        label: 'Total Assets',
        rgb: 'rgb(68, 138, 255)',
      },
      {
        realName: 'totalLiabilities',
        myName: 'totalLiabilities',
        label: 'Total Liabilities',
        rgb: 'rgb(77, 208, 225)',
      },
      {
        realName: 'totalShareholderEquity',
        myName: 'totalEquity',
        label: 'Total Equity',
        rgb: 'rgb(245, 127, 23)',
      },
      ]

      // Metric
      for (const index in balanceSheet_metrics) {
        const realName = balanceSheet_metrics[index].realName
        const myName = balanceSheet_metrics[index].myName
        const label = balanceSheet_metrics[index].label
        const rgb = balanceSheet_metrics[index].rgb
        let data = fiscalReports.map(data => data[realName]).reverse()

        if (financialStatementsToggled[`toggle${myName.charAt(0).toUpperCase() + myName.slice(1)}`]) {

          chartOptions.scales.y1.display = true

          datasets.push(
            {
              type: 'bar',
              label: label,
              data: data,
              yAxisID: 'y1',
              backgroundColor: rgb,
              barPercentage: .85,
              borderRadius: 5,
            }
          )
        }
      }


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
    if (financialStatement != 'balanceSheet') {
      fiscalPeriod.shift()
    }
    fiscalPeriod.reverse()

  } else {
    fiscalPeriod = [...new Set(fiscalReports.map((report) => report.fiscalDateEnding.split('-')[0] + '-' + report.fiscalDateEnding.split('-')[1]))].slice(0, 8).reverse();
    for (let i = 0; i < fiscalPeriod.length; i++) {

      let [year, month] = fiscalPeriod[i].split('-');
      let quarter = '';

      if (month === '01' || month === '02' || month === '03') {
        quarter = 'Q1';
      } else if (month === '04' || month === '05' || month === '06') {
        quarter = 'Q2';
      } else if (month === '07' || month === '08' || month === '09') {
        quarter = 'Q3';
      } else {
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
      datasets: datasets.map((dataset) => dataset),
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
        <div style={isQuarterly ? { width: '70%' } : {}} className="chart">
          <BarChart data={chartData} options={chartOptions} />
        </div>
      </div>

      <div className="nav-div">

        <div className="financial-statements-nav">


          <div className="financial-statements-segments">

            <Button
              isChoosed={isChoosedIncomeStatement}
              segmentName={'Income Statement'}
              func={() => setWhichFinancialStatement('incomeStatement')}
            />

            <Button
              isChoosed={isChoosedBalanceSheet}
              segmentName={'Balance Sheet'}
              func={() => setWhichFinancialStatement('balanceSheet')}
            />

            <Button
              isChoosed={isChoosedCashflowStatement}
              segmentName={'Cashflow Statement'}
              func={() => setWhichFinancialStatement('cashflowStatement')}
            />

          </div>

          <div className="all-YoY-margin-segments">

            <Button
              isChoosed={isChoosedAllYoY}
              segmentName={'% YoY'}
              func={() => setAllYoY(allYoY ? false : true)}
            />

            {financialStatement != 'balanceSheet' ?
              <Button
                isChoosed={isChoosedAllMargin}
                segmentName={'% of Revenue '}
                func={() => setAllMargin(allMargin ? false : true)}
              />
              :
              ''
            }



          </div>

        </div>
        <div className="yearly-quarterly-nav">

          <div className="yearly-quarterly-segments">
            <Button
              isChoosed={isChoosedYearly}
              segmentName={'Yearly'}
              func={() => { setIsYearly(isYearly ? false : true); setIsQuarterly(isYearly ? true : false) }}
            />

            <Button
              isChoosed={isChoosedQuarterly}
              segmentName={'Quarterly'}
              func={() => { setIsQuarterly(isQuarterly ? false : true); setIsYearly(isQuarterly ? true : false) }}
            />

          </div>
        </div>

      </div>





      <Outlet />
    </>
  )
}

{/*  */ }