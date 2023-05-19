import * as api from '../api'


export const getStockData = (id) => async (dispatch) => {

  try {
    console.time('Time')
    const { data } = await api.fetchStockData(id)
    console.timeEnd('Time');

    dispatch({ type: 'FETCH_ALL', payload: data });
  } catch (error) {
    console.log(error.message)
  }
}