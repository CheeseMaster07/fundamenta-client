export default (getFinancialStatementsDropdown = {

  totalRevenueDropdown: false,
  costOfGoodsAndServicesSoldDropdown: false,
  grossProfitDropdown: false,
  operatingExpensesDropdown: false,
  operatingIncomeDropdown: false,
  nonOperatingIncomeDropdown: false,
  pretaxIncomeDropdown: false,
  taxesDropdown: false,
  netIncomeDropdown: false,

  totalAssetsDropdown: false,
  totalLiabilitiesDropdown: false,
  totalEquityDropdown: false,

  operatingCashflowDropdown: false,
  investingCashflowDropdown: false,
  financingCashflowDropdown: false,
  freeCashflowDropdown: false,


}, action) => {
  switch (action.type) {

    case 'FETCH_DROPDOWN':
      const updatedState = { ...getFinancialStatementsDropdown };

      Object.keys(updatedState).forEach((key) => {
        if (key in action.payload && action.payload[key]) {
          updatedState[key] = true;
        } else {
          updatedState[key] = false;
        }
      });
      //console.log(updatedState);
      return updatedState;

    default:
      return getFinancialStatementsDropdown
  }
}