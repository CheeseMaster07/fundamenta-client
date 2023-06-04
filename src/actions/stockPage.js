import * as api from '../api'


export const getStockData = (id, fetch) => async (dispatch) => {

  try {
    console.time('Time')
    const { data } = await api.fetchStockData(id, 'FETCH_ALL')
    console.timeEnd('Time');

    dispatch({ type: fetch, payload: data });
    dispatch({ type: fetch, payload: data });
  } catch (error) {
    console.log(error.message)
  }
}