export const getFinancialStatementsExtras = (extras) => async (dispatch) => {

  try {

    const data = extras

    dispatch({ type: 'FETCH_EXTRAS', payload: data });
  } catch (error) {
    console.log(error.message)
  }
}