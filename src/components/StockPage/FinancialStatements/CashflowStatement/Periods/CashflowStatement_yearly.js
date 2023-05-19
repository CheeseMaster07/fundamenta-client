import React, { useEffect, useState } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'


import { getFinancialStatementsToggled } from '../../../../../actions/financialStatementsToggled'

import '../../../../../css/table.css'


export default function CashflowStatement_yearly({ toggledMetrics, setToggledMetrics }) {
  const dispatch = useDispatch()
  const location = useLocation()
  const stock = location.state
  const fiscalYears = [...new Set(stock.FinancialStatements.CashflowStatement.annualReports.map((report) => report.fiscalDateEnding.split('-')[0]))];
  fiscalYears.reverse()
  console.log(fiscalYears)




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
                {fiscalYears.map((year) => (
                  <td key={year}>
                    {formatNumber(stock.FinancialStatements.CashflowStatement.annualReports.find((report) => report.fiscalDateEnding.startsWith(year))?.operatingCashflow)}
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
                {fiscalYears.map((year) => (
                  <td key={year}>
                    {formatNumber(stock.FinancialStatements.CashflowStatement.annualReports.find((report) => report.fiscalDateEnding.startsWith(year))?.operatingCashflow)}
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
                {fiscalYears.map((year) => (
                  <td key={year}>
                    {formatNumber(stock.FinancialStatements.CashflowStatement.annualReports.find((report) => report.fiscalDateEnding.startsWith(year))?.cashflowFromInvestment)}
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
                {fiscalYears.map((year) => (
                  <td key={year}>
                    {formatNumber(stock.FinancialStatements.CashflowStatement.annualReports.find((report) => report.fiscalDateEnding.startsWith(year))?.cashflowFromInvestment)}
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
                {fiscalYears.map((year) => (
                  <td key={year}>
                    {formatNumber(stock.FinancialStatements.CashflowStatement.annualReports.find((report) => report.fiscalDateEnding.startsWith(year))?.cashflowFromFinancing)}
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
                {fiscalYears.map((year) => (
                  <td key={year}>
                    {formatNumber(stock.FinancialStatements.CashflowStatement.annualReports.find((report) => report.fiscalDateEnding.startsWith(year))?.cashflowFromFinancing)}
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
                {fiscalYears.map((year) => (
                  <td key={year}>
                    {formatNumber(stock.FinancialStatements.CashflowStatement.annualReports.find((report) => report.fiscalDateEnding.startsWith(year))?.freeCashflow)}
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
                {fiscalYears.map((year) => (
                  <td key={year}>
                    {formatNumber(stock.FinancialStatements.CashflowStatement.annualReports.find((report) => report.fiscalDateEnding.startsWith(year))?.freeCashflow)}
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
