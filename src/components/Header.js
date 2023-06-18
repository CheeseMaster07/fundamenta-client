import React, { useRef, useState, useEffect } from 'react';
import { Outlet, useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';

import '../css/header.css'

import Stocks from './Home/Stocks/Stocks'
import { getStocks, getStockData } from '../actions/stocks'
import { fetchStocks } from '../api/index'



export default function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [stocks, setStocks] = useState([])
  const [inputtedStock, setInputtedStock] = useState('')
  useEffect(() => {
    fetchStocks().then(data => setStocks(data.data))
  }, [])
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));


  const [searchedStocks, setSearchedStocks] = useState([])
  const [searchQuery, setSearchQuery] = useState()
  const stocksRef = useRef()

  function showStocks(e) {
    setInputtedStock(e.target.value)
    setSearchQuery(stocksRef.current.value)
    console.log(e.target.value)
    if (e.target.value != '') {
      setSearchedStocks(stocks.filter(stock => stock.toLowerCase().startsWith(e.target.value)).slice(0, 10))
    } else {
      setSearchedStocks([])
    }


  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      navigate(`/stocks/${e.target.value}`)
    }
  };

  function logout() {
    localStorage.removeItem('profile')
    window.location.reload()
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
                  <input className="searchbar" onKeyDown={handleKeyDown}
                    ref={stocksRef} onChange={showStocks} type="text" placeholder='Search Stocks' value={inputtedStock} />
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
            <li>
              <div>
                {user ?
                  user.result?.name
                  :
                  ''}
              </div>
              <button
                onClick={() => {
                  user ?
                    logout()
                    :
                    navigate('/auth');
                }}
                className='login'
              >
                {user ? 'Logout' : 'Login'}
              </button>
            </li>
          </ul>
        </div>
      </nav >

    </div >


  )
}

