import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as usuariosActions from '../../actions/usuariosActions'
import Spinner from '../general/Spinner'
/*
  CONST = STATELESS > COMPONENTE FUNCIONA > NO MANEJA ESTADO
  CLASS APP EXTENDS COMPONENT = STATEFUL > COMPONENTE FUNCIONAL
*/

class Usuarios extends Component {
  filas = () => (
    this.props.usuarios.map(usuario => (
      <tr
        key={usuario.id}
      >
        <td>
          { usuario.name }
        </td>
        <td>
          { usuario.email }
        </td>
        <td>
          { usuario.website }
        </td>
      </tr>
    ))
  )

  componentDidMount () {
   console.log('componentDidMount ::', this.props.getUsuarios())
   this.props.getUsuarios()
  }

  whileLoading = () => {
    if (this.props.cargando) {
      return (
        <Spinner />
      )
    }

    return (
      <table className="tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Enlace</th>
          </tr>
        </thead>
        <tbody>
          { this.filas() }
        </tbody>
      </table>
    )
  }

  render () {
    console.log('render :: props ::', this.props)
    return (
      <div>
        { this.whileLoading() }
      </div>
    )
  }
}

const mapStateToProps = (reducers) => reducers.usuariosReducer

export default connect(mapStateToProps, usuariosActions)(Usuarios);
