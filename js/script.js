let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        let json = JSON.parse(this.responseText);

        let arrayRepos = [];

        for (let i = 0; i < json.length; i++) {
            if (json[i].name != "jose-web.github.io") {
                if (json[i].description != null) {
                    let descripcion = json[i].description.split("|")
                    let tags = descripcion[1].split("#")
                    for (let o = 1; o < tags.length; o++) {
                        let etiqueta = tags[o].trim();
                        if (typeof arrayRepos[etiqueta] == "undefined")
                            arrayRepos[etiqueta] = [];
                        arrayRepos[etiqueta].push(json[i]);
                    }
                }
                if (typeof arrayRepos[json[i].language] == "undefined")
                    arrayRepos[json[i].language] = [];
                arrayRepos[json[i].language].push(json[i]);
            }
        }

        let repositorios = document.getElementById("repositorios");

        for (const etiqueta in arrayRepos) {

            let grupo = document.createElement("div");
            grupo.className = "grupo";

            let tituloGrupo = document.createElement("div");
            tituloGrupo.className = "tituloGrupo";
            tituloGrupo.innerHTML += etiqueta;
            grupo.appendChild(tituloGrupo)

            let grupoRepositorios = document.createElement("div");
            grupoRepositorios.className = "grupoRepositorios";
            grupo.appendChild(grupoRepositorios)

            for (let i = 0; i < arrayRepos[etiqueta].length; i++) {
                let repo = arrayRepos[etiqueta][i];

                let repositorio = crearNodo({
                    clase: "repositorio",
                    padre: grupoRepositorios
                });

                crearNodo({
                    clase: "nombreRepositorio",
                    contenido: cambiaGuionPorEspacios(repo.name),
                    padre: repositorio
                });

                crearNodo({
                    tipo: "a",
                    clase: "GitHub",
                    href: repo.html_url,
                    contenido: "GitHub",
                    padre: repositorio
                });

                if (repo.has_pages) {
                    crearNodo({
                        tipo: "a",
                        clase: "web",
                        href: repo.name,
                        contenido: "web",
                        padre: repositorio
                    });
                }
            }

            repositorios.appendChild(grupo);
        }
    }
};

window.onload = function () {
    xhttp.open("GET", "https://api.github.com/users/jose-web/repos", true);
    xhttp.send();
}

function crearNodo(opciones) {
    let nodo;

    if (typeof opciones.tipo == "undefined")
        nodo = document.createElement("div");
    else
        nodo = document.createElement(opciones.tipo);


    if (typeof opciones.clase != "undefined")
        nodo.className = opciones.clase;

    if (typeof opciones.href != "undefined")
        nodo.href = opciones.href;

    if (opciones.tipo == "a")
        nodo.target = "_blank";

    if (typeof opciones.contenido != "undefined")
        nodo.innerHTML = opciones.contenido;


    if (typeof opciones.padre != "undefined")
        opciones.padre.appendChild(nodo);


    return nodo


}

function cambiaGuionPorEspacios(palabra) {
    while (palabra.includes("-")) {
        palabra = palabra.replace("-", " ")
    }
    return palabra
}