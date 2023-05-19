import { combineReducers } from 'redux';
import stocksReducer from './stocks';
import stockPageReducer from './stockPage';
import getFinancialStatementsToggled from './financialStatementsToggled';
import getIsYearlyorQuarterly from './isYearlyOrQuarterly';
import whichFinancialStatement from './whichFinancialStatement';

const rootReducer = combineReducers({
  stocks: stocksReducer,
  stockPage: stockPageReducer,
  getFinancialStatementsToggled: getFinancialStatementsToggled,
  getIsYearlyorQuarterly: getIsYearlyorQuarterly,
  whichFinancialStatement: whichFinancialStatement
});

export default rootReducer;