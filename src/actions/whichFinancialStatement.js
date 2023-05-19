
export const getWhichFinancialStatement = (whichFinancialStatement) => async (dispatch) => {

  try {
    const data = whichFinancialStatement

    dispatch({ type: 'FETCH_WHICH_FINANCIALSTATEMENT', payload: data });
  } catch (error) {
    console.log(error.message)
  }
}