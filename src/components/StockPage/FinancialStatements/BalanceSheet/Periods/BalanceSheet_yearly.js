import React, { useEffect, useState } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { getFinancialStatementsToggled } from '../../../../../actions/financialStatementsToggled'

import '../../../../../css/table.css'


export default function BalanceSheet_yearly({ toggledMetrics, setToggledMetrics }) {
  const location = useLocation()
  const dispatch = useDispatch()
  const stock = location.state
  const fiscalYears = [...new Set(stock.FinancialStatements.BalanceSheet.annualReports.map((report) => report.fiscalDateEnding.split('-')[0]))];
  fiscalYears.reverse()




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

            {toggledMetrics.toggleTotalAssets ?
              <tr id="toggled-totalAssets" onClick={() => {
                if (!toggledMetrics.toggleTotalAssets) {
                  setToggledMetrics.setToggleTotalAssets(true)
                } else {
                  setToggledMetrics.setToggleTotalAssets(false)
                }
              }}>
                <td>Total Assets</td>
                {fiscalYears.map((year) => (
                  <td key={year}>
                    {formatNumber(stock.FinancialStatements.BalanceSheet.annualReports.find((report) => report.fiscalDateEnding.startsWith(year))?.totalAssets)}
                  </td>
                ))}
              </tr>
              :
              <tr onClick={() => {
                if (!toggledMetrics.toggleTotalAssets) {
                  setToggledMetrics.setToggleTotalAssets(true)
                } else {
                  setToggledMetrics.setToggleTotalAssets(false)
                }
              }}>
                <td>Total Assets</td>
                {fiscalYears.map((year) => (
                  <td key={year}>
                    {formatNumber(stock.FinancialStatements.BalanceSheet.annualReports.find((report) => report.fiscalDateEnding.startsWith(year))?.totalAssets)}
                  </td>
                ))}
              </tr>
            }

            {toggledMetrics.toggleTotalLiabilities ?
              <tr id="toggled-totalLiabilities" onClick={() => {
                if (!toggledMetrics.toggleTotalLiabilities) {
                  setToggledMetrics.setToggleTotalLiabilities(true)
                } else {
                  setToggledMetrics.setToggleTotalLiabilities(false)
                }
              }}>
                <td>Total Liabilities</td>
                {fiscalYears.map((year) => (
                  <td key={year}>
                    {formatNumber(stock.FinancialStatements.BalanceSheet.annualReports.find((report) => report.fiscalDateEnding.startsWith(year))?.totalLiabilities)}
                  </td>
                ))}
              </tr>
              :
              <tr onClick={() => {
                if (!toggledMetrics.toggleTotalLiabilities) {
                  setToggledMetrics.setToggleTotalLiabilities(true)
                } else {
                  setToggledMetrics.setToggleTotalLiabilities(false)
                }
              }}>
                <td>Total Liabilities</td>
                {fiscalYears.map((year) => (
                  <td key={year}>
                    {formatNumber(stock.FinancialStatements.BalanceSheet.annualReports.find((report) => report.fiscalDateEnding.startsWith(year))?.totalLiabilities)}
                  </td>
                ))}
              </tr>
            }


            {toggledMetrics.toggleTotalEquity ?
              <tr id="toggled-totalEquity" onClick={() => {
                if (!toggledMetrics.toggleTotalEquity) {
                  setToggledMetrics.setToggleTotalEquity(true)
                } else {
                  setToggledMetrics.setToggleTotalEquity(false)
                }
              }}>
                <td>Total Equity</td>
                {fiscalYears.map((year) => (
                  <td key={year}>
                    {formatNumber(stock.FinancialStatements.BalanceSheet.annualReports.find((report) => report.fiscalDateEnding.startsWith(year))?.totalShareholderEquity)}
                  </td>
                ))}
              </tr>
              :
              <tr onClick={() => {
                if (!toggledMetrics.toggleTotalEquity) {
                  setToggledMetrics.setToggleTotalEquity(true)
                } else {
                  setToggledMetrics.setToggleTotalEquity(false)
                }
              }}>
                <td>Total Equity</td>
                {fiscalYears.map((year) => (
                  <td key={year}>
                    {formatNumber(stock.FinancialStatements.BalanceSheet.annualReports.find((report) => report.fiscalDateEnding.startsWith(year))?.totalShareholderEquity)}
                  </td>
                ))}
              </tr>
            }



            {/* add more rows for other financial metrics */}
          </tbody>
        </table>

      </div>
    </>
  )
}
