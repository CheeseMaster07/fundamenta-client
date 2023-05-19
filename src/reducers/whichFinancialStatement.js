export default (whichFinancialStatement = 'incomeStatement', action) => {

  switch (action.type) {
    case 'FETCH_WHICH_FINANCIALSTATEMENT':
      switch (action.payload) {
        case 'incomeStatement':
          whichFinancialStatement = 'incomeStatement'
          break;

        case 'balanceSheet':
          whichFinancialStatement = 'balanceSheet'
          break;

        case 'cashflowStatement':
          whichFinancialStatement = 'cashflowStatement'
          break;

        default:
          break;
      }
      return whichFinancialStatement

    default:
      return whichFinancialStatement
  }
}