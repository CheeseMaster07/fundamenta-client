export const getFinancialStatementsExtras = (extra) => async (dispatch) => {

  try {

    const data = extra

    dispatch({ type: 'FETCH_EXTRAS', payload: data });
  } catch (error) {
    console.log(error.message)
  }
}