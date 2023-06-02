const initialState = {
  totalRevenueExtras: { YoY: false, margin: false },
  costOfGoodsAndServicesSoldExtras: { YoY: false, margin: false },
  grossProfitExtras: { YoY: false, margin: false },
  operatingExpensesExtras: { YoY: false, margin: false },
  operatingIncomeExtras: { YoY: false, margin: false },
  nonOperatingIncomeExtras: { YoY: false, margin: false },
  pretaxIncomeExtras: { YoY: false, margin: false },
  taxesExtras: { YoY: false, margin: false },
  netIncomeExtras: { YoY: false, margin: false },
};

export default function financialStatementsExtrasReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_EXTRAS':
      const { payload } = action;
      const newState = { ...state };

      Object.keys(newState).forEach((key) => {
        if (Object.keys(payload)[0] === key) {
          newState[key] = payload[key];
        }
      });

      return newState;
    default:
      return state;
  }
}