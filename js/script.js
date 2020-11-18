window.onload = function () {
    aplicarTema()
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
                let repositoriosOcultos = ["jose-web.github.io", "jose-web"]
                if (!repositoriosOcultos.includes(res[i].name)) {
                    let repositorio = "<div><p>"
                    repositorio += res[i].name
                    repositorio += ' (Ver en <a title="Ver en GitHub" href="' + res[i].html_url + '" target="_blank">Github</a>'
                    repositorio += res[i].homepage == "" ? "" : ' o en la <a title="Ver la web" href="' + res[i].homepage + '" target="_blank">Web</a>'
                    repositorio += ")</p>"
                    let topics = res[i].topics
                    if (topics.length != 0)
                        for (let o = 0; o < topics.length; o++)
                            repositorio += "<span>" + topics[o] + "</span>"

                    repositorio += "</div>"
                    this.document.getElementById("repositorios").innerHTML += repositorio
                }
            }
        });
}

function fondo($item, $tema) {
    let isArray = Array.isArray($item)
    for (let i = 0; i < 15; i++) {
        let marginIzquierda = Math.trunc(Math.random() * 100)
        let marginArriba = Math.trunc(Math.random() * 100)
        let scale = Math.trunc(Math.random() * 3) + 1
        let item = isArray ? $item[Math.trunc(Math.random() * $item.length)] : $item

        document.getElementById("fondo").innerHTML += `<span style='
        left:${marginIzquierda}%; 
        top:${marginArriba}%; 
        transform:scale(${scale});
        '>${item}</span>`
    }

    document.getElementsByTagName("body")[0].setAttribute("id", $tema);
}

function aplicarTema() {
    let hoy = new Date()
    let dia = hoy.getDate()
    let mes = hoy.getMonth()

    if (mes == 9)
        fondo(["🎃", "🧟", "👻", "🕷", "🍬"], "halloween")
    else if (dia == 13 && mes == 11)
        fondo(["🎁", "🎂", "🎈", "🥳"], "")
    else if (mes == 11)
        fondo(["🎅", "❄️", "⛄", "🎄", "🎁", "🍪"], "invierno")

}