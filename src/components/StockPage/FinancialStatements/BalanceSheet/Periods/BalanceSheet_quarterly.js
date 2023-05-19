import React, { useEffect, useState } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { getFinancialStatementsToggled } from '../../../../../actions/financialStatementsToggled'

import '../../../../../css/table.css'



export default function BalanceSheet_quarterly({ toggledMetrics, setToggledMetrics }) {
  const location = useLocation()
  const dispatch = useDispatch()
  const stock = location.state
  const quarterlyReports = stock.FinancialStatements.BalanceSheet.quarterlyReports
  const fiscalQuarters = [...new Set(quarterlyReports.map((report) => report.fiscalDateEnding.split('-')[0] + '-' + report.fiscalDateEnding.split('-')[1]))].reverse().slice(12);


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

            {toggledMetrics.toggleTotalAssets ?
              <tr id="toggled-totalAssets" onClick={() => {
                if (!toggledMetrics.toggleTotalAssets) {
                  setToggledMetrics.setToggleTotalAssets(true)
                } else {
                  setToggledMetrics.setToggleTotalAssets(false)
                }
              }}>
                <td>Total Assets</td>
                {fiscalQuarters.map((quarter) => (
                  <td key={quarter}>
                    {formatNumber(quarterlyReports.find((report) => report.fiscalDateEnding.startsWith(quarter))?.totalAssets)}
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
                {fiscalQuarters.map((quarter) => (
                  <td key={quarter}>
                    {formatNumber(quarterlyReports.find((report) => report.fiscalDateEnding.startsWith(quarter))?.totalAssets)}
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
                {fiscalQuarters.map((quarter) => (
                  <td key={quarter}>
                    {formatNumber(quarterlyReports.find((report) => report.fiscalDateEnding.startsWith(quarter))?.totalLiabilities)}
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
                {fiscalQuarters.map((quarter) => (
                  <td key={quarter}>
                    {formatNumber(quarterlyReports.find((report) => report.fiscalDateEnding.startsWith(quarter))?.totalLiabilities)}
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
                {fiscalQuarters.map((quarter) => (
                  <td key={quarter}>
                    {formatNumber(quarterlyReports.find((report) => report.fiscalDateEnding.startsWith(quarter))?.totalShareholderEquity)}
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
                {fiscalQuarters.map((quarter) => (
                  <td key={quarter}>
                    {formatNumber(quarterlyReports.find((report) => report.fiscalDateEnding.startsWith(quarter))?.totalShareholderEquity)}
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
