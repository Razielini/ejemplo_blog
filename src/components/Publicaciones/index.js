import React, { Component } from 'react'
import { connect } from 'react-redux'
import Spinner from '../general/Spinner'
import Fatal from '../general/Fatal'

import * as usuariosActions from '../../actions/usuariosActions'
import * as publicacionesAction from '../../actions/publicacionesActions'
import Comentarios from './Comentarios'

const { getUsuarios: usuariosGetAll } = usuariosActions
const { 
        getPublicacionesUsuario: publicacionesGetPublicacionesUsuario,
        AbrirCerrar,
        traerComentarios
      } = publicacionesAction

class Publicaciones extends Component {
  async componentDidMount () {
    const {
      usuariosGetAll,
      publicacionesGetPublicacionesUsuario,
      match: { params: { key } }
    } = this.props

    if (!this.props.usuariosReducer.usuarios.length) await usuariosGetAll()

    if (this.props.usuariosReducer.error) return;

    if (!('publicaciones_key' in this.props.usuariosReducer.usuarios[key])) publicacionesGetPublicacionesUsuario(key)
  }

  mostrarUsuario = () => {
    const {
      usuariosReducer,
      match: { params: { key } }
    } = this.props

    if (usuariosReducer.error) return <Fatal mensaje={ usuariosReducer.error } />
    if (!usuariosReducer.usuarios.length || usuariosReducer.cargando) return <Spinner />

    const nombre = usuariosReducer.usuarios[key].name
    return (
      <h1>
        [{ key }] Publicaciones de { nombre }
      </h1>
    )
  }

  mostrarPublicaciones = () => {
    const {
      usuariosReducer,
      usuariosReducer: { usuarios },
      publicacionesReducer,
      publicacionesReducer: { publicaciones },
      match: { params: { key } }
    } = this.props

    if (!usuarios.length) return;
    if (usuariosReducer.error) return;

    if (publicacionesReducer.cargando) return <Spinner />
    if (publicacionesReducer.error) return <Fatal mensaje={ publicacionesReducer.error } />

    if (!publicaciones.length) return;
    if (!('publicaciones_key' in usuarios[key])) return;

    const { publicaciones_key } = usuarios[key]
    return this.mostrarInfo(
      publicaciones[publicaciones_key],
      publicaciones_key
    )
  }

  mostrarInfo = (publicaciones, pub_key) => (
    publicaciones.map((publicacion, com_key) => (
      <div
        className="pub_titulo"
        key={ publicacion.id }
        onClick={ () => this.mostrarComentarios(pub_key, com_key, publicacion.comentarios) }
      >
        <h2>{ publicacion.title }</h2>
        <p>
          { publicacion.body }
        </p>
        {
          (publicacion.abierto) ? <Comentarios comentarios={publicacion.comentarios} /> : ''
        }
      </div>
    ))
  )

  mostrarComentarios = (pub_key, com_key, comentarios) => {
    console.log('mostrarComentarios ::', comentarios)
    this.props.AbrirCerrar(pub_key, com_key)
    if (!comentarios.length) this.props.traerComentarios(pub_key, com_key)
  }

  render () {
    console.log('Publicaciones :: render ::', this.props)
    return (
      <div>
        { this.mostrarUsuario() }
        { this.mostrarPublicaciones() }
      </div>
    )
  }
}

const mapStateToProps = ({ usuariosReducer, publicacionesReducer }) => {
  return {
    usuariosReducer,
    publicacionesReducer
  }
}

const mapDispatchToProps = {
  usuariosGetAll,
  publicacionesGetPublicacionesUsuario,
  AbrirCerrar,
  traerComentarios
}

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones)