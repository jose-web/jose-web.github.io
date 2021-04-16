import React from 'react'
import './estilos.scss'
import Menu from '../../componentes/menu'
import inicio from '../../json/inicio.json'

export default class Inicio extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            edad: this.muestraEdad()
        };
    }

    muestraEdad() {
        let hoy = new Date();
        let cumpleanos = new Date("1996/12/13");
        let edad = hoy.getFullYear() - cumpleanos.getFullYear();
        let m = hoy.getMonth() - cumpleanos.getMonth();

        if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
            edad--;
        }
        return edad
    }

    render() {
        return (
            <>
                <Menu pagina="inicio" />
                <main id="inicio" >
                <img src="https://www.gravatar.com/avatar/9d08418b5f4ec35334131f12339e5e6d.jpg?s=256" alt="Avatar" />
                        <h1>Hola, me llamo Jose de los santos y soy programador web</h1>
                    <div className="presentacion">
                        <p className="titulo">Personal</p>
                        <p>{inicio.presentacion.replace("$edad", this.state.edad)}</p>
                    </div>
                    <div className="presentacion">
                        <p className="titulo">Sobre mi</p>
                        <p>{inicio.sobreMi}</p>
                    </div>
                    <div className="presentacion">
                        <p className="titulo">Trabajo en equipo</p>
                        <p>{inicio.equipo}</p>
                    </div>
                </main>
            </>
        )
    }

}