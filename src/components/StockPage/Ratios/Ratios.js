import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import '../../../css/table.css'

import BarChart from '../../Charts/BarChart'
import LineChart from '../../Charts/LineChart'

export default function Ratios() {
  const location = useLocation()
  const stock = location.state
  const fiscalYears = [...new Set(stock.FinancialStatements.BalanceSheet.annualReports.map((report) => report.fiscalDateEnding.split('-')[0]))];
  fiscalYears.reverse()
  let annualReports = stock.Ratios.Profitability.annualReports
  let datasets = []

  const [toggleGrossMargin, setToggleGrossMargin] = useState(true)
  const [toggleNetMargin, setToggleNetMargin] = useState(false)

  if (toggleGrossMargin) {
    if (!datasets.some(item => item.label === "Gross Margin")) {
      datasets.push({
        label: "Gross Margin",
        data: annualReports.map(data => data.grossMargin).reverse(),
        backgroundColor: 'blue',
        borderColor: 'blue'
      })
    }
  } else {

    const indexToDelete = datasets.findIndex(item => item.label === "Gross Margin");

    if (indexToDelete !== -1) {
      datasets.splice(indexToDelete, 1);
    }
  }

  if (toggleNetMargin) {
    if (!datasets.some(item => item.label === "Net Margin")) {
      datasets.push({
        label: "Net Margin",
        data: annualReports.map(data => data.netMargin).reverse(),
        backgroundColor: 'rgba(255, 255, 0)',
        borderColor: 'rgba(255, 255, 0)'
      })
    }
  } else {

    const indexToDelete = datasets.findIndex(item => item.label === "Net Margin");

    if (indexToDelete !== -1) {
      datasets.splice(indexToDelete, 1);
    }
  }

  const [chartData, setChartData] = useState({
    labels: fiscalYears,
    datasets: datasets.map((dataset) => dataset)
  })
  console.log(datasets)
  useEffect(() => {
    setChartData({
      labels: fiscalYears,
      datasets: datasets.map((dataset) => dataset)
    })
  }, [toggleGrossMargin, toggleNetMargin])



  function formatNumber(num, type) {
    if (num == undefined) {
      return '---'
    }
    if (type == "profitability") {
      return (`${(num * 100)?.toFixed(2)}%`)
    } else if (type == "financialStability") {
      return (`${(num)?.toFixed(2)}`)
    }

    // if (Math.abs(num) >= 1000000000000) {
    //   return (num / 1000000000000).toFixed(1) + 'T'
    // } else if (Math.abs(num) >= 1000000000) {
    //   return (num / 1000000000).toFixed(1) + 'B';
    // } else if (Math.abs(num) >= 1000000) {
    //   return (num / 1000000).toFixed(1) + 'M';
    // } else if (Math.abs(num) >= 1000) {
    //   return (num / 1000).toFixed(1) + 'K';
    // } else {
    //   return num;
    // }
  }

  // function toggle(type) {
  //   if (type === 'grossMargin') {
  //     setToggleGrossMargin(true)
  //   }
  // }

  return (
    <>
      <div className="chart-div">
        <div className="chart">
          <LineChart data={chartData} />
        </div>
      </div>
      <h2>Ratios</h2>

      <div className="table-div">
        <table className="table">
          <thead>
            <tr>
              <th className="first-column">Currency: USD</th>
              {fiscalYears.map((year) => (
                <th className="other-columns" key={year}>{year}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {toggleGrossMargin ?
              <tr id="toggled-grossMargin" onClick={() => {
                if (!toggleGrossMargin) {
                  setToggleGrossMargin(true)
                } else {
                  setToggleGrossMargin(false)
                }
              }}>
                <td>Gross Margin</td>
                {fiscalYears.map((year) => (
                  <td key={year}>
                    {formatNumber(stock.Ratios.Profitability.annualReports.find((report) => report.fiscalDateEnding.startsWith(year))?.grossMargin, 'profitability')}
                  </td>
                ))}
              </tr>
              :
              <tr onClick={() => {
                if (!toggleGrossMargin) {
                  setToggleGrossMargin(true)
                } else {
                  setToggleGrossMargin(false)
                }
              }}>
                <td>Gross Margin</td>
                {fiscalYears.map((year) => (
                  <td key={year}>
                    {formatNumber(stock.Ratios.Profitability.annualReports.find((report) => report.fiscalDateEnding.startsWith(year))?.grossMargin, 'profitability')}
                  </td>
                ))}
              </tr>
            }

            {toggleNetMargin ?
              <tr id="toggled-netMargin" onClick={() => {
                if (!toggleNetMargin) {
                  setToggleNetMargin(true)
                } else {
                  setToggleNetMargin(false)
                }
              }}>
                <td>Net Margin</td>
                {fiscalYears.map((year) => (
                  <td key={year}>
                    {formatNumber(stock.Ratios.Profitability.annualReports.find((report) => report.fiscalDateEnding.startsWith(year))?.netMargin, 'profitability')}
                  </td>
                ))}
              </tr>
              :
              <tr onClick={() => {
                if (!toggleNetMargin) {
                  setToggleNetMargin(true)
                } else {
                  setToggleNetMargin(false)
                }
              }}>
                <td>Net Margin</td>
                {fiscalYears.map((year) => (
                  <td key={year}>
                    {formatNumber(stock.Ratios.Profitability.annualReports.find((report) => report.fiscalDateEnding.startsWith(year))?.netMargin, 'profitability')}
                  </td>
                ))}
              </tr>
            }


            <tr>
              <td>Operating Margin</td>
              {fiscalYears.map((year) => (
                <td key={year}>
                  {formatNumber(stock.Ratios.Profitability.annualReports.find((report) => report.fiscalDateEnding.startsWith(year))?.operatingMargin, 'profitability')}
                </td>
              ))}
            </tr>

            <tr>
              <td>Return On Assets</td>
              {fiscalYears.map((year) => (
                <td key={year}>
                  {formatNumber(stock.Ratios.Profitability.annualReports.find((report) => report.fiscalDateEnding.startsWith(year))?.returnOnAssets, 'profitability')}
                </td>
              ))}
            </tr>

            <tr>
              <td>Return On Equity</td>
              {fiscalYears.map((year) => (
                <td key={year}>
                  {formatNumber(stock.Ratios.Profitability.annualReports.find((report) => report.fiscalDateEnding.startsWith(year))?.returnOnEquity, 'profitability')}
                </td>
              ))}
            </tr>



            <tr>
              <td>Quick Ratio</td>
              {fiscalYears.map((year) => (
                <td key={year}>
                  {formatNumber(stock.Ratios.FinancialStability.annualReports.find((report) => report.fiscalDateEnding.startsWith(year))?.quickRatio, 'financialStability')}
                </td>
              ))}
            </tr>

            <tr>
              <td>Current Ratio</td>
              {fiscalYears.map((year) => (
                <td key={year}>
                  {formatNumber(stock.Ratios.FinancialStability.annualReports.find((report) => report.fiscalDateEnding.startsWith(year))?.currentRatio, 'financialStability')}
                </td>
              ))}
            </tr>

            <tr>
              <td>Asset Turnover</td>
              {fiscalYears.map((year) => (
                <td key={year}>
                  {formatNumber(stock.Ratios.FinancialStability.annualReports.find((report) => report.fiscalDateEnding.startsWith(year))?.assetTurnover, 'financialStability')}
                </td>
              ))}
            </tr>

            <tr>
              <td>Inventory Turnover</td>
              {fiscalYears.map((year) => (
                <td key={year}>
                  {formatNumber(stock.Ratios.FinancialStability.annualReports.find((report) => report.fiscalDateEnding.startsWith(year))?.inventoryTurnover, 'financialStability')}
                </td>
              ))}
            </tr>


            {/* add more rows for other financial metrics */}
          </tbody>
        </table>
      </div>

    </>
  )
}
