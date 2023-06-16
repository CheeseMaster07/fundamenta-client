export default (stockData = [], action) => {
  switch (action.type) {
    case 'OLD_FETCH_STOCK':
      return action.payload
    default:
      return stockData
  }
}