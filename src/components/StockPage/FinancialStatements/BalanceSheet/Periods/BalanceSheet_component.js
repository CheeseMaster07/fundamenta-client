import React, { useEffect, useState } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { getFinancialStatementsToggled } from '../../../../../actions/financialStatementsToggled'
import { getFinancialStatementsDropdown } from '../../../../../actions/financialStatementsDropdown'

import TableRow from '../../TableRow'

import '../../../../../css/table.css'


export default function BalanceSheet_yearly({ fiscalPeriods, fiscalReports, toggledMetrics, setToggledMetrics }) {
  const location = useLocation();
  const dispatch = useDispatch();

  const financialStatementsDropdown = useSelector((state) => state.getFinancialStatementsDropdown);
  const financialStatementsExtras = useSelector((state) => state.getFinancialStatementsExtras);

  const [totalAssetsExtras, setTotalAssetsExtras] = useState({ YoY: false, margin: false });
  const [totalLiabilitiesExtras, setTotalLiabilitiesExtras] = useState({ YoY: false, margin: false });
  const [totalEquityExtras, setTotalEquityExtras] = useState({ YoY: false, margin: false });


  useEffect(() => {
    setTotalAssetsExtras(financialStatementsExtras.totalAssetsExtras)
    setTotalLiabilitiesExtras(financialStatementsExtras.totalLiabilitiesExtras)
    setTotalEquityExtras(financialStatementsExtras.totalEquityExtras)

  }, [financialStatementsExtras])


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


  return (
    <>
      <div className="table-div">
        <table className={fiscalPeriods.length > 6 ? "table-quarterly" : "table"}>
          <thead>


            <tr>
              <th className="first-column">Currency: USD</th>
              {fiscalPeriods.map((period) => {
                console.log(period)

                if (period.length > 4) {
                  const [year, month] = period.split('-');
                  let quarter;

                  if (month === '01' || month === '02' || month === '03') {
                    quarter = 'Q1';
                  } else if (month === '04' || month === '05' || month === '06') {
                    quarter = 'Q2';
                  } else if (month === '07' || month === '08' || month === '09') {
                    quarter = 'Q3';
                  } else {
                    quarter = 'Q4';
                  }

                  const formattedPeriod = `${quarter} ${year}`;
                  return (
                    <th className="other-columns" key={period}>{formattedPeriod}</th>
                  );
                }

                return (
                  <th className="other-columns" key={period}>{period}</th>
                );
              })}
            </tr>
          </thead>
          <tbody>

            {/* Total Assets */}

            <TableRow
              metric={'totalAssets'}
              metricName={'Total Assets'}
              metricValue={'totalAssets'}
              toggledID={'toggled-totalAssets'}
              typeOfRow={'real-row'}
              income_expense={'income'}
              collapsible={false}
              fiscalPeriods={fiscalPeriods}
              dropdown={financialStatementsDropdown.totalAssetsDropdown}
              setDropdown={(value) => dispatch(getFinancialStatementsDropdown({ totalAssetsDropdown: value }))}
              reports={fiscalReports}
              extras={totalAssetsExtras}
              setExtras={setTotalAssetsExtras}
              toggledMetric={toggledMetrics.toggleTotalAssets}
              setToggledMetric={setToggledMetrics.setToggleTotalAssets} />


            {/* Total Liabilities */}
            <TableRow
              metric={'totalLiabilities'}
              metricName={'Total Liabilities'}
              metricValue={'totalLiabilities'}
              toggledID={'toggled-totalLiabilities'}
              typeOfRow={'real-row'}
              income_expense={'income'}
              collapsible={false}
              fiscalPeriods={fiscalPeriods}
              dropdown={financialStatementsDropdown.totalLiabilitiesDropdown}
              setDropdown={(value) => dispatch(getFinancialStatementsDropdown({ totalLiabilitiesDropdown: value }))}
              reports={fiscalReports}
              extras={totalLiabilitiesExtras}
              setExtras={setTotalLiabilitiesExtras}
              toggledMetric={toggledMetrics.toggleTotalLiabilities}
              setToggledMetric={setToggledMetrics.setToggleTotalLiabilities} />



            {/* Total Equity */}
            <TableRow
              metric={'totalEquity'}
              metricName={'Total Equity'}
              metricValue={'totalShareholderEquity'}
              toggledID={'toggled-totalEquity'}
              typeOfRow={'real-row'}
              income_expense={'income'}
              collapsible={false}
              fiscalPeriods={fiscalPeriods}
              dropdown={financialStatementsDropdown.totalEquityDropdown}
              setDropdown={(value) => dispatch(getFinancialStatementsDropdown({ totalEquityDropdown: value }))}
              reports={fiscalReports}
              extras={totalEquityExtras}
              setExtras={setTotalEquityExtras}
              toggledMetric={toggledMetrics.toggleTotalEquity}
              setToggledMetric={setToggledMetrics.setToggleTotalEquity} />

          </tbody>
        </table>

      </div>
    </>
  )
}
