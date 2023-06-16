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

export const getStockData = (id, fetch) => async (dispatch) => {

  try {

    const { data } = await api.fetchStockData(id)


    dispatch({ type: fetch, payload: data });
  } catch (error) {
    console.log(error.message)
  }
}

export const likeStock = (id, isLiking) => async (dispatch) => {
  try {
    const { data } = await api.likeStock(id, isLiking)

    dispatch({ type: 'LIKE_STOCK', payload: data.updatedStock });
    dispatch({ type: 'LIKE_STOCK_USER', payload: data.updatedUser });
  } catch (error) {
    console.log(error.message)
  }
}


