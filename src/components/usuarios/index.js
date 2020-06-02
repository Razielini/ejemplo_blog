import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as usuariosActions from '../../actions/usuariosActions'

import Spinner from '../general/Spinner'
import Fatal from '../general/Fatal'
import Tabla from './Tabla'

/*
  CONST = STATELESS > COMPONENTE FUNCIONA > NO MANEJA ESTADO
  CLASS APP EXTENDS COMPONENT = STATEFUL > COMPONENTE FUNCIONAL
*/

class Usuarios extends Component {
  componentDidMount () {
   console.log('componentDidMount ::', this.props.usuarios)
   if (!this.props.usuarios.length) this.props.getUsuarios()
  }

  whileLoading = () => {
    if (this.props.cargando) return <Spinner />
    if (this.props.error) return <Fatal mensaje={this.props.error} />

    return <Tabla />
  }

  render () {
    console.log('render :: props ::', this.props)
    return (
      <div>
        <h1>Usuarios</h1>
        { this.whileLoading() }
      </div>
    )
  }
}

const mapStateToProps = (reducers) => reducers.usuariosReducer

export default connect(mapStateToProps, usuariosActions)(Usuarios);
