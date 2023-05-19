import React, { useEffect, useState } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'


import { getFinancialStatementsToggled } from '../../../../../actions/financialStatementsToggled'

import '../../../../../css/table.css'


export default function CashflowStatement_quarterly({ toggledMetrics, setToggledMetrics }) {
  const dispatch = useDispatch()
  const location = useLocation()
  const stock = location.state
  const quarterlyReports = stock.FinancialStatements.CashflowStatement.quarterlyReports
  const fiscalQuarters = [...new Set(stock.FinancialStatements.CashflowStatement.quarterlyReports.map((report) => report.fiscalDateEnding.split('-')[0] + '-' + report.fiscalDateEnding.split('-')[1]))].reverse().slice(12);

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

            {/* Cash from Operating Activities*/}
            {toggledMetrics.toggleOperatingCashflow ?
              <tr id="toggled-operatingCashflow" onClick={() => {
                if (!toggledMetrics.toggleOperatingCashflow) {
                  setToggledMetrics.setToggleOperatingCashflow(true)
                } else {
                  setToggledMetrics.setToggleOperatingCashflow(false)
                }
              }}>
                <td>Cash from operating activities</td>
                {fiscalQuarters.map((quarter) => (
                  <td key={quarter}>
                    {formatNumber(quarterlyReports.find((report) => report.fiscalDateEnding.startsWith(quarter))?.operatingCashflow)}
                  </td>
                ))}
              </tr>
              :
              <tr onClick={() => {
                if (!toggledMetrics.toggleOperatingCashflow) {
                  setToggledMetrics.setToggleOperatingCashflow(true)
                } else {
                  setToggledMetrics.setToggleOperatingCashflow(false)
                }
              }}>
                <td>Cash from operating activities</td>
                {fiscalQuarters.map((quarter) => (
                  <td key={quarter}>
                    {formatNumber(quarterlyReports.find((report) => report.fiscalDateEnding.startsWith(quarter))?.operatingCashflow)}
                  </td>
                ))}
              </tr>
            }

            {/* Cash from Investing Activities*/}

            {toggledMetrics.toggleInvestingCashflow ?
              <tr id="toggled-investingCashflow" onClick={() => {
                if (!toggledMetrics.toggleInvestingCashflow) {
                  setToggledMetrics.setToggleInvestingCashflow(true)
                } else {
                  setToggledMetrics.setToggleInvestingCashflow(false)
                }
              }}>
                <td>Cash from investing activities</td>
                {fiscalQuarters.map((quarter) => (
                  <td key={quarter}>
                    {formatNumber(quarterlyReports.find((report) => report.fiscalDateEnding.startsWith(quarter))?.cashflowFromInvestment)}
                  </td>
                ))}
              </tr>
              :
              <tr onClick={() => {
                if (!toggledMetrics.toggleInvestingCashflow) {
                  setToggledMetrics.setToggleInvestingCashflow(true)
                } else {
                  setToggledMetrics.setToggleInvestingCashflow(false)
                }
              }}>
                <td>Cash from investing activities</td>
                {fiscalQuarters.map((quarter) => (
                  <td key={quarter}>
                    {formatNumber(quarterlyReports.find((report) => report.fiscalDateEnding.startsWith(quarter))?.cashflowFromInvestment)}
                  </td>
                ))}
              </tr>
            }

            {/* Cash from financing activities*/}
            {toggledMetrics.toggleFinancingCashflow ?
              <tr id="toggled-financingCashflow" onClick={() => {
                if (!toggledMetrics.toggleFinancingCashflow) {
                  setToggledMetrics.setToggleFinancingCashflow(true)
                } else {
                  setToggledMetrics.setToggleFinancingCashflow(false)
                }
              }}>
                <td>Cash from financing activities</td>
                {fiscalQuarters.map((quarter) => (
                  <td key={quarter}>
                    {formatNumber(quarterlyReports.find((report) => report.fiscalDateEnding.startsWith(quarter))?.cashflowFromFinancing)}
                  </td>
                ))}
              </tr>
              :
              <tr onClick={() => {
                if (!toggledMetrics.toggleFinancingCashflow) {
                  setToggledMetrics.setToggleFinancingCashflow(true)
                } else {
                  setToggledMetrics.setToggleFinancingCashflow(false)
                }
              }}>
                <td>Cash from financing activities</td>
                {fiscalQuarters.map((quarter) => (
                  <td key={quarter}>
                    {formatNumber(quarterlyReports.find((report) => report.fiscalDateEnding.startsWith(quarter))?.cashflowFromFinancing)}
                  </td>
                ))}
              </tr>
            }


            {/* Free Cash Flow */}
            {toggledMetrics.toggleFreeCashflow ?
              <tr id="toggled-freeCashflow" onClick={() => {
                if (!toggledMetrics.toggleFreeCashflow) {
                  setToggledMetrics.setToggleFreeCashflow(true)
                } else {
                  setToggledMetrics.setToggleFreeCashflow(false)
                }
              }}>
                <td>Free Cash Flow</td>
                {fiscalQuarters.map((quarter) => (
                  <td key={quarter}>
                    {formatNumber(quarterlyReports.find((report) => report.fiscalDateEnding.startsWith(quarter))?.freeCashflow)}
                  </td>
                ))}
              </tr>
              :
              <tr onClick={() => {
                if (!toggledMetrics.toggleFreeCashflow) {
                  setToggledMetrics.setToggleFreeCashflow(true)
                } else {
                  setToggledMetrics.setToggleFreeCashflow(false)
                }
              }}>
                <td>Free Cash Flow</td>
                {fiscalQuarters.map((quarter) => (
                  <td key={quarter}>
                    {formatNumber(quarterlyReports.find((report) => report.fiscalDateEnding.startsWith(quarter))?.freeCashflow)}
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
