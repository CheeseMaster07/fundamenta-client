export default (getFinancialStatementsExtras = {

  totalRevenueExtras: { YoY: false, margin: false },
  costOfGoodsAndServicesSoldExtras: { YoY: false, margin: false },


}, action) => {

  switch (action.type) {
    case 'FETCH_EXTRAS':


      Object.keys(getFinancialStatementsExtras).forEach((key) => {
        if (Object.keys(action.payload)[0] == key) {
          getFinancialStatementsExtras[key] = action.payload
        }

      });

      return getFinancialStatementsExtras;
    default:
      return getFinancialStatementsExtras
  }
}