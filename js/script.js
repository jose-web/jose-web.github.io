let arrayRepositorios = []
let arrayRepositoriosBusca = []

window.onload = function () {


    fetch("https://api.github.com/users/jose-web/repos", {
        method: 'GET',
        headers: { "Accept": "application/vnd.github.mercy-preview+json" }

    }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(res => {

            for (let i = 0; i < res.length; i++) {
                if (res[i].name != "jose-web.github.io") {
                    let topics = res[i].topics
                    if (topics.length != 0) {
                        for (let o = 0; o < topics.length; o++) {
                            if (typeof arrayRepositorios[topics[o]] == "undefined")
                                arrayRepositorios[topics[o]] = []
                            arrayRepositorios[topics[o]].push(res[i])
                        }
                    }
                    arrayRepositoriosBusca.push(res[i])
                }
            }
            this.document.getElementById("repositorios").innerHTML = ""
            mostrarRepositorios(arrayRepositorios)

        });
}

function mostrarRepositorios(arrayRepositorios) {
    let repositorios = ""
    for (let indice in arrayRepositorios) {
        repositorios += `<div class="grupo"><h2>${cambiaGuionPorEspacios(indice)}</h2>`

        let dentroArray = arrayRepositorios[indice]

        for (let i = 0; i < dentroArray.length; i++) {
            repositorios += `
            <div class="repositorio">
            <h3>${cambiaGuionPorEspacios(dentroArray[i].name)}</h3>
            <a href="${dentroArray[i].html_url}" target="_blank">VER EN GITHUB</a>
            ${dentroArray[i].has_pages ? `<a href="${dentroArray[i].homepage}" target="_blank">VER EN WEB</a>` : ''}
            </div>
            `
        }
        repositorios += `</div>`
    }

    this.document.getElementById("repositorios").innerHTML += repositorios
}

function cambiaGuionPorEspacios(palabra) {
    while (palabra.includes("-")) {
        palabra = palabra.replace("-", " ")
    }
    return palabra
}

function buscaRepositorio() {
    this.document.getElementById("repositorios").innerHTML = ""

    let busqueda = document.getElementById("inputBusca").value.trim()
    if (busqueda == "") {
        mostrarRepositorios(arrayRepositorios)
    } else {
        let repositorios = ""
        for (let i = 0; i < arrayRepositoriosBusca.length; i++) {
            if (cambiaGuionPorEspacios(arrayRepositoriosBusca[i].name).indexOf(busqueda) != -1)
                repositorios += `
        <div class="repositorio">
        <h3>${cambiaGuionPorEspacios(arrayRepositoriosBusca[i].name)}</h3>
        <a href="${arrayRepositoriosBusca[i].html_url}" target="_blank">VER EN GITHUB</a>
        ${arrayRepositoriosBusca[i].has_pages ? `<a href="${arrayRepositoriosBusca[i].homepage}" target="_blank">VER EN WEB</a>` : ''}
        </div>
        `
        }

        let buscaTopics = []

        for (const indice in arrayRepositorios) {
            if (cambiaGuionPorEspacios(indice).indexOf(busqueda) != -1) {
                if (typeof buscaTopics[indice] == "undefined")
                    buscaTopics[indice] = []
                buscaTopics[indice] = arrayRepositorios[indice]
            }
        }
        this.document.getElementById("repositorios").innerHTML = repositorios
        mostrarRepositorios(buscaTopics)
    }
}