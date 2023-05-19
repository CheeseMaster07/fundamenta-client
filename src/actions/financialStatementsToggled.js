export const getFinancialStatementsToggled = (toggledData) => async (dispatch) => {

  try {

    const data = toggledData

    dispatch({ type: 'FETCH_TOGGLED', payload: data });
  } catch (error) {
    console.log(error.message)
  }
}