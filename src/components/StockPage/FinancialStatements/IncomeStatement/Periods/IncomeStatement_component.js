import React, { useEffect, useState } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'


import { getFinancialStatementsDropdown } from '../../../../../actions/financialStatementsDropdown'
import { getFinancialStatementsExtras } from '../../../../../actions/financialStatementsExtras'

import RowDropdown from '../../RowDropdown'
import TableRow from '../../TableRow'



export default function IncomeStatement_component({ fiscalPeriods, fiscalReports, toggledMetrics, setToggledMetrics }) {
  const location = useLocation();
  const dispatch = useDispatch();

  const financialStatementsDropdown = useSelector((state) => state.getFinancialStatementsDropdown);
  const financialStatementsExtras = useSelector((state) => state.getFinancialStatementsExtras);

  const [totalRevenueExtras, setTotalRevenueExtras] = useState({ YoY: false, margin: false });
  const [costOfGoodsAndServicesSoldExtras, setCostOfGoodsAndServicesSoldExtras] = useState({ YoY: false, margin: false });
  const [grossProfitExtras, setGrossProfitExtras] = useState({ YoY: false, margin: false });
  const [operatingExpensesExtras, setOperatingExpensesExtras] = useState({ YoY: false, margin: false });
  const [operatingIncomeExtras, setOperatingIncomeExtras] = useState({ YoY: false, margin: false });
  const [nonOperatingIncomeExtras, setNonOperatingIncomeExtras] = useState({ YoY: false, margin: false });
  const [pretaxIncomeExtras, setPretaxIncomeExtras] = useState({ YoY: false, margin: false });
  const [taxesExtras, setTaxesExtras] = useState({ YoY: false, margin: false });
  const [netIncomeExtras, setNetIncomeExtras] = useState({ YoY: false, margin: false });



  useEffect(() => {
    setTotalRevenueExtras(financialStatementsExtras.totalRevenueExtras)
    setCostOfGoodsAndServicesSoldExtras(financialStatementsExtras.costOfGoodsAndServicesSoldExtras)
    setGrossProfitExtras(financialStatementsExtras.grossProfitExtras)
    setOperatingExpensesExtras(financialStatementsExtras.operatingExpensesExtras)
    setOperatingIncomeExtras(financialStatementsExtras.operatingIncomeExtras)
    setNonOperatingIncomeExtras(financialStatementsExtras.nonOperatingIncomeExtras)
    setPretaxIncomeExtras(financialStatementsExtras.pretaxIncomeExtras)
    setTaxesExtras(financialStatementsExtras.taxesExtras)
    setNetIncomeExtras(financialStatementsExtras.netIncomeExtras)
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

  //console.log(stock.FinancialStatements.IncomeStatement.TotalRevenue.find({ date: '2020' }))
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


            {/* Total Revenue*/}
            <TableRow
              metric={'totalRevenue'}
              metricName={'Total Revenue'}
              metricValue={'totalRevenue'}
              toggledID={'toggled-totalRevenue'}
              typeOfRow={'real-row'}
              income_expense={'income'}
              collapsible={false}
              fiscalPeriods={fiscalPeriods}
              dropdown={financialStatementsDropdown.totalRevenueDropdown}
              setDropdown={(value) => dispatch(getFinancialStatementsDropdown({ totalRevenueDropdown: value }))}
              reports={fiscalReports}
              extras={totalRevenueExtras}
              setExtras={setTotalRevenueExtras}
              toggledMetric={toggledMetrics.toggleTotalRevenue}
              setToggledMetric={setToggledMetrics.setToggleTotalRevenue} />

            {totalRevenueExtras.YoY ?
              <TableRow
                metric={'totalRevenue'}
                metricName={'Total Revenue'}
                metricValue={'totalRevenue'}
                toggledID={'toggled-totalRevenueYoY'}
                typeOfRow={'YoY-row'}
                fiscalPeriods={fiscalPeriods}
                dropdown={financialStatementsDropdown.totalRevenueDropdown}
                setDropdown={(value) => dispatch(getFinancialStatementsDropdown({ totalRevenueDropdown: value }))}
                reports={fiscalReports}
                extras={totalRevenueExtras}
                setExtras={setTotalRevenueExtras}
                toggledMetric={toggledMetrics.toggleTotalRevenueYoY}
                setToggledMetric={setToggledMetrics.setToggleTotalRevenueYoY} />

              :
              ''
            }



            {/* Cost of Goods and Services sold */}
            <TableRow
              metric={'costOfGoodsAndServicesSold'}
              metricName={'Cost of Goods and Services Sold'}
              metricValue={'costofGoodsAndServicesSold'}
              toggledID={'toggled-costofGoodsAndServicesSold'}
              typeOfRow={'real-row'}
              income_expense={'expense'}
              collapsible={true}
              fiscalPeriods={fiscalPeriods}
              dropdown={financialStatementsDropdown.costOfGoodsAndServicesSoldDropdown}
              setDropdown={(value) => dispatch(getFinancialStatementsDropdown({ costOfGoodsAndServicesSoldDropdown: value }))}
              reports={fiscalReports}
              extras={costOfGoodsAndServicesSoldExtras}
              setExtras={setCostOfGoodsAndServicesSoldExtras}
              toggledMetric={toggledMetrics.toggleCostOfGoodsAndServicesSold}
              setToggledMetric={setToggledMetrics.setToggleCostOfGoodsAndServicesSold}
              toggleSubrows={toggledMetrics.toggleCostOfGoodsAndServicesSoldSubrows}
              setToggleSubrows={setToggledMetrics.setToggleCostOfGoodsAndServicesSoldSubrows} />

            {costOfGoodsAndServicesSoldExtras.YoY ?
              <TableRow
                metric={'costOfGoodsAndServicesSold'}
                metricName={'Cost of Goods and Services Sold'}
                metricValue={'costofGoodsAndServicesSold'}
                toggledID={'toggled-costofGoodsAndServicesSoldYoY'}
                typeOfRow={'YoY-row'}
                fiscalPeriods={fiscalPeriods}
                dropdown={financialStatementsDropdown.costOfGoodsAndServicesSoldDropdown}
                setDropdown={(value) => dispatch(getFinancialStatementsDropdown({ costOfGoodsAndServicesSoldDropdown: value }))}
                reports={fiscalReports}
                extras={costOfGoodsAndServicesSoldExtras}
                setExtras={setCostOfGoodsAndServicesSoldExtras}
                toggledMetric={toggledMetrics.toggleCostOfGoodsAndServicesSoldYoY}
                setToggledMetric={setToggledMetrics.setToggleCostOfGoodsAndServicesSoldYoY} />

              :
              ''
            }

            {costOfGoodsAndServicesSoldExtras.margin ?
              <TableRow
                metric={'costOfGoodsAndServicesSold'}
                metricName={'Cost of Goods and Services Sold'}
                metricValue={'costofGoodsAndServicesSold'}
                toggledID={'toggled-costofGoodsAndServicesSoldMargin'}
                typeOfRow={'margin-row'}
                fiscalPeriods={fiscalPeriods}
                dropdown={financialStatementsDropdown.costOfGoodsAndServicesSoldDropdown}
                setDropdown={(value) => dispatch(getFinancialStatementsDropdown({ costOfGoodsAndServicesSoldDropdown: value }))}
                reports={fiscalReports}
                extras={costOfGoodsAndServicesSoldExtras}
                setExtras={setCostOfGoodsAndServicesSoldExtras}
                toggledMetric={toggledMetrics.toggleCostOfGoodsAndServicesSoldMargin}
                setToggledMetric={setToggledMetrics.setToggleCostOfGoodsAndServicesSoldMargin} />

              :
              ''
            }

            {toggledMetrics.toggleCostOfGoodsAndServicesSoldSubrows ?

              <TableRow
                metric={'depreciationAndAmortization'}
                metricName={'Depreciation and Amortization'}
                metricValue={'depreciationAndAmortization'}
                toggledID={'toggled-costofGoodsAndServicesSoldMargin'}
                typeOfRow={'real-row'}
                income_expense={'expense'}
                isSubrow={true}
                collapsible={false}
                fiscalPeriods={fiscalPeriods}
                dropdown={financialStatementsDropdown.costOfGoodsAndServicesSoldDropdown}
                setDropdown={(value) => dispatch(getFinancialStatementsDropdown({ costOfGoodsAndServicesSoldDropdown: value }))}
                reports={fiscalReports}
                extras={costOfGoodsAndServicesSoldExtras}
                setExtras={setCostOfGoodsAndServicesSoldExtras}
                toggledMetric={toggledMetrics.toggleCostOfGoodsAndServicesSoldMargin}
                setToggledMetric={setToggledMetrics.setToggleCostOfGoodsAndServicesSoldMargin} />

              :
              ''
            }



            {/* Gross Profit */}
            <TableRow
              metric={'grossProfit'}
              metricName={'Gross Profit'}
              metricValue={'grossProfit'}
              toggledID={'toggled-toggleGrossProfit'}
              typeOfRow={'real-row'}
              income_expense={'income'}
              collapsible={false}
              fiscalPeriods={fiscalPeriods}
              dropdown={financialStatementsDropdown.grossProfitDropdown}
              setDropdown={(value) => dispatch(getFinancialStatementsDropdown({ grossProfitDropdown: value }))}
              reports={fiscalReports}
              extras={grossProfitExtras}
              setExtras={setGrossProfitExtras}
              toggledMetric={toggledMetrics.toggleGrossProfit}
              setToggledMetric={setToggledMetrics.setToggleGrossProfit} />

            {grossProfitExtras.YoY ?
              <TableRow
                metric={'grossProfit'}
                metricName={'Gross Profit'}
                metricValue={'grossProfit'}
                toggledID={'toggled-toggleGrossProfitYoY'}
                typeOfRow={'YoY-row'}
                fiscalPeriods={fiscalPeriods}
                dropdown={financialStatementsDropdown.grossProfitDropdown}
                setDropdown={(value) => dispatch(getFinancialStatementsDropdown({ grossProfitDropdown: value }))}
                reports={fiscalReports}
                extras={grossProfitExtras}
                setExtras={setGrossProfitExtras}
                toggledMetric={toggledMetrics.toggleGrossProfitYoY}
                setToggledMetric={setToggledMetrics.setToggleGrossProfitYoY} />

              :
              ''
            }

            {grossProfitExtras.margin ?
              <TableRow
                metric={'grossProfit'}
                metricName={'Gross Profit'}
                metricValue={'grossProfit'}
                toggledID={'toggled-toggleGrossProfitMargin'}
                typeOfRow={'margin-row'}
                fiscalPeriods={fiscalPeriods}
                dropdown={financialStatementsDropdown.grossProfitDropdown}
                setDropdown={(value) => dispatch(getFinancialStatementsDropdown({ grossProfitDropdown: value }))}
                reports={fiscalReports}
                extras={grossProfitExtras}
                setExtras={setGrossProfitExtras}
                toggledMetric={toggledMetrics.toggleGrossProfitMargin}
                setToggledMetric={setToggledMetrics.setToggleGrossProfitMargin} />

              :
              ''
            }



            {/* Operating Expenses */}
            <TableRow
              metric={'operatingExpenses'}
              metricName={'Operating Expenses'}
              metricValue={'operatingExpenses'}
              toggledID={'toggled-toggleOperatingExpenses'}
              typeOfRow={'real-row'}
              income_expense={'expense'}
              collapsible={true}
              fiscalPeriods={fiscalPeriods}
              dropdown={financialStatementsDropdown.operatingExpensesDropdown}
              setDropdown={(value) => dispatch(getFinancialStatementsDropdown({ operatingExpensesDropdown: value }))}
              reports={fiscalReports}
              extras={operatingExpensesExtras}
              setExtras={setOperatingExpensesExtras}
              toggledMetric={toggledMetrics.toggleOperatingExpenses}
              setToggledMetric={setToggledMetrics.setToggleOperatingExpenses} />

            {operatingExpensesExtras.YoY ?
              <TableRow
                metric={'operatingExpenses'}
                metricName={'Operating Expenses'}
                metricValue={'operatingExpenses'}
                toggledID={'toggled-toggleOperatingExpensesYoY'}
                typeOfRow={'YoY-row'}
                fiscalPeriods={fiscalPeriods}
                dropdown={financialStatementsDropdown.operatingExpensesDropdown}
                setDropdown={(value) => dispatch(getFinancialStatementsDropdown({ operatingExpensesDropdown: value }))}
                reports={fiscalReports}
                extras={operatingExpensesExtras}
                setExtras={setOperatingExpensesExtras}
                toggledMetric={toggledMetrics.toggleOperatingExpensesYoY}
                setToggledMetric={setToggledMetrics.setToggleOperatingExpensesYoY} />

              :
              ''
            }

            {operatingExpensesExtras.margin ?
              <TableRow
                metric={'operatingExpenses'}
                metricName={'Operating Expenses'}
                metricValue={'operatingExpenses'}
                toggledID={'toggled-toggleOperatingExpensesMargin'}
                typeOfRow={'margin-row'}
                fiscalPeriods={fiscalPeriods}
                dropdown={financialStatementsDropdown.operatingExpensesDropdown}
                setDropdown={(value) => dispatch(getFinancialStatementsDropdown({ operatingExpensesDropdown: value }))}
                reports={fiscalReports}
                extras={operatingExpensesExtras}
                setExtras={setOperatingExpensesExtras}
                toggledMetric={toggledMetrics.toggleOperatingExpensesMargin}
                setToggledMetric={setToggledMetrics.setToggleOperatingExpensesMargin} />

              :
              ''
            }


            {/* Operating Income */}
            <TableRow
              metric={'operatingIncome'}
              metricName={'Operating Income'}
              metricValue={'operatingIncome'}
              toggledID={'toggled-operatingIncome'}
              typeOfRow={'real-row'}
              income_expense={'income'}
              collapsible={false}
              fiscalPeriods={fiscalPeriods}
              dropdown={financialStatementsDropdown.operatingIncomeDropdown}
              setDropdown={(value) => dispatch(getFinancialStatementsDropdown({ operatingIncomeDropdown: value }))}
              reports={fiscalReports}
              extras={operatingIncomeExtras}
              setExtras={setOperatingIncomeExtras}
              toggledMetric={toggledMetrics.toggleOperatingIncome}
              setToggledMetric={setToggledMetrics.setToggleOperatingIncome} />

            {operatingIncomeExtras.YoY ?
              <TableRow
                metric={'operatingIncome'}
                metricName={'Operating Income'}
                metricValue={'operatingIncome'}
                toggledID={'toggled-operatingIncomeYoY'}
                typeOfRow={'YoY-row'}
                fiscalPeriods={fiscalPeriods}
                dropdown={financialStatementsDropdown.operatingIncomeDropdown}
                setDropdown={(value) => dispatch(getFinancialStatementsDropdown({ operatingIncomeDropdown: value }))}
                reports={fiscalReports}
                extras={operatingIncomeExtras}
                setExtras={setOperatingIncomeExtras}
                toggledMetric={toggledMetrics.toggleOperatingIncomeYoY}
                setToggledMetric={setToggledMetrics.setToggleOperatingIncomeYoY} />

              :
              ''
            }

            {operatingIncomeExtras.margin ?
              <TableRow
                metric={'operatingIncome'}
                metricName={'Operating Income'}
                metricValue={'operatingIncome'}
                toggledID={'toggled-operatingIncomeMargin'}
                typeOfRow={'margin-row'}
                fiscalPeriods={fiscalPeriods}
                dropdown={financialStatementsDropdown.operatingIncomeDropdown}
                setDropdown={(value) => dispatch(getFinancialStatementsDropdown({ operatingIncomeDropdown: value }))}
                reports={fiscalReports}
                extras={operatingIncomeExtras}
                setExtras={setOperatingIncomeExtras}
                toggledMetric={toggledMetrics.toggleOperatingIncomeMargin}
                setToggledMetric={setToggledMetrics.setToggleOperatingIncomeMargin} />

              :
              ''
            }


            {/* Non-operating income */}
            <TableRow
              metric={'nonOperatingIncome'}
              metricName={'Non Operating Income'}
              metricValue={'otherNonOperatingIncome'}
              toggledID={'toggled-otherNonOperatingIncome'}
              typeOfRow={'real-row'}
              income_expense={'expense'}
              collapsible={true}
              fiscalPeriods={fiscalPeriods}
              dropdown={financialStatementsDropdown.nonOperatingIncomeDropdown}
              setDropdown={(value) => dispatch(getFinancialStatementsDropdown({ nonOperatingIncomeDropdown: value }))}
              reports={fiscalReports}
              extras={nonOperatingIncomeExtras}
              setExtras={setNonOperatingIncomeExtras}
              toggledMetric={toggledMetrics.toggleNonOperatingIncome}
              setToggledMetric={setToggledMetrics.setToggleNonOperatingIncome} />

            {nonOperatingIncomeExtras.YoY ?
              <TableRow
                metric={'nonOperatingIncome'}
                metricName={'Non Operating Income'}
                metricValue={'otherNonOperatingIncome'}
                toggledID={'toggled-otherNonOperatingIncomeYoY'}
                typeOfRow={'YoY-row'}
                fiscalPeriods={fiscalPeriods}
                dropdown={financialStatementsDropdown.nonOperatingIncomeDropdown}
                setDropdown={(value) => dispatch(getFinancialStatementsDropdown({ nonOperatingIncomeDropdown: value }))}
                reports={fiscalReports}
                extras={nonOperatingIncomeExtras}
                setExtras={setNonOperatingIncomeExtras}
                toggledMetric={toggledMetrics.toggleNonOperatingIncomeYoY}
                setToggledMetric={setToggledMetrics.setToggleNonOperatingIncomeYoY} />

              :
              ''
            }

            {nonOperatingIncomeExtras.margin ?
              <TableRow
                metric={'nonOperatingIncome'}
                metricName={'Non Operating Income'}
                metricValue={'otherNonOperatingIncome'}
                toggledID={'toggled-otherNonOperatingIncomeMargin'}
                typeOfRow={'margin-row'}
                fiscalPeriods={fiscalPeriods}
                dropdown={financialStatementsDropdown.nonOperatingIncomeDropdown}
                setDropdown={(value) => dispatch(getFinancialStatementsDropdown({ nonOperatingIncomeDropdown: value }))}
                reports={fiscalReports}
                extras={nonOperatingIncomeExtras}
                setExtras={setNonOperatingIncomeExtras}
                toggledMetric={toggledMetrics.toggleNonOperatingIncomeMargin}
                setToggledMetric={setToggledMetrics.setToggleNonOperatingIncomeMargin} />

              :
              ''
            }


            {/* Pretax Income */}
            <TableRow
              metric={'pretaxIncome'}
              metricName={'Pretax Income'}
              metricValue={'incomeBeforeTax'}
              toggledID={'toggled-incomeBeforeTax'}
              typeOfRow={'real-row'}
              income_expense={'income'}
              collapsible={false}
              fiscalPeriods={fiscalPeriods}
              dropdown={financialStatementsDropdown.pretaxIncomeDropdown}
              setDropdown={(value) => dispatch(getFinancialStatementsDropdown({ pretaxIncomeDropdown: value }))}
              reports={fiscalReports}
              extras={pretaxIncomeExtras}
              setExtras={setPretaxIncomeExtras}
              toggledMetric={toggledMetrics.togglePretaxIncome}
              setToggledMetric={setToggledMetrics.setTogglePretaxIncome} />

            {pretaxIncomeExtras.YoY ?
              <TableRow
                metric={'pretaxIncome'}
                metricName={'Pretax Income'}
                metricValue={'incomeBeforeTax'}
                toggledID={'toggled-incomeBeforeTaxYoY'}
                typeOfRow={'YoY-row'}
                fiscalPeriods={fiscalPeriods}
                dropdown={financialStatementsDropdown.pretaxIncomeDropdown}
                setDropdown={(value) => dispatch(getFinancialStatementsDropdown({ pretaxIncomeDropdown: value }))}
                reports={fiscalReports}
                extras={pretaxIncomeExtras}
                setExtras={setPretaxIncomeExtras}
                toggledMetric={toggledMetrics.togglePretaxIncomeYoY}
                setToggledMetric={setToggledMetrics.setTogglePretaxIncomeYoY} />

              :
              ''
            }

            {pretaxIncomeExtras.margin ?
              <TableRow
                metric={'pretaxIncome'}
                metricName={'Pretax Income'}
                metricValue={'incomeBeforeTax'}
                toggledID={'toggled-incomeBeforeTaxMargin'}
                typeOfRow={'margin-row'}
                fiscalPeriods={fiscalPeriods}
                dropdown={financialStatementsDropdown.pretaxIncomeDropdown}
                setDropdown={(value) => dispatch(getFinancialStatementsDropdown({ pretaxIncomeDropdown: value }))}
                reports={fiscalReports}
                extras={pretaxIncomeExtras}
                setExtras={setPretaxIncomeExtras}
                toggledMetric={toggledMetrics.togglePretaxIncomeMargin}
                setToggledMetric={setToggledMetrics.setTogglePretaxIncomeMargin} />

              :
              ''
            }

            {/* Taxes */}
            <TableRow
              metric={'taxes'}
              metricName={'Taxes'}
              metricValue={'incomeTaxExpense'}
              toggledID={'toggled-taxes'}
              typeOfRow={'real-row'}
              collapsible={false}
              income_expense={'expense'}
              fiscalPeriods={fiscalPeriods}
              dropdown={financialStatementsDropdown.taxesDropdown}
              setDropdown={(value) => dispatch(getFinancialStatementsDropdown({ taxesDropdown: value }))}
              reports={fiscalReports}
              extras={taxesExtras}
              setExtras={setTaxesExtras}
              toggledMetric={toggledMetrics.toggleTaxes}
              setToggledMetric={setToggledMetrics.setToggleTaxes} />

            {taxesExtras.YoY ?
              <TableRow
                metric={'taxes'}
                metricName={'Taxes'}
                metricValue={'incomeTaxExpense'}
                toggledID={'toggled-taxesYoY'}
                typeOfRow={'YoY-row'}
                fiscalPeriods={fiscalPeriods}
                dropdown={financialStatementsDropdown.taxesDropdown}
                setDropdown={(value) => dispatch(getFinancialStatementsDropdown({ taxesDropdown: value }))}
                reports={fiscalReports}
                extras={taxesExtras}
                setExtras={setTaxesExtras}
                toggledMetric={toggledMetrics.toggleTaxesYoY}
                setToggledMetric={setToggledMetrics.setToggleTaxesYoY} />


              :
              ''
            }

            {taxesExtras.margin ?
              <TableRow
                metric={'taxes'}
                metricName={'Taxes'}
                metricValue={'incomeTaxExpense'}
                toggledID={'toggled-taxesMargin'}
                typeOfRow={'margin-row'}
                fiscalPeriods={fiscalPeriods}
                dropdown={financialStatementsDropdown.taxesDropdown}
                setDropdown={(value) => dispatch(getFinancialStatementsDropdown({ taxesDropdown: value }))}
                reports={fiscalReports}
                extras={taxesExtras}
                setExtras={setTaxesExtras}
                toggledMetric={toggledMetrics.toggleTaxesMargin}
                setToggledMetric={setToggledMetrics.setToggleTaxesMargin} />


              :
              ''
            }


            {/* Net Income */}
            <TableRow
              metric={'netIncome'}
              metricName={'Net Income'}
              metricValue={'netIncome'}
              toggledID={'toggled-netIncome'}
              typeOfRow={'real-row'}
              collapsible={false}
              income_expense={'income'}
              fiscalPeriods={fiscalPeriods}
              dropdown={financialStatementsDropdown.netIncomeDropdown}
              setDropdown={(value) => dispatch(getFinancialStatementsDropdown({ netIncomeDropdown: value }))}
              reports={fiscalReports}
              extras={netIncomeExtras}
              setExtras={setNetIncomeExtras}
              toggledMetric={toggledMetrics.toggleNetIncome}
              setToggledMetric={setToggledMetrics.setToggleNetIncome} />

            {netIncomeExtras.YoY ?
              <TableRow
                metric={'netIncome'}
                metricName={'Net Income'}
                metricValue={'netIncome'}
                toggledID={'toggled-netIncomeYoY'}
                typeOfRow={'YoY-row'}
                fiscalPeriods={fiscalPeriods}
                dropdown={financialStatementsDropdown.netIncomeDropdown}
                setDropdown={(value) => dispatch(getFinancialStatementsDropdown({ netIncomeDropdown: value }))}
                reports={fiscalReports}
                extras={netIncomeExtras}
                setExtras={setNetIncomeExtras}
                toggledMetric={toggledMetrics.toggleNetIncomeYoY}
                setToggledMetric={setToggledMetrics.setToggleNetIncomeYoY} />

              :
              ''
            }

            {netIncomeExtras.margin ?
              <TableRow
                metric={'netIncome'}
                metricName={'Net Income'}
                metricValue={'netIncome'}
                toggledID={'toggled-netIncomeMargin'}
                typeOfRow={'margin-row'}
                fiscalPeriods={fiscalPeriods}
                dropdown={financialStatementsDropdown.netIncomeDropdown}
                setDropdown={(value) => dispatch(getFinancialStatementsDropdown({ netIncomeDropdown: value }))}
                reports={fiscalReports}
                extras={netIncomeExtras}
                setExtras={setNetIncomeExtras}
                toggledMetric={toggledMetrics.toggleNetIncomeMargin}
                setToggledMetric={setToggledMetrics.setToggleNetIncomeMargin} />

              :
              ''
            }
          </tbody>
        </table>
      </div>
    </>
  )
}
