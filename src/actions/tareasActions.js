import axios from 'axios'
import {
  GET_TAREAS,
  CARGANDO,
  ERROR,
  CAMBIO_USUARIO_ID,
  CAMBIO_TITULO,
  GUARDAR,
  ACTUALIZAR
} from '../types/tareasTypes'

export const getTareas = () => async (dispatch) => {
  dispatch({
    type: CARGANDO
  })

  try {
    const respuesta = await axios.get('https://jsonplaceholder.typicode.com/todos')

    const tareas = {}
    respuesta.data.map((tar) => (
      tareas[tar.userId] = {
        ...tareas[tar.userId],
        [tar.id]: {
          ...tar
        }
      }
    ))

    console.log('getTareas ::', tareas)

    dispatch({
      type: GET_TAREAS,
      payload: tareas
    })
  } catch (error) {
    console.log('error ::', error.message)
    dispatch({
      type: ERROR,
      payload: 'Tareas de Usuario no disponibles.'
    })
  }
}

export const cambioUsuarioID = (usuario_id) => (dispatch) => {
  dispatch({
    type: CAMBIO_USUARIO_ID,
    payload: usuario_id
  })
}

export const cambioTitulo = (titulo) => (dispatch) => {
  dispatch({
    type: CAMBIO_TITULO,
    payload: titulo
  })
}

export const agregarTarea = (nueva_tarea) => async (dispatch) => {
  dispatch({
    type: CARGANDO
  })

  try {
    const respuesta = await axios.post('https://jsonplaceholder.typicode.com/todos', nueva_tarea)
    console.log('agregarTarea ::', respuesta.data)
    dispatch({
      type: GUARDAR
    })
  } catch (error) {
    console.log('agregarTarea :: error::', error.message)
    dispatch({
      type: ERROR,
      paylos: 'Intente más tarde.'
    })
    
  }
}

export const editarTarea = (tarea_editada) => async (dispatch) => {
  dispatch({
    type: CARGANDO
  })

  try {
    const respuesta = await axios.put(`https://jsonplaceholder.typicode.com/todos/${tarea_editada.id}`, tarea_editada)
    console.log('agregarTarea ::', respuesta.data)
    dispatch({
      type: GUARDAR
    })
  } catch (error) {
    console.log('agregarTarea :: error::', error.message)
    dispatch({
      type: ERROR,
      paylos: 'Intente más tarde.'
    })
    
  }
}

export const cambioCheck = (usu_id, tar_id) => (dispatch, getState) => {
  const { tareas } = getState().tareasReducer
  const seleccionada = tareas[usu_id][tar_id]

  const actualizadas = {
    ...tareas
  }

  actualizadas[usu_id] = {
    ...tareas[usu_id]
  }

  actualizadas[usu_id][tar_id] = {
    ...tareas[usu_id][tar_id],
    completed: !seleccionada.completed
  }

  dispatch({
    type: ACTUALIZAR,
    payload: actualizadas
  })
}