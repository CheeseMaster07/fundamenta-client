export default (getFinancialStatementsDropdown = {

  totalRevenueDropdown: false,
  costOfGoodsAndServicesSoldDropdown: false


}, action) => {
  console.log(action.payload)
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