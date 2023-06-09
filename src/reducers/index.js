import { combineReducers } from 'redux';
import stocksReducer from './stocks';
import stockPageReducer from './stockPage';
import oldStockPage from './oldStockPage';
import getFinancialStatementsToggled from './financialStatementsToggled';
import getIsYearlyorQuarterly from './isYearlyOrQuarterly';
import whichFinancialStatement from './whichFinancialStatement';
import getFinancialStatementsDropdown from './financialStatementsDropdown';
import getFinancialStatementsExtras from './financialStatementsExtras';
import auth from './auth';

const rootReducer = combineReducers({
  // stocks: stocksReducer,
  stockPage: stockPageReducer,
  oldStockPage: oldStockPage,
  auth: auth,
  getFinancialStatementsToggled: getFinancialStatementsToggled,
  getIsYearlyorQuarterly: getIsYearlyorQuarterly,
  whichFinancialStatement: whichFinancialStatement,
  getFinancialStatementsDropdown: getFinancialStatementsDropdown,
  getFinancialStatementsExtras: getFinancialStatementsExtras,
});

export default rootReducer;