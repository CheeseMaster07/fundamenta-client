export default (stockData = [], action) => {
  switch (action.type) {
    case 'OLD_FETCH_ALL':
      return action.payload
    default:
      return stockData
  }
}