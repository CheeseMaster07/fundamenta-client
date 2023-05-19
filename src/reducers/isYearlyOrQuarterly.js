export default (getIsYearlyorQuarterly = {
  isYearly: true,
  isQuarterly: false,
}, action) => {

  switch (action.type) {
    case 'FETCH_YEAR_QUARTER':
      for (const [key, value] of Object.entries(action.payload)) {
        if (getIsYearlyorQuarterly.hasOwnProperty(key)) {
          getIsYearlyorQuarterly[key] = Boolean(value);
        }
      }
      return { ...getIsYearlyorQuarterly }
    default:
      return getIsYearlyorQuarterly
  }
}