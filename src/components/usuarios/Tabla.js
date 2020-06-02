import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Tabla = (props) => {
  const filas = () => props.usuarios.map((usuario, key) => (
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
      <td>
        <Link to={`/publicaciones/${key}`}>
          <div className="eye-solid3 icon"></div>
        </Link>
      </td>
    </tr>
  ))

  console.log('Tabla :: props ::', props)

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
          { filas() }
        </tbody>
      </table>
  )
}

const mapStateToProps = (reducers) => reducers.usuariosReducer

export default connect(mapStateToProps)(Tabla)