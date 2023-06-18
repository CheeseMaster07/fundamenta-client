export default (getFinancialStatementsToggled = {

  toggleTotalRevenue: false,
  toggleTotalRevenueYoY: false,

  toggleCostOfGoodsAndServicesSold: false,
  toggleCostOfGoodsAndServicesSoldYoY: false,
  toggleCostOfGoodsAndServicesSoldMargin: false,

  toggleGrossProfit: false,
  toggleGrossProfitYoY: false,
  toggleGrossProfitMargin: false,

  toggleOperatingExpenses: false,
  toggleOperatingExpensesYoY: false,
  toggleOperatingExpensesMargin: false,

  toggleOperatingIncome: false,
  toggleOperatingIncomeYoY: false,
  toggleOperatingIncomeMargin: false,

  toggleNonOperatingIncome: false,
  toggleNonOperatingIncomeYoY: false,
  toggleNonOperatingIncomeMargin: false,

  togglePretaxIncome: false,
  togglePretaxIncomeYoY: false,
  togglePretaxIncomeMargin: false,

  toggleTaxes: false,
  toggleTaxesYoY: false,
  toggleTaxesMargin: false,

  toggleNetIncome: false,
  toggleNetIncomeYoY: false,
  toggleNetIncomeMargin: false,



  toggleTotalAssets: false,

  toggleTotalLiabilities: false,

  toggleTotalEquity: false,



  toggleOperatingCashflow: false,
  toggleOperatingCashflowMargin: false,

  toggleInvestingCashflow: false,
  toggleInvestingCashflowMargin: false,

  toggleFinancingCashflow: false,
  toggleFinancingCashflowMargin: false,

  toggleFreeCashflow: false,
  toggleFreeCashflowMargin: false,

}, action) => {

  switch (action.type) {
    case 'FETCH_TOGGLED':
      for (const [key, value] of Object.entries(action.payload)) {
        if (getFinancialStatementsToggled.hasOwnProperty(key)) {
          getFinancialStatementsToggled[key] = Boolean(value);
        }
      }
      return { ...getFinancialStatementsToggled }
    default:
      return getFinancialStatementsToggled
  }
}