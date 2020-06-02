import axios from 'axios'
import { GET_USUARIOS, CARGANDO, ERROR } from '../types/usuariosTypes'

export const getUsuarios = () => async (dispatch) => {
  dispatch({
    type: CARGANDO
  })

  try {
    const respuesta = await axios.get('https://jsonplaceholder.typicode.com/users')
    dispatch({
      type: GET_USUARIOS,
      payload: respuesta.data
    })
  } catch (error) {
    console.log('error ::', error.message)
    dispatch({
      type: ERROR,
      payload: 'Información de Usuario no disponible.'
    })
  }
}