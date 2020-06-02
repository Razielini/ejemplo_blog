import {
  GET_TAREAS,
  CARGANDO,
  ERROR,
  CAMBIO_USUARIO_ID,
  CAMBIO_TITULO,
  GUARDAR,
  ACTUALIZAR,
  LIMPIAR_FORM
} from '../types/tareasTypes'

const INITIAL_STATE = {
  tareas: {},
  cargando: false,
  error: '',
  usuario_id: 0,
  titulo: '',
  regresar: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TAREAS:
      return {
        ...state,
        tareas: action.payload,
        cargando: false,
        error: '',
        regresar: false
      }
    case CARGANDO:
      return { ...state, cargando: true }
    case ERROR:
      return { ...state, error: action.payload, cargando: false }
    case CAMBIO_USUARIO_ID:
      return {...state, usuario_id: action.payload }
    case CAMBIO_TITULO:
      return {...state, titulo: action.payload }
    case GUARDAR:
      return {
        ...state,
        tareas: {},
        cargando: false,
        error: '',
        regresar: true,
        usuario_id: '',
        titulo: ''
      }
    case ACTUALIZAR:
      return {
        ...state, tareas: action.payload
      }
    case LIMPIAR_FORM:
      return {
        ...state, usuario_id: '', titulo: ''
      }
    default: return state
  }
}