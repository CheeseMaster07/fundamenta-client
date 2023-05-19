import axios from 'axios';

const url = 'http://localhost:5000/stocks'


export const fetchStocks = () => axios.get(url)

console.time('API')
export const fetchStockData = (id) => axios.get(`${url}/${id}`)
console.timeEnd('API')