import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' })

const user = JSON.parse(localStorage.getItem('profile'));

if (user?.token) {
  API.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
} else {

}

export const fetchStocks = () => API.get('/stocks')
export const fetchStockData = (id) => API.get(`/stocks/${id}`)
export const likeStock = (id, isLiking) => API.patch(`/stocks/${id}/likeStock`, { 'isLiking': isLiking })

export const login = (formData) => API.post('/user/login', formData)
export const register = (formData) => API.post('/user/register', formData)
export const checkTokenExpired = () => API.post('/user/checkTokenExpired')
