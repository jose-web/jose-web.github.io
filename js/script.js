window.onload = function () {
    muestraEdad()
    muestraRepositorios()
}

function muestraEdad() {
    let hoy = new Date();
    let cumpleanos = new Date("1996/12/13");
    let edad = hoy.getFullYear() - cumpleanos.getFullYear();
    let m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }
    document.getElementById("edad").innerHTML = edad
}

function muestraRepositorios() {
    fetch("https://api.github.com/users/jose-web/repos", {
        method: 'GET',
        headers: { "Accept": "application/vnd.github.mercy-preview+json" }

    }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(res => {

            for (let i = 0; i < res.length; i++) {
                if (res[i].name != "jose-web.github.io") {
                    let repositorio = "<div><p>"
                    repositorio += res[i].name
                    repositorio += '<a title="Ver en GitHub" href="' + res[i].html_url + '" target="_blank"><i class="fab fa-github"></i></a>'
                    repositorio += res[i].homepage == "" ? "" : '<a title="Ver la web" href="' + res[i].homepage + '" target="_blank"><i class="fas fa-external-link-alt"></i></a>'
                    repositorio += "</p>"
                    let topics = res[i].topics
                    if (topics.length != 0) {
                        for (let o = 0; o < topics.length; o++) {
                            repositorio += "<span>" + topics[o] + "</span>"
                        }
                        console.log(res[i].html_url)
                    }

                    repositorio += "</div>"
                    this.document.getElementById("repositorios").innerHTML += repositorio
                }
            }
        });
}