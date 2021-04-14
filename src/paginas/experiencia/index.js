import React from 'react'
import './estilos.scss'
import Menu from '../../componentes/menu'
import experiencia from '../../json/experiencia.json'

export default class Experiencia extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    verExperiencia() {
        let arrayEmpresas = []
        for (const empresa of experiencia.experiencia) {

            let cargos = []
            for (const cargo of empresa.cargos) {
                cargos.push(<div className="cargo" key={cargos.length}>
                    <div className="nombre">{cargo.cargo}</div>
                    <div className="contrato">{cargo.contrato}</div>
                    <div className="duracion">{cargo.duracion}</div>
                    <div className="descripcion">{cargo.descripcion}</div>
                </div>)
            }

            arrayEmpresas.push(<div className="empresa" key={arrayEmpresas.length}>
                <div className="nombre">{empresa.empresa}</div>
                <div className="cargos">
                    {cargos}
                </div>
            </div>)

        }

        return arrayEmpresas
    }


    render() {
        return (
            <>
                <Menu pagina="experiencia" />
                <main id="experiencia" >
                    {this.verExperiencia()}
                </main>
            </>
        )
    }

}