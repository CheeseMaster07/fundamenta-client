import * as api from '../api'

export const getStocks = () => async (dispatch) => {
  try {
    console.time('Time');
    const { data } = await api.fetchStocks()
    console.timeEnd('Time');

    dispatch({ type: 'FETCH_ALL', payload: data });
  } catch (error) {
    console.log(error.message)
  }
}


