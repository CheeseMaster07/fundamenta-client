import React, { useEffect, useState } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'


import { getFinancialStatementsDropdown } from '../../../../../actions/financialStatementsDropdown'
import { getFinancialStatementsExtras } from '../../../../../actions/financialStatementsExtras'

import '../../../../../css/table.css'
import RowDropdown from '../../RowDropdown'
import TableRow from '../../TableRow'


export default function CashflowStatement_component({ fiscalPeriods, fiscalReports, toggledMetrics, setToggledMetrics }) {
  const location = useLocation();
  const dispatch = useDispatch();

  const financialStatementsDropdown = useSelector((state) => state.getFinancialStatementsDropdown);
  const financialStatementsExtras = useSelector((state) => state.getFinancialStatementsExtras);

  const [operatingCashflowExtras, setOperatingCashflowExtras] = useState({ YoY: false, margin: false });
  const [investingCashflowExtras, setInvestingCashflowExtras] = useState({ YoY: false, margin: false });
  const [financingCashflowExtras, setFinancingCashflowExtras] = useState({ YoY: false, margin: false });
  const [freeCashflowExtras, setFreeCashflowExtras] = useState({ YoY: false, margin: false });


  useEffect(() => {
    setOperatingCashflowExtras(financialStatementsExtras.operatingCashflowExtras)
    setInvestingCashflowExtras(financialStatementsExtras.investingCashflowExtras)
    setFinancingCashflowExtras(financialStatementsExtras.financingCashflowExtras)
    setFreeCashflowExtras(financialStatementsExtras.freeCashflowExtras)
  }, [financialStatementsExtras])


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

            {/* Cash from Operating Activities*/}

            <TableRow
              metric={'operatingCashflow'}
              metricName={'Cash from operating activities'}
              metricValue={'operatingCashflow'}
              toggledID={'toggled-operatingCashflow'}
              typeOfRow={'real-row'}
              income_expense={'income'}
              collapsible={false}
              fiscalPeriods={fiscalPeriods}
              dropdown={financialStatementsDropdown.operatingCashflowDropdown}
              setDropdown={(value) => dispatch(getFinancialStatementsDropdown({ operatingCashflowDropdown: value }))}
              reports={fiscalReports}
              extras={operatingCashflowExtras}
              setExtras={setOperatingCashflowExtras}
              toggledMetric={toggledMetrics.toggleOperatingCashflow}
              setToggledMetric={setToggledMetrics.setToggleOperatingCashflow} />

            {operatingCashflowExtras.margin ?
              <TableRow
                metric={'operatingCashflow'}
                metricName={'Cash from operating activities'}
                metricValue={'operatingCashflow'}
                toggledID={'toggled-operatingCashflowMargin'}
                typeOfRow={'margin-row'}
                fiscalPeriods={fiscalPeriods}
                dropdown={financialStatementsDropdown.operatingCashflowDropdown}
                setDropdown={(value) => dispatch(getFinancialStatementsDropdown({ operatingCashflowDropdown: value }))}
                reports={fiscalReports}
                extras={operatingCashflowExtras}
                setExtras={setOperatingCashflowExtras}
                toggledMetric={toggledMetrics.toggleOperatingCashflowMargin}
                setToggledMetric={setToggledMetrics.setToggleOperatingCashflowMargin} />

              :
              ''
            }

            {/* Cash from Investing Activities*/}
            <TableRow
              metric={'investingCashflow'}
              metricName={'Cash from investing activities'}
              metricValue={'cashflowFromInvestment'}
              toggledID={'toggled-investingCashflow'}
              typeOfRow={'real-row'}
              income_expense={'income'}
              collapsible={false}
              fiscalPeriods={fiscalPeriods}
              dropdown={financialStatementsDropdown.investingCashflowDropdown}
              setDropdown={(value) => dispatch(getFinancialStatementsDropdown({ investingCashflowDropdown: value }))}
              reports={fiscalReports}
              extras={investingCashflowExtras}
              setExtras={setInvestingCashflowExtras}
              toggledMetric={toggledMetrics.toggleInvestingCashflow}
              setToggledMetric={setToggledMetrics.setToggleInvestingCashflow} />

            {investingCashflowExtras.margin ?
              <TableRow
                metric={'investingCashflow'}
                metricName={'Cash from investing activities'}
                metricValue={'cashflowFromInvestment'}
                toggledID={'toggled-investingCashflowMargin'}
                typeOfRow={'margin-row'}
                fiscalPeriods={fiscalPeriods}
                dropdown={financialStatementsDropdown.investingCashflowDropdown}
                setDropdown={(value) => dispatch(getFinancialStatementsDropdown({ investingCashflowDropdown: value }))}
                reports={fiscalReports}
                extras={investingCashflowExtras}
                setExtras={setInvestingCashflowExtras}
                toggledMetric={toggledMetrics.toggleInvestingCashflowMargin}
                setToggledMetric={setToggledMetrics.setToggleInvestingCashflowMargin} />

              :
              ''
            }


            {/* Cash from financing activities*/}
            <TableRow
              metric={'financingCashflow'}
              metricName={'Cash from financing activities'}
              metricValue={'cashflowFromFinancing'}
              toggledID={'toggled-financingCashflow'}
              typeOfRow={'real-row'}
              income_expense={'income'}
              collapsible={false}
              fiscalPeriods={fiscalPeriods}
              dropdown={financialStatementsDropdown.financingCashflowDropdown}
              setDropdown={(value) => dispatch(getFinancialStatementsDropdown({ financingCashflowDropdown: value }))}
              reports={fiscalReports}
              extras={financingCashflowExtras}
              setExtras={setFinancingCashflowExtras}
              toggledMetric={toggledMetrics.toggleFinancingCashflow}
              setToggledMetric={setToggledMetrics.setToggleFinancingCashflow} />

            {financingCashflowExtras.margin ?
              <TableRow
                metric={'financingCashflow'}
                metricName={'Cash from financing activities'}
                metricValue={'cashflowFromFinancing'}
                toggledID={'toggled-financingCashflowMargin'}
                typeOfRow={'margin-row'}
                fiscalPeriods={fiscalPeriods}
                dropdown={financialStatementsDropdown.financingCashflowDropdown}
                setDropdown={(value) => dispatch(getFinancialStatementsDropdown({ financingCashflowDropdown: value }))}
                reports={fiscalReports}
                extras={financingCashflowExtras}
                setExtras={setFinancingCashflowExtras}
                toggledMetric={toggledMetrics.toggleFinancingCashflowMargin}
                setToggledMetric={setToggledMetrics.setToggleFinancingCashflowMargin} />

              :
              ''
            }


            {/* Free Cash Flow */}
            <TableRow
              metric={'freeCashflow'}
              metricName={'Free Cash Flow'}
              metricValue={'freeCashflow'}
              toggledID={'toggled-freeCashflow'}
              typeOfRow={'real-row'}
              income_expense={'income'}
              collapsible={false}
              fiscalPeriods={fiscalPeriods}
              dropdown={financialStatementsDropdown.freeCashflowDropdown}
              setDropdown={(value) => dispatch(getFinancialStatementsDropdown({ freeCashflowDropdown: value }))}
              reports={fiscalReports}
              extras={freeCashflowExtras}
              setExtras={setFreeCashflowExtras}
              toggledMetric={toggledMetrics.toggleFreeCashflow}
              setToggledMetric={setToggledMetrics.setToggleFreeCashflow} />

            {freeCashflowExtras.margin ?
              <TableRow
                metric={'freeCashflow'}
                metricName={'Free Cash Flow'}
                metricValue={'freeCashflow'}
                toggledID={'toggled-freeCashflowMargin'}
                typeOfRow={'margin-row'}
                fiscalPeriods={fiscalPeriods}
                dropdown={financialStatementsDropdown.freeCashflowDropdown}
                setDropdown={(value) => dispatch(getFinancialStatementsDropdown({ freeCashflowDropdown: value }))}
                reports={fiscalReports}
                extras={freeCashflowExtras}
                setExtras={setFreeCashflowExtras}
                toggledMetric={toggledMetrics.toggleFreeCashflowMargin}
                setToggledMetric={setToggledMetrics.setToggleFreeCashflowMargin} />

              :
              ''
            }

          </tbody>
        </table>
      </div>


    </>
  )
}
