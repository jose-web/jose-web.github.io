import React from 'react'
import './estilos.scss'
import Menu from '../../componentes/menu'

export default class Proyectos extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            repositorios: []
        };
    }

    componentDidMount() {
        let repositorios = []

        fetch("https://api.github.com/users/jose-web/repos", {
            method: 'GET',
            headers: { "Accept": "application/vnd.github.mercy-preview+json" }

        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(res => {
                for (let i = 0; i < res.length; i++) {
                    let repositoriosOcultos = ["jose-web.github.io", "jose-web"]
                    if (!repositoriosOcultos.includes(res[i].name)) {

                        repositorios.push(<div className="repositorio" key={i}>
                            <span className="nombreRepositorio">{res[i].name}</span>
                            {res[i].homepage ? <a title="Ver la web" href={res[i].homepage} target="_blank" rel="noreferrer"><i className="fas fa-external-link-alt"></i></a> : ""}
                            <a title="Ver en GitHub" href={res[i].html_url} target="_blank" rel="noreferrer"><i className="fab fa-github"></i></a>
                        </div>)
                    }

                }
                this.setState({ repositorios })
            })


    }


    render() {
        return (
            <>
                <Menu pagina="proyectos" />
                <main id="proyectos" >
                    <h1>Mis proyectos</h1>
                    {this.state.repositorios}
                </main>
            </>
        )
    }

}