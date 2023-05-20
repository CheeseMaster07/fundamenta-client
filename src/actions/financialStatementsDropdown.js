export const getFinancialStatementsDropdown = (dropdownData) => async (dispatch) => {

  try {

    const data = dropdownData

    dispatch({ type: 'FETCH_DROPDOWN', payload: data });
  } catch (error) {
    console.log(error.message)
  }
}