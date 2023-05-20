import React, { useEffect, useState } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'


import { getFinancialStatementsDropdown } from '../../../../../actions/financialStatementsDropdown'
import { getFinancialStatementsExtras } from '../../../../../actions/financialStatementsExtras'

import RowDropdown from '../../RowDropdown'
import TableRow from '../../TableRow'



export default function IncomeStatement_yearly({ toggledMetrics, setToggledMetrics }) {
  const location = useLocation()
  const dispatch = useDispatch()

  const financialStatementsDropdown = useSelector((state) => state.getFinancialStatementsDropdown)

  const [totalRevenueDropdown, setTotalRevenueDropdown] = useState(false)
  const [costOfGoodsAndServicesSoldDropdown, setCostOfGoodsAndServicesSoldDropdown] = useState(false)

  const [totalRevenueExtras, setTotalRevenueExtras] = useState({ YoY: false, margin: false })
  const [costOfGoodsAndServicesSoldExtras, setTostOfGoodsAndServicesSoldExtras] = useState({ YoY: false, margin: false })

  const stock = location.state
  const annualReports = stock.FinancialStatements.IncomeStatement.annualReports

  const fiscalYears = [...new Set(annualReports.map((report) => report.fiscalDateEnding.split('-')[0]))];
  fiscalYears.reverse()


  useEffect(() => {
    console.log('Is', totalRevenueDropdown)
    dispatch(getFinancialStatementsDropdown({ totalRevenueDropdown: totalRevenueDropdown }))
  }, [totalRevenueDropdown])

  useEffect(() => {
    console.log('Is', costOfGoodsAndServicesSoldDropdown)
    dispatch(getFinancialStatementsDropdown({ costOfGoodsAndServicesSoldDropdown: costOfGoodsAndServicesSoldDropdown }))
  }, [costOfGoodsAndServicesSoldDropdown])


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

  //console.log(stock.FinancialStatements.IncomeStatement.TotalRevenue.find({ date: '2020' }))
  return (
    <>

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

            {/* Total Revenue*/}
            <TableRow
              metric={'Total Revenue'}
              metricValue={'totalRevenue'}
              toggledID={'toggled-totalRevenue'}
              fiscalPeriods={fiscalYears}
              dropdown={financialStatementsDropdown.totalRevenueDropdown}
              setDropdown={setTotalRevenueDropdown}
              reports={annualReports}
              extras={totalRevenueExtras}
              setExtras={setTotalRevenueExtras}
              toggledMetric={toggledMetrics.toggleTotalRevenue}
              setToggledMetric={setToggledMetrics.setToggleTotalRevenue} />

            {/* Cost of Goods and Services sold */}
            <TableRow
              metric={'Cost of Goods and Services Sold'}
              metricValue={'costofGoodsAndServicesSold'}
              toggledID={'toggled-costofGoodsAndServicesSold'}
              fiscalPeriods={fiscalYears}
              dropdown={financialStatementsDropdown.costOfGoodsAndServicesSoldDropdown}
              setDropdown={setCostOfGoodsAndServicesSoldDropdown}
              reports={annualReports}
              extras={costOfGoodsAndServicesSoldExtras}
              setExtras={setTostOfGoodsAndServicesSoldExtras}
              toggledMetric={toggledMetrics.toggleCostOfGoodsAndServicesSold}
              setToggledMetric={setToggledMetrics.setToggleCostOfGoodsAndServicesSold} />



            {/* Gross Profit */}
            {toggledMetrics.toggleGrossProfit ?
              <tr id="toggled-toggleGrossProfit" onClick={() => {
                if (!toggledMetrics.toggleGrossProfit) {
                  setToggledMetrics.setToggleGrossProfit(true)
                } else {
                  setToggledMetrics.setToggleGrossProfit(false)
                }
              }}>
                <td>Gross Profit</td>
                {fiscalYears.map((year) => (
                  <td key={year}>
                    {formatNumber(annualReports.find((report) => report.fiscalDateEnding.startsWith(year))?.grossProfit)}
                  </td>
                ))}
              </tr>
              :
              <tr onClick={() => {
                if (!toggledMetrics.toggleGrossProfit) {
                  setToggledMetrics.setToggleGrossProfit(true)
                } else {
                  setToggledMetrics.setToggleGrossProfit(false)
                }
              }}>
                <td>Gross Profit</td>
                {fiscalYears.map((year) => (
                  <td key={year}>
                    {formatNumber(annualReports.find((report) => report.fiscalDateEnding.startsWith(year))?.grossProfit)}
                  </td>
                ))}
              </tr>
            }



            {/* Operating Expenses */}
            {toggledMetrics.toggleOperatingExpenses ?
              <tr id="toggled-toggleOperatingExpenses" onClick={() => {
                if (!toggledMetrics.toggleOperatingExpenses) {
                  setToggledMetrics.setToggleOperatingExpenses(true)
                } else {
                  setToggledMetrics.setToggleOperatingExpenses(false)
                }
              }}>
                <td>Operating Expenses</td>
                {fiscalYears.map((year) => (
                  <td key={year}>
                    {formatNumber(annualReports.find((report) => report.fiscalDateEnding.startsWith(year))?.operatingExpenses)}
                  </td>
                ))}
              </tr>
              :
              <tr onClick={() => {
                if (!toggledMetrics.toggleOperatingExpenses) {
                  setToggledMetrics.setToggleOperatingExpenses(true)
                } else {
                  setToggledMetrics.setToggleOperatingExpenses(false)
                }
              }}>
                <td>Operating Expenses</td>
                {fiscalYears.map((year) => (
                  <td key={year}>
                    {formatNumber(annualReports.find((report) => report.fiscalDateEnding.startsWith(year))?.operatingExpenses)}
                  </td>
                ))}
              </tr>
            }


            {/* Operating Income */}
            {toggledMetrics.toggleOperatingIncome ?
              <tr id="toggled-operatingIncome" onClick={() => {
                if (!toggledMetrics.toggleOperatingIncome) {
                  setToggledMetrics.setToggleOperatingIncome(true)
                } else {
                  setToggledMetrics.setToggleOperatingIncome(false)
                }
              }}>
                <td>Operating Income</td>
                {fiscalYears.map((year) => (
                  <td key={year}>
                    {formatNumber(annualReports.find((report) => report.fiscalDateEnding.startsWith(year))?.operatingIncome)}
                  </td>
                ))}
              </tr>
              :
              <tr onClick={() => {
                if (!toggledMetrics.toggleOperatingIncome) {
                  setToggledMetrics.setToggleOperatingIncome(true)
                } else {
                  setToggledMetrics.setToggleOperatingIncome(false)
                }
              }}>
                <td>Operating Income</td>
                {fiscalYears.map((year) => (
                  <td key={year}>
                    {formatNumber(annualReports.find((report) => report.fiscalDateEnding.startsWith(year))?.operatingIncome)}
                  </td>
                ))}
              </tr>
            }


            {/* Non-operating income */}
            {toggledMetrics.toggleNonOperatingIncome ?
              <tr id="toggled-otherNonOperatingIncome" onClick={() => {
                if (!toggledMetrics.toggleNonOperatingIncome) {
                  setToggledMetrics.setToggleNonOperatingIncome(true)
                } else {
                  setToggledMetrics.setToggleNonOperatingIncome(false)
                }
              }}>
                <td>Non-operating income</td>
                {fiscalYears.map((year) => (
                  <td key={year}>
                    {formatNumber(annualReports.find((report) => report.fiscalDateEnding.startsWith(year))?.otherNonOperatingIncome)}
                  </td>
                ))}
              </tr>
              :
              <tr onClick={() => {
                if (!toggledMetrics.toggleNonOperatingIncome) {
                  setToggledMetrics.setToggleNonOperatingIncome(true)
                } else {
                  setToggledMetrics.setToggleNonOperatingIncome(false)
                }
              }}>
                <td>Non-operating income</td>
                {fiscalYears.map((year) => (
                  <td key={year}>
                    {formatNumber(annualReports.find((report) => report.fiscalDateEnding.startsWith(year))?.otherNonOperatingIncome)}
                  </td>
                ))}
              </tr>
            }


            {/* Pretax Income */}
            {toggledMetrics.togglePretaxIncome ?
              <tr id="toggled-incomeBeforeTax" onClick={() => {
                if (!toggledMetrics.togglePretaxIncome) {
                  setToggledMetrics.setTogglePretaxIncome(true)
                } else {
                  setToggledMetrics.setTogglePretaxIncome(false)
                }
              }}>
                <td>Pretax Income</td>
                {fiscalYears.map((year) => (
                  <td key={year}>
                    {formatNumber(annualReports.find((report) => report.fiscalDateEnding.startsWith(year))?.incomeBeforeTax)}
                  </td>
                ))}
              </tr>
              :
              <tr onClick={() => {
                if (!toggledMetrics.togglePretaxIncome) {
                  setToggledMetrics.setTogglePretaxIncome(true)
                } else {
                  setToggledMetrics.setTogglePretaxIncome(false)
                }
              }}>
                <td>Pretax Income</td>
                {fiscalYears.map((year) => (
                  <td key={year}>
                    {formatNumber(annualReports.find((report) => report.fiscalDateEnding.startsWith(year))?.incomeBeforeTax)}
                  </td>
                ))}
              </tr>
            }



            {/* Taxes */}
            {toggledMetrics.toggleTaxes ?
              <tr id="toggled-taxes" onClick={() => {
                if (!toggledMetrics.toggleTaxes) {
                  setToggledMetrics.setToggleTaxes(true)
                } else {
                  setToggledMetrics.setToggleTaxes(false)
                }
              }}>
                <td>Taxes</td>
                {fiscalYears.map((year) => (
                  <td key={year}>
                    {formatNumber(annualReports.find((report) => report.fiscalDateEnding.startsWith(year))?.incomeTaxExpense)}
                  </td>
                ))}
              </tr>
              :
              <tr onClick={() => {
                if (!toggledMetrics.toggleTaxes) {
                  setToggledMetrics.setToggleTaxes(true)
                } else {
                  setToggledMetrics.setToggleTaxes(false)
                }
              }}>
                <td>Taxes</td>
                {fiscalYears.map((year) => (
                  <td key={year}>
                    {formatNumber(annualReports.find((report) => report.fiscalDateEnding.startsWith(year))?.incomeTaxExpense)}
                  </td>
                ))}
              </tr>
            }



            {/* Net Income */}
            {toggledMetrics.toggleNetIncome ?
              <tr id="toggled-netIncome" onClick={() => {
                if (!toggledMetrics.toggleNetIncome) {
                  setToggledMetrics.setToggleNetIncome(true)
                } else {
                  setToggledMetrics.setToggleNetIncome(false)
                }
              }}>
                <td>Net Income</td>
                {fiscalYears.map((year) => (
                  <td key={year}>
                    {formatNumber(annualReports.find((report) => report.fiscalDateEnding.startsWith(year))?.netIncome)}
                  </td>
                ))}
              </tr>
              :
              <tr onClick={() => {
                if (!toggledMetrics.toggleNetIncome) {
                  setToggledMetrics.setToggleNetIncome(true)
                } else {
                  setToggledMetrics.setToggleNetIncome(false)
                }
              }}>
                <td>Net Income</td>
                {fiscalYears.map((year) => (
                  <td key={year}>
                    {formatNumber(annualReports.find((report) => report.fiscalDateEnding.startsWith(year))?.netIncome)}
                  </td>
                ))}
              </tr>
            }


          </tbody>
        </table>
      </div>

    </>
  )
}
