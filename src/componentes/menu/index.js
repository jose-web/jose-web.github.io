import React from 'react'
import './estilos.scss'
import { Link } from "react-router-dom"

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            select: (pagina) => props.pagina === pagina ? "selected" : ""
        };
    }

    render() {
        return (
            <div id="menuPrincipal" >
                <Link id="miNombre" to="/" title="JOSE DE LOS SANTOS RAMOS">JOSE-WEB</Link>
                <input type="checkbox" id="menuPequeValor" />
                <ul>
                    <li className={this.state.select("inicio")}><Link to="/" ><i className="fas fa-home"></i> Inicio</Link></li>
                    <li className={this.state.select("experiencia")} ><Link to="/experiencia" ><i className="fas fa-briefcase"></i> Experiencia</Link></li>
                    <li className={this.state.select("educacion")} ><Link to="/educacion" >‍<i className="fas fa-graduation-cap"></i> Educación</Link></li>
                    <li className={this.state.select("proyectos")} ><Link to="/proyectos" ><i className="fas fa-file-code"></i> Proyectos</Link></li>

                    <li id="redes"><a href="https://www.linkedin.com/in/jose-web" target="_blank" rel="noreferrer"><i className="fab fa-linkedin"></i> <span className="soloMovil">LinkedIn</span></a></li>
                    <li><a href="mailto:delossantosramosjose@gmail.com" title="delossantosramosjose@gmail.com"><i className="fas fa-envelope"></i> <span className="soloMovil">Correo electrónico</span></a></li>
                </ul>
                <label id="menuPeque" htmlFor="menuPequeValor">
                    <span /><span /><span />
                </label>
                <div id="fondo"></div>
            </div>
        )
    }
}