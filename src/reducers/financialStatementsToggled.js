export default (getFinancialStatementsToggled = {

  toggleTotalRevenue: false,
  toggleCostOfGoodsAndServicesSold: false,
  toggleGrossProfit: false,
  toggleOperatingExpenses: false,
  toggleOperatingIncome: false,
  toggleNonOperatingIncome: false,
  togglePretaxIncome: false,
  toggleTaxes: false,
  toggleNetIncome: false,

  toggleTotalAssets: false,
  toggleTotalLiabilities: false,
  toggleTotalEquity: false,

  toggleOperatingCashflow: false,
  toggleInvestingCashflow: false,
  toggleFinancingCashflow: false,
  toggleFreeCashflow: false,

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