import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import './comunes/estilosComunes.scss'
import Inicio from "./paginas/inicio"
import Experiencia from "./paginas/experiencia"

// import * as serviceWorker from './serviceWorker';

export default class Router extends React.Component {

  render() {
    return <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Inicio} />
        <Route exact path="/experiencia" component={Experiencia} />
        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  }
}

ReactDOM.render(
  <Router />, document.getElementById('root')
)
// serviceWorker.register()