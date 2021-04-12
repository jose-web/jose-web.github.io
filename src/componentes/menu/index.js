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
                <ul>
                    <li className={this.state.select("inicio")}><Link to="/" ><i className="fas fa-home"></i> Inicio</Link></li>
                    <li className={this.state.select("experiencia")} ><Link to="/experiencia" ><i className="fas fa-briefcase"></i> Experiencia</Link></li>
                    <li className={this.state.select("educacion")} ><Link to="/educacion" >‍<i className="fas fa-graduation-cap"></i> Educación</Link></li>
                    <li className={this.state.select("proyectos")} ><Link to="/proyectos" ><i className="fas fa-file-code"></i> Proyectos</Link></li>
                    {/* 
                    <li>Administración
                        <ul>
                            <li><Link to="/" key="inicio" >Productos</Link></li>
                            <li><Link to="/admin/facturas" key="facturas" >Facturas</Link></li>
                            <li><Link to="/admin/usuarios" key="usuarios" >Usuarios</Link></li>
                        </ul>
                    </li> 
                    */}
                </ul>
                <div id="contacto">
                    <a href="https://www.linkedin.com/in/jose-web" target="_blank" rel="noreferrer"><i className="fab fa-linkedin"></i></a>

                    <a href="mailto:delossantosramosjose@gmail.com" title="delossantosramosjose@gmail.com"><i className="fas fa-envelope"></i></a>
                </div>
            </div>
        )
    }
}