import React, { useEffect } from 'react';

import { Route, Routes, useLocation } from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home/Home'
import StockPage from './components/StockPage/StockPage';
import Overview from './components/StockPage/Overview/Overview';
import Dividends from './components/StockPage/Dividends/Dividends';
import Forecasts from './components/StockPage/Forecasts/Forecasts';
import Ratios from './components/StockPage/Ratios/Ratios';
import Segments from './components/StockPage/Segments/Segments';
import FinancialStatements from './components/StockPage/FinancialStatements/FinancialStatements';
import IncomeStatement from './components/StockPage/FinancialStatements/IncomeStatement/IncomeStatement';
import BalanceSheet from './components/StockPage/FinancialStatements/BalanceSheet/BalanceSheet';
import CashflowStatement from './components/StockPage/FinancialStatements/CashflowStatement/CashflowStatement';
import StockPageHeader from './components/StockPage/StockPageHeader';
import FinancialStatementsHeader from './components/StockPage/FinancialStatements/FinancialStatementsHeader'

import './css/general.css'

const App = () => {
  const location = useLocation()
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={< Home />} />
        <Route path="/stocks/:id" element={< StockPageHeader />}>
          <Route index element={< Overview />} />
          <Route path="dividends" element={< Dividends />}></Route>
          <Route path="forecasts" element={< Forecasts />}></Route>
          <Route path="ratios" element={< Ratios />}></Route>
          <Route path="segments" element={< Segments />}></Route>
          <Route path="financial-statements" element={< FinancialStatementsHeader />} >
            <Route index element={< FinancialStatements />} />
            <Route path="income-statement" element={< IncomeStatement statement={'income-statement'} />} />
            <Route path="balance-sheet" element={< BalanceSheet statement={'balance-sheet'} />} />
            <Route path="cashflow-statement" element={< CashflowStatement statement={'cashflow-statement'} />} />
          </Route>
          <Route path="overview" element={< Overview />}></Route>
          <Route path="overview" element={< Overview />}></Route>
          <Route path="overview" element={< Overview />}></Route>
          <Route path="overview" element={< Overview />}></Route>
        </Route>
      </Routes>
    </>

  );
};

export default App;
//      