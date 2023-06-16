export default (stockData = [], action) => {
  switch (action.type) {
    case 'FETCH_STOCK':
      return action.payload
    case 'LIKE_STOCK':
      return action.payload
    default:
      return stockData
  }
}