
window.onload = function () {

    fetch("https://api.github.com/users/jose-web/repos", {
        method: 'GET',
        headers: { "Accept": "application/vnd.github.mercy-preview+json" }

    }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(res => {


            let arrayTopics = []

            for (let i = 0; i < res.length; i++) {
                if (res[i].name != "jose-web.github.io") {
                    let topics = res[i].topics
                    if (topics.length != 0) {
                        for (let o = 0; o < topics.length; o++) {
                            if (typeof arrayTopics[topics[o]] == "undefined")
                                arrayTopics[topics[o]] = []
                            arrayTopics[topics[o]].push(res[i])
                        }

                    }

                }
            }

            let repositorios = ""

            for (let indice in arrayTopics) {



                repositorios += `<div class="grupo"><h2>${cambiaGuionPorEspacios(indice)}</h2>`

                let dentroArray = arrayTopics[indice]

                for (let i = 0; i < dentroArray.length; i++) {
                    repositorios += `
                    <div class="repositorio">
                    <h3>${cambiaGuionPorEspacios(dentroArray[i].name)}</h3>
                    <a href="${dentroArray[i].html_url}" target="_blank">VER EN GITHUB</a>
                    ${dentroArray[i].has_pages?`<a href="${dentroArray[i].homepage}" target="_blank">VER EN WEB</a>`:''}
                    </div>
                    `
                }
                repositorios += `</div>`

            }

            this.console.log(arrayTopics)
            this.document.getElementById("repositorios").innerHTML = repositorios

        });

}

function cambiaGuionPorEspacios(palabra) {
    while (palabra.includes("-")) {
        palabra = palabra.replace("-", " ")
    }
    return palabra
}