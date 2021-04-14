import React from 'react'
import './estilos.scss'
import Menu from '../../componentes/menu'
import educacion from '../../json/educacion.json'

export default class Educacion extends React.Component {

    verEducacion() {
        let arrayEducacion = []
        for (const instituto of educacion.educacion) {

            arrayEducacion.push(<div className="instituto" key={arrayEducacion.length}>
                <div className="nombre">{instituto.nombre}</div>
                <div className="estudio">{instituto.estudio}</div>
                <div className="descripcion">{instituto.descripcion}</div>
            </div>)
        }
        return arrayEducacion
    }

    render() {
        return (
            <>
                <Menu pagina="educacion" />
                <main id="educacion" >
                    <h1>Mi educación</h1>
                    {this.verEducacion()}
                </main>
            </>
        )
    }

}