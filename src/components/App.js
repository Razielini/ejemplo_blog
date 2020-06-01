import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Menu from './Menu'
import usuarios from './usuarios'


const Tareas = () => <div className="margen">Tareas</div>
const App = () => (
  <BrowserRouter>
    <Menu />
    <div className="margen">
      <Route exact path="/" component={ usuarios } />
      <Route exact path="/tareas" component={ Tareas } />
    </div>
  </BrowserRouter>
)

export default App