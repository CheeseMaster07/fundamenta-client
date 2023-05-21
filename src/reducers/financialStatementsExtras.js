export default (getFinancialStatementsExtras = {

  totalRevenueExtras: { YoY: false, margin: false },
  costofGoodsAndServicesSoldExtras: { YoY: false, margin: false },


}, action) => {

  switch (action.type) {
    case 'FETCH_EXTRAS':

      Object.keys(getFinancialStatementsExtras).forEach((key) => {
        console.log(key)
        console.log(Object.keys(action.payload)[0])
        if (Object.keys(action.payload)[0] == key) {

          getFinancialStatementsExtras[key] = action.payload[key]
        }

      });
      console.log(getFinancialStatementsExtras)

      return getFinancialStatementsExtras;
    default:
      return getFinancialStatementsExtras
  }
}