export const getIsYearlyOrQuarterly = (yearlyOrQuarterlyData) => async (dispatch) => {

  try {

    const data = yearlyOrQuarterlyData

    dispatch({ type: 'FETCH_YEAR_QUARTER', payload: data });
  } catch (error) {
    console.log(error.message)
  }
}