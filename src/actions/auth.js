import * as api from '../api/index.js'

export const login = (formData, navigate) => async (dispatch) => {

  try {
    const { data } = await api.login(formData)

    dispatch({ type: 'AUTH', payload: data })

    navigate('/')
    window.location.reload()
  } catch (error) {
    console.log(error)
  }
}

export const register = (formData, navigate) => async (dispatch) => {

  try {
    const { data } = await api.register(formData)

    dispatch({ type: 'AUTH', payload: data })

    navigate('/')
    window.location.reload()
  } catch (error) {
    console.log(error)
  }
}

export const checkTokenExpired = () => async (dispatch) => {

  try {
    const { data } = await api.checkTokenExpired()
    console.log(data)

    if (data.hasExpired) {
      localStorage.removeItem('profile')
      window.location.reload()
    }

  } catch (error) {
    console.log(error)
  }
}
