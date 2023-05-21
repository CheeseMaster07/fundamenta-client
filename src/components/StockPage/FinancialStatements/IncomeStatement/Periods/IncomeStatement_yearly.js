import React, { useEffect, useState } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'


import { getFinancialStatementsDropdown } from '../../../../../actions/financialStatementsDropdown'
import { getFinancialStatementsExtras } from '../../../../../actions/financialStatementsExtras'

import RowDropdown from '../../RowDropdown'
import TableRow from '../../TableRow'



export default function IncomeStatement_yearly({ toggledMetrics, setToggledMetrics }) {
  const location = useLocation();
  const dispatch = useDispatch();

  const financialStatementsDropdown = useSelector((state) => state.getFinancialStatementsDropdown);

  const [totalRevenueExtras, setTotalRevenueExtras] = useState({ YoY: false, margin: false });
  const [costOfGoodsAndServicesSoldExtras, setCostOfGoodsAndServicesSoldExtras] = useState({ YoY: false, margin: false });


  const stock = location.state;
  const annualReports = stock.FinancialStatements.IncomeStatement.annualReports;

  const fiscalYears = [...new Set(annualReports.map((report) => report.fiscalDateEnding.split('-')[0]))];
  fiscalYears.reverse();


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
              metric={'totalRevenue'}
              metricName={'Total Revenue'}
              metricValue={'totalRevenue'}
              toggledID={'toggled-totalRevenue'}
              typeOfRow={'real-row'}
              fiscalPeriods={fiscalYears}
              dropdown={financialStatementsDropdown.totalRevenueDropdown}
              setDropdown={(value) => dispatch(getFinancialStatementsDropdown({ totalRevenueDropdown: value }))}
              reports={annualReports}
              extras={totalRevenueExtras}
              setExtras={setTotalRevenueExtras}
              toggledMetric={toggledMetrics.toggleTotalRevenue}
              setToggledMetric={setToggledMetrics.setToggleTotalRevenue} />

            {totalRevenueExtras.YoY ?
              <TableRow
                metric={'totalRevenue'}
                metricName={'Total Revenue'}
                metricValue={'totalRevenue'}
                toggledID={'toggled-totalRevenue'}
                typeOfRow={'YoY-row'}
                fiscalPeriods={fiscalYears}
                dropdown={financialStatementsDropdown.totalRevenueDropdown}
                setDropdown={(value) => dispatch(getFinancialStatementsDropdown({ totalRevenueDropdown: value }))}
                reports={annualReports}
                extras={totalRevenueExtras}
                setExtras={setTotalRevenueExtras}
                toggledMetric={toggledMetrics.toggleTotalRevenue}
                setToggledMetric={setToggledMetrics.setToggleTotalRevenue} />

              :
              ''
            }

            {/* Cost of Goods and Services sold */}
            <TableRow
              metric={'costofGoodsAndServicesSold'}
              metricName={'Cost of Goods and Services Sold'}
              metricValue={'costofGoodsAndServicesSold'}
              toggledID={'toggled-costofGoodsAndServicesSold'}
              typeOfRow={'real-row'}

              fiscalPeriods={fiscalYears}
              dropdown={financialStatementsDropdown.costOfGoodsAndServicesSoldDropdown}
              setDropdown={(value) => dispatch(getFinancialStatementsDropdown({ costOfGoodsAndServicesSoldDropdown: value }))}
              reports={annualReports}
              extras={costOfGoodsAndServicesSoldExtras}
              setExtras={setCostOfGoodsAndServicesSoldExtras}
              toggledMetric={toggledMetrics.toggleCostOfGoodsAndServicesSold}
              setToggledMetric={setToggledMetrics.setToggleCostOfGoodsAndServicesSold} />



            {/* Gross Profit */}
            <TableRow
              metric={'grossProfit'}
              metricName={'Gross Profit'}
              metricValue={'grossProfit'}
              toggledID={'toggled-toggleGrossProfit'}
              typeOfRow={'real-row'}

              fiscalPeriods={fiscalYears}
              dropdown={financialStatementsDropdown.grossProfitDropdown}
              setDropdown={(value) => dispatch(getFinancialStatementsDropdown({ grossProfitDropdown: value }))}
              reports={annualReports}
              extras={costOfGoodsAndServicesSoldExtras}
              setExtras={setCostOfGoodsAndServicesSoldExtras}
              toggledMetric={toggledMetrics.toggleGrossProfit}
              setToggledMetric={setToggledMetrics.setToggleGrossProfit} />



            {/* Operating Expenses */}
            <TableRow
              metric={'operatingExpenses'}
              metricName={'Operating Expenses'}
              metricValue={'operatingExpenses'}
              toggledID={'toggled-toggleOperatingExpenses'}
              typeOfRow={'real-row'}

              fiscalPeriods={fiscalYears}
              dropdown={financialStatementsDropdown.operatingExpensesDropdown}
              setDropdown={(value) => dispatch(getFinancialStatementsDropdown({ operatingExpensesDropdown: value }))}
              reports={annualReports}
              extras={costOfGoodsAndServicesSoldExtras}
              setExtras={setCostOfGoodsAndServicesSoldExtras}
              toggledMetric={toggledMetrics.toggleOperatingExpenses}
              setToggledMetric={setToggledMetrics.setToggleOperatingExpenses} />


            {/* Operating Income */}
            <TableRow
              metric={'operatingIncome'}
              metricName={'Operating Income'}
              metricValue={'operatingIncome'}
              toggledID={'toggled-operatingIncome'}
              typeOfRow={'real-row'}

              fiscalPeriods={fiscalYears}
              dropdown={financialStatementsDropdown.operatingIncomeDropdown}
              setDropdown={(value) => dispatch(getFinancialStatementsDropdown({ operatingIncomeDropdown: value }))}
              reports={annualReports}
              extras={costOfGoodsAndServicesSoldExtras}
              setExtras={setCostOfGoodsAndServicesSoldExtras}
              toggledMetric={toggledMetrics.toggleOperatingIncome}
              setToggledMetric={setToggledMetrics.setToggleOperatingIncome} />


            {/* Non-operating income */}
            <TableRow
              metric={'nonOperatingIncome'}
              metricName={'Non Operating Income'}
              metricValue={'otherNonOperatingIncome'}
              toggledID={'toggled-otherNonOperatingIncome'}
              typeOfRow={'real-row'}

              fiscalPeriods={fiscalYears}
              dropdown={financialStatementsDropdown.nonOperatingIncomeDropdown}
              setDropdown={(value) => dispatch(getFinancialStatementsDropdown({ nonOperatingIncomeDropdown: value }))}
              reports={annualReports}
              extras={costOfGoodsAndServicesSoldExtras}
              setExtras={setCostOfGoodsAndServicesSoldExtras}
              toggledMetric={toggledMetrics.toggleNonOperatingIncome}
              setToggledMetric={setToggledMetrics.setToggleNonOperatingIncome} />


            {/* Pretax Income */}
            <TableRow
              metric={'pretaxIncome'}
              metricName={'Pretax Income'}
              metricValue={'incomeBeforeTax'}
              toggledID={'toggled-incomeBeforeTax'}
              typeOfRow={'real-row'}

              fiscalPeriods={fiscalYears}
              dropdown={financialStatementsDropdown.pretaxIncomeDropdown}
              setDropdown={(value) => dispatch(getFinancialStatementsDropdown({ pretaxIncomeDropdown: value }))}
              reports={annualReports}
              extras={costOfGoodsAndServicesSoldExtras}
              setExtras={setCostOfGoodsAndServicesSoldExtras}
              toggledMetric={toggledMetrics.togglePretaxIncome}
              setToggledMetric={setToggledMetrics.setTogglePretaxIncome} />


            {/* Taxes */}
            <TableRow
              metric={'taxes'}
              metricName={'Taxes'}
              metricValue={'incomeTaxExpense'}
              toggledID={'toggled-taxes'}
              typeOfRow={'real-row'}

              fiscalPeriods={fiscalYears}
              dropdown={financialStatementsDropdown.taxesDropdown}
              setDropdown={(value) => dispatch(getFinancialStatementsDropdown({ taxesDropdown: value }))}
              reports={annualReports}
              extras={costOfGoodsAndServicesSoldExtras}
              setExtras={setCostOfGoodsAndServicesSoldExtras}
              toggledMetric={toggledMetrics.toggleTaxes}
              setToggledMetric={setToggledMetrics.setToggleTaxes} />


            {/* Net Income */}
            <TableRow
              metric={'netIncome'}
              metricName={'Net Income'}
              metricValue={'netIncome'}
              toggledID={'toggled-netIncome'}
              typeOfRow={'real-row'}

              fiscalPeriods={fiscalYears}
              dropdown={financialStatementsDropdown.netIncomeDropdown}
              setDropdown={(value) => dispatch(getFinancialStatementsDropdown({ netIncomeDropdown: value }))}
              reports={annualReports}
              extras={costOfGoodsAndServicesSoldExtras}
              setExtras={setCostOfGoodsAndServicesSoldExtras}
              toggledMetric={toggledMetrics.toggleNetIncome}
              setToggledMetric={setToggledMetrics.setToggleNetIncome} />


          </tbody>
        </table>
      </div>

    </>
  )
}
