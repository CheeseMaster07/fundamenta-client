import React, { useRef, useState, useEffect } from 'react';
import { Outlet, useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';

import '../css/header.css'

import Stocks from './Home/Stocks/Stocks'
import { getStocks } from '../actions/stocks'
import { getStockData } from '../actions/stockPage'
import { fetchStocks } from '../api/index'



export default function Header() {
  const navigate = useNavigate();
  const [stocks, setStocks] = useState([])
  const [inputtedStock, setInputtedStock] = useState('')
  useEffect(() => {
    fetchStocks().then(data => setStocks(data.data))
  }, [])

  const [searchedStocks, setSearchedStocks] = useState([])
  const stocksRef = useRef()

  console.log(searchedStocks)

  function showStocks(e) {
    setInputtedStock(e.target.value)
    const searchQuery = stocksRef.current.value
    if (searchQuery != '') {
      setSearchedStocks(stocks.filter(stock => stock.toLowerCase().startsWith(searchQuery)).slice(0, 10))
    } else {
      setSearchedStocks([])
    }

  }


  return (
    <div className="header">
      <nav className="nav">
        <div className="logo">
          <h1 className="title"><a className="title-link" href="/">Fundamenta</a></h1>
        </div>
        <div className="icons">
          <ul>
            <li className="search-stocks">

              <div className="dropdown">
                <form>
                  <input className="searchbar" ref={stocksRef} onChange={showStocks} type="text" placeholder='Search Stocks' value={inputtedStock} />
                </form>

                <div className="dropdown-menu">
                  {
                    searchedStocks.map(stock => {
                      return <div onClick={() => {
                        navigate(`/stocks/${stock.toLowerCase()}`)
                        window.location.reload();
                      }
                      } className="dropdown-row">{stock.toLowerCase()}</div>
                    })
                  }
                </div>
              </div>
            </li>
            <li>
              <div onClick={() => {
                navigate(`/stock-cards`)
                window.location.reload();
              }
              } className='stock-cards'>Stock Cards</div>
            </li>
          </ul>
        </div>
      </nav>

    </div>


  )
}
{/*  */ }