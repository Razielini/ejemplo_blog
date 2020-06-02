import React, { Component } from 'react'
import { connect } from 'react-redux'

import Spinner from '../general/Spinner'
import Fatal from '../general/Fatal'

import * as tareasActions from '../../actions/tareasActions'
import { Redirect } from 'react-router-dom'

class Guardar extends Component {
  componentDidMount () {
    const {
      match: { params: { usu_id, tar_id } },
      tareas,
      cambioUsuarioID,
      cambioTitulo,
      limpiarForm
    } = this.props

    if (usu_id && tar_id) {
      const tarea = tareas[usu_id][tar_id]
      console.log('Guardar :: tarea ::', tarea)
      cambioUsuarioID(tarea.userId)
      cambioTitulo(tarea.title)
    } else {
      limpiarForm()
    }
    console.log('Guardar :: componentDidMount ::', this.props)
  }

  cambioUsuarioID = (event) => {
    console.log('cambioUsuarioID ::', event.target.value)
    this.props.cambioUsuarioID(event.target.value)
  }

  cambioTitulo = (event) => {
    console.log('cambioTitulo ::', event.target.value)
    this.props.cambioTitulo(event.target.value)
  }

  guardar = () => {
    const {
      match: { params: { usu_id, tar_id } },
      tareas,
      usuario_id,
      titulo,
      agregarTarea,
      editarTarea
    } = this.props

    const nueva_tarea = {
      userId: usuario_id,
      title: titulo,
      completed: false
    }

    if (usu_id && tar_id) {
      const tarea = tareas[usu_id][tar_id]
      const tarea_editada = {
        ...nueva_tarea,
        completed: tarea.completed,
        id: tarea.id
      }
      editarTarea(tarea_editada)
    } else {
      console.log('guardar ::', nueva_tarea)
      agregarTarea(nueva_tarea)
    }
  }

  deshabilitar = () => {
    const { titulo, usuario_id, cargando } = this.props
    if (cargando) return true
    if (!usuario_id || !titulo) return true
    return false
  }

  mostrarAccion = () => {
    const { error, cargando } = this.props
    if (cargando) return <Spinner />
    if (error) return <Fatal mensaje={ error } />
  }

  render () {
    console.log('Guardar :: render ::', this.props)
    return(
      <div>
        {
          (this.props.regresar) ? <Redirect to='/tareas' /> : ''
        }
        <h1>
          Guardar Tarea
        </h1>
        Usuario id:
        <input
          type="number"
          value={ this.props.usuario_id }
          onChange={ this.cambioUsuarioID }
        />
        <br />
        Título
        <input
          type="text"
          value={this.props.titulo }
          onChange={ this.cambioTitulo }
        />
        <br />
        <button
          disabled={ this.deshabilitar() }
          onClick={ this.guardar }
        >
          Guardar
        </button>
        { this.mostrarAccion() }
      </div>
    )
  }
}

const mapStateToProps = ({ tareasReducer }) => tareasReducer

export default connect(mapStateToProps, tareasActions)(Guardar)