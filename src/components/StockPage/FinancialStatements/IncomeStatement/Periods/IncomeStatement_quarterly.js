import React, { useEffect, useState } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'


import { getFinancialStatementsToggled } from '../../../../../actions/financialStatementsToggled'



export default function BalanceSheet_quarterly({ toggledMetrics, setToggledMetrics }) {
  const location = useLocation()
  const dispatch = useDispatch()

  const stock = location.state
  const quarterlyReports = stock.FinancialStatements.IncomeStatement.quarterlyReports
  const fiscalQuarters = [...new Set(stock.FinancialStatements.IncomeStatement.quarterlyReports.map((report) => report.fiscalDateEnding.split('-')[0] + '-' + report.fiscalDateEnding.split('-')[1]))].reverse().slice(12);

  const formattedQuarters = fiscalQuarters.map(q => {
    const [year, month] = q.split('-');
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
    return `${quarter} ${year}`;
  });



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

  //console.log(stock.FinancialStatements.IncomeStatement.TotalRevenue.find({ date: '2020' }))
  return (
    <>

      <div className="table-div">
        <table className="table-quarterly">
          <thead>
            <tr>
              <th className="first-column">Currency: USD</th>
              {formattedQuarters.map((quarter) => (
                <th className="other-columns" key={quarter}>{quarter}</th>
              ))}
            </tr>
          </thead>
          <tbody>

            {/* Total Revenue*/}
            {toggledMetrics.toggleTotalRevenue ?
              <tr id="toggled-totalRevenue" onClick={() => {
                if (!toggledMetrics.toggleTotalRevenue) {
                  setToggledMetrics.setToggleTotalRevenue(true)
                } else {
                  setToggledMetrics.setToggleTotalRevenue(false)
                }
              }}>
                <td>Total Revenue</td>
                {fiscalQuarters.map((quarter) => (
                  <td key={quarter}>
                    {formatNumber(quarterlyReports.find((report) => report.fiscalDateEnding.startsWith(quarter))?.totalRevenue)}
                  </td>
                ))}
              </tr>
              :
              <tr onClick={() => {
                if (!toggledMetrics.toggleTotalRevenue) {
                  setToggledMetrics.setToggleTotalRevenue(true)
                } else {
                  setToggledMetrics.setToggleTotalRevenue(false)
                }
              }}>
                <td>Total Revenue</td>
                {fiscalQuarters.map((quarter) => (
                  <td key={quarter}>
                    {formatNumber(quarterlyReports.find((report) => report.fiscalDateEnding.startsWith(quarter))?.totalRevenue)}
                  </td>
                ))}
              </tr>
            }


            {/* Cost of Goods and Services Sold */}
            {toggledMetrics.toggleCostOfGoodsAndServicesSold ?
              <tr id="toggled-costofGoodsAndServicesSold" onClick={() => {
                if (!toggledMetrics.toggleCostOfGoodsAndServicesSold) {
                  setToggledMetrics.setToggleCostOfGoodsAndServicesSold(true)
                } else {
                  setToggledMetrics.setToggleCostOfGoodsAndServicesSold(false)
                }
              }}>
                <td>Cost of Goods and Services Sold</td>
                {fiscalQuarters.map((quarter) => (
                  <td key={quarter}>
                    {formatNumber(quarterlyReports.find((report) => report.fiscalDateEnding.startsWith(quarter))?.costofGoodsAndServicesSold)}
                  </td>
                ))}
              </tr>
              :
              <tr onClick={() => {
                if (!toggledMetrics.toggleCostOfGoodsAndServicesSold) {
                  setToggledMetrics.setToggleCostOfGoodsAndServicesSold(true)
                } else {
                  setToggledMetrics.setToggleCostOfGoodsAndServicesSold(false)
                }
              }}>
                <td>Cost of Goods and Services Sold</td>
                {fiscalQuarters.map((quarter) => (
                  <td key={quarter}>
                    {formatNumber(quarterlyReports.find((report) => report.fiscalDateEnding.startsWith(quarter))?.costofGoodsAndServicesSold)}
                  </td>
                ))}
              </tr>
            }


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
                {fiscalQuarters.map((quarter) => (
                  <td key={quarter}>
                    {formatNumber(quarterlyReports.find((report) => report.fiscalDateEnding.startsWith(quarter))?.grossProfit)}
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
                {fiscalQuarters.map((quarter) => (
                  <td key={quarter}>
                    {formatNumber(quarterlyReports.find((report) => report.fiscalDateEnding.startsWith(quarter))?.grossProfit)}
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
                {fiscalQuarters.map((quarter) => (
                  <td key={quarter}>
                    {formatNumber(quarterlyReports.find((report) => report.fiscalDateEnding.startsWith(quarter))?.operatingExpenses)}
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
                {fiscalQuarters.map((quarter) => (
                  <td key={quarter}>
                    {formatNumber(quarterlyReports.find((report) => report.fiscalDateEnding.startsWith(quarter))?.operatingExpenses)}
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
                {fiscalQuarters.map((quarter) => (
                  <td key={quarter}>
                    {formatNumber(quarterlyReports.find((report) => report.fiscalDateEnding.startsWith(quarter))?.operatingIncome)}
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
                {fiscalQuarters.map((quarter) => (
                  <td key={quarter}>
                    {formatNumber(quarterlyReports.find((report) => report.fiscalDateEnding.startsWith(quarter))?.operatingIncome)}
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
                {fiscalQuarters.map((quarter) => (
                  <td key={quarter}>
                    {formatNumber(quarterlyReports.find((report) => report.fiscalDateEnding.startsWith(quarter))?.otherNonOperatingIncome)}
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
                {fiscalQuarters.map((quarter) => (
                  <td key={quarter}>
                    {formatNumber(quarterlyReports.find((report) => report.fiscalDateEnding.startsWith(quarter))?.otherNonOperatingIncome)}
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
                {fiscalQuarters.map((quarter) => (
                  <td key={quarter}>
                    {formatNumber(quarterlyReports.find((report) => report.fiscalDateEnding.startsWith(quarter))?.incomeBeforeTax)}
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
                {fiscalQuarters.map((quarter) => (
                  <td key={quarter}>
                    {formatNumber(quarterlyReports.find((report) => report.fiscalDateEnding.startsWith(quarter))?.incomeBeforeTax)}
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
                {fiscalQuarters.map((quarter) => (
                  <td key={quarter}>
                    {formatNumber(quarterlyReports.find((report) => report.fiscalDateEnding.startsWith(quarter))?.incomeTaxExpense)}
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
                {fiscalQuarters.map((quarter) => (
                  <td key={quarter}>
                    {formatNumber(quarterlyReports.find((report) => report.fiscalDateEnding.startsWith(quarter))?.incomeTaxExpense)}
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
                {fiscalQuarters.map((quarter) => (
                  <td key={quarter}>
                    {formatNumber(quarterlyReports.find((report) => report.fiscalDateEnding.startsWith(quarter))?.netIncome)}
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
                {fiscalQuarters.map((quarter) => (
                  <td key={quarter}>
                    {formatNumber(quarterlyReports.find((report) => report.fiscalDateEnding.startsWith(quarter))?.netIncome)}
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
