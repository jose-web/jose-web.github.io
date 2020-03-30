let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        let json = JSON.parse(this.responseText);

        let repositorios = document.getElementById("repositorios");
        for (let i = 0; i < json.length; i++) {
            if (json[i].name != "jose-web.github.io") {
                let repositorio = document.createElement("div");
                repositorio.className = "repositorio";

                let parrafo = document.createElement("p");
                parrafo.innerHTML += json[i].name;
                repositorio.appendChild(parrafo);

                let enlace = document.createElement("a");
                enlace.href = json[i].html_url;
                enlace.innerHTML = "GitHub";
                enlace.target = "_blank";
                repositorio.appendChild(enlace);

                if (json[i].has_pages) {
                    enlace = document.createElement("a");
                    enlace.href = json[i].name;
                    enlace.innerHTML = "Web";
                    enlace.target = "_blank";
                    repositorio.appendChild(enlace);
                }
                repositorios.appendChild(repositorio);
            }
        }
    }
};

window.onload = function () {
    xhttp.open("GET", "https://api.github.com/users/jose-web/repos", true);
    xhttp.send();
}