import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';

import Stocks from './Stocks/Stocks'
import { getStocks } from '../../actions/stocks'

const Home = () => {

  return (
    <>
      <h1>Home</h1>
    </>
  );
};

export default Home;
{/* <input ref={stocksRef} onChange={searchStocks} type="text" />
<button onClick={searchStocks}>Search</button>
<Stocks stocks={searchedStocks} /> */}