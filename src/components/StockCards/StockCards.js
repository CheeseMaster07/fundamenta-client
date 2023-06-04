import React, { useRef, useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { getStockData } from '../../actions/stockPage'
import { fetchStocks } from '../../api/index'


import '../../css/stockCards.css'

export default function StockCards() {
  const dispatch = useDispatch()
  const stock = useSelector((state) => state.stockPage)
  const oldStock = useSelector((state) => state.oldStockPage)

  const [nextStockCard, setNextStockCard] = useState(false)
  const [backStockCard, setBackStockCard] = useState(false)

  const [flipped, setFlipped] = useState(false)
  const [liked, setLiked] = useState(false)

  const handleCardFlip = () => {
    setFlipped(!flipped);
  };

  const handleLike = () => {
    setLiked(!liked);
  };



  const [stocks, setStocks] = useState([])
  let id = ''
  useEffect(() => {
    const fetchData = async () => {

      const data = await fetchStocks();
      setStocks(data.data);
      const randomIndex = Math.floor(Math.random() * data.data.length);
      const randomTicker = data.data[randomIndex];
      id = randomTicker
      console.log(id)
      dispatch(getStockData(id.toLowerCase(), 'FETCH_ALL'));
    };
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      if (stock.ticker) {
        dispatch(getStockData(stock.ticker, 'OLD_FETCH_ALL'));

      }
      const data = await fetchStocks();
      setStocks(data.data);
      const randomIndex = Math.floor(Math.random() * data.data.length);
      const randomTicker = data.data[randomIndex];
      id = randomTicker
      console.log(id)
      dispatch(getStockData(id.toLowerCase(), 'FETCH_ALL'));
    };
    setTimeout(() => {
      fetchData()
    }, 100); // Adjust the duration of the flip animation here (in milliseconds)

  }, [nextStockCard])


  useEffect(() => {
    const fetchData = async () => {
      if (oldStock.ticker) {
        dispatch(getStockData(oldStock.ticker, 'FETCH_ALL'));
        dispatch(getStockData('', 'OLD_FETCH_ALL'));

      }
    };
    setTimeout(() => {
      fetchData()
    }, 100);
  }, [backStockCard])


  const stockPageURL = `/stocks/${stock.ticker}`


  if (stock.ticker) {
    return (
      <>
        <div className='stock-card-div'>
          <div className='stock-card' style={flipped ? { transform: 'rotateY(180deg) scale(-1, 1)' } : {}}>

            <div style={{ marginTop: '10px', marginBottom: '10px' }} className="stock-title">
              <h1><Link style={{ fontSize: '55px' }} className="stock-title-link" to={stockPageURL} state={stock} >{stock.name}</Link></h1>
            </div >
            <div class="grid-container">
              <div class="grid-item">Price: ${stock.Pricing.lastPrice}</div>
              <div class="grid-item">EPS: ${(stock.FinancialStatements.IncomeStatement.annualReports[0].netIncome / stock.latestSharesOutstanding).toFixed(1)}</div>
              <div class="grid-item">PE (TTM): {(stock.Pricing.lastMarketCap / stock.FinancialStatements.IncomeStatement.annualReports[0].netIncome).toFixed(1)}</div>
              <div class="grid-item">PB: {(stock.Pricing.lastMarketCap / stock.FinancialStatements.BalanceSheet.annualReports[0].totalShareholderEquity).toFixed(1)}</div>
              <div class="grid-item">PE (FWD): XX</div>
              <div class="grid-item">Growth: XX</div>
              {/* <div class="grid-item">Sector: {stock.sector.toLowerCase()}</div> */}
              <div class="grid-item">Profit Margin: {`${(((stock.FinancialStatements.IncomeStatement.annualReports[0].netIncome / stock.FinancialStatements.IncomeStatement.annualReports[0].totalRevenue) * 100)?.toFixed(1))}%`}</div>
              {/* <div class="grid-item">Industry: {stock.industry.toLowerCase()}</div> */}
              <div class="grid-item">Gross Margin: {`${(((stock.FinancialStatements.IncomeStatement.annualReports[0].grossProfit / stock.FinancialStatements.IncomeStatement.annualReports[0].totalRevenue) * 100)?.toFixed(1))}%`}</div>
            </div>
            <div className="button-row">
              {oldStock.ticker ?
                <div className="button" onClick={() => {
                  handleCardFlip()

                  backStockCard ?
                    setBackStockCard(false)
                    :
                    setBackStockCard(true)
                }

                }><div className='arrow' style={{ transform: "scale(-1, 1)", left: "-10px" }}>&#10132;</div></div>
                :
                <div className="button" style={{ backgroundColor: "rgb(31, 31, 31)" }}></div>
              }

              <div className="button" onClick={() => {
                handleLike()
              }}>
                <div class="white-heart" style={liked ? { animation: 'heartbeat 400ms', color: 'rgb(255, 0, 98)' } : {}}>&#x2665;</div>
              </div>
              <div className="button" onClick={() => {
                handleCardFlip()
                nextStockCard ?
                  setNextStockCard(false)
                  :
                  setNextStockCard(true)
              }

              }><div className='arrow'>&#10132;</div></div>
            </div>
          </div>
          <div className='options-button'>
            <div className="fa fa-gear" style={{
              fontSize: "24px",
              position: "relative",
              fontSize: "70px",
              top: "14px",
              left: "18.5px"
            }}></div>
          </div>
        </div>


      </>
    )
  } else {
    return (
      <></>
    )
  }

}
