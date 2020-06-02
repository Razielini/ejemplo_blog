import axios from 'axios'
import { ACTUALIZAR, CARGANDO, ERROR, COM_CARGANDO, COM_ERROR, COM_ACTUALIZAR } from '../types/publicacionesTypes'

import * as usuariosTypes from '../types/usuariosTypes'
const { GET_USUARIOS: USUARIOS_GET_ALL } = usuariosTypes

export const getPublicacionesUsuario = (key) => async (dispatch, getState) => {
  dispatch({
    type: CARGANDO
  })

  try {
    const { usuarios } = getState().usuariosReducer
    const { publicaciones } = getState().publicacionesReducer
    const usuario_id = usuarios[key].id

    const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${usuario_id}`)

    const nuevas = respuesta.data.map(publicacion => ({
      ...publicacion,
      comentarios: [],
      abierto: false
    }))

    const publicaciones_actualizadas = [
      ...publicaciones,
      nuevas
    ]

    dispatch({
      type: ACTUALIZAR,
      payload: publicaciones_actualizadas
    })

    const publicaciones_key = publicaciones_actualizadas.length - 1
    const usuarios_actualizados = [ ...usuarios]
    usuarios_actualizados[key] = {
      ...usuarios[key],
      publicaciones_key
    }

    dispatch({
      type: USUARIOS_GET_ALL,
      payload: usuarios_actualizados
    })
  } catch (error) {
    console.log('error ::', error.message)
    dispatch({
      type: ERROR,
      payload: 'Publicaciones no disponibles.'
    })
  }
}

export const AbrirCerrar = (pub_key, com_key) => (dispatch, getState) => {
  const { publicaciones } = getState().publicacionesReducer
  const seleccionada = publicaciones[pub_key][com_key]

  const actualizada = {
    ...seleccionada,
    abierto: !seleccionada.abierto
  }

  const publicaciones_actualizadas = [...publicaciones]
  publicaciones_actualizadas[pub_key] = [
    ...publicaciones[pub_key]
  ]

  publicaciones_actualizadas[pub_key][com_key] = actualizada

  dispatch({
    type: ACTUALIZAR,
    payload: publicaciones_actualizadas
  })

  console.log(pub_key, com_key)
}

export const traerComentarios = (pub_key, com_key) => async (dispatch, getState) => {
  dispatch({
    type: COM_CARGANDO
  })

  const { publicaciones } = getState().publicacionesReducer
  const seleccionada = publicaciones[pub_key][com_key]
  console.log('seleccionada ::', seleccionada)

  try {
    const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${seleccionada.id}`)

    const actualizada = {
      ...seleccionada,
      comentarios: respuesta.data
    }

    console.log('actualizada ::', actualizada)
    console.log('comentarios ::', respuesta.data)

    const publicaciones_actualizadas = [...publicaciones]
    publicaciones_actualizadas[pub_key] = [
      ...publicaciones[pub_key]
    ]

    publicaciones_actualizadas[pub_key][com_key] = actualizada

    dispatch({
      type: COM_ACTUALIZAR,
      payload: publicaciones_actualizadas
    })
  } catch (error) {
    console.log('traerComentarios :: error ::', error.message)
    dispatch({
      type: COM_ERROR,
      payload: 'Comentarios no disponibles.'
    })
  }

}