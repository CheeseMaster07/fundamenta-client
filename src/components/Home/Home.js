import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';

import Stocks from './Stocks/Stocks'
import { getStocks } from '../../actions/stocks'

const Home = () => {
  // const stocks = useSelector((state) => state.stocks)
  // //console.log(useSelector((state) => state))
  // const [searchedStocks, setSearchedStocks] = useState([])
  // const stocksRef = useRef()
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(getStocks())
  // }, [])


  // function searchStocks(e) {
  //   const searchQuery = stocksRef.current.value

  //   if (searchQuery != '') {
  //     setSearchedStocks(stocks.filter(stock => stock.symbol.includes(searchQuery)).slice(0, 10))
  //   } else {
  //     setSearchedStocks([])
  //   }

  // }


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