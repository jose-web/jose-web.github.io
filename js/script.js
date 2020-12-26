window.onload = function () {
    muestraEdad()
    animaMenu()
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
                    let repositorio = "<div><div>"
                    repositorio += '<span class="nombreRepositorio">' + res[i].name + '</span>'
                    repositorio += res[i].homepage ? '<a title="Ver la web" href="' + res[i].homepage + '" target="_blank"><i class="fas fa-external-link-alt"></i></a>' : ""
                    repositorio += '<a title="Ver en GitHub" href="' + res[i].html_url + '" target="_blank"><i class="fab fa-github"></i></a>'
                    repositorio += "</div>"

                    // COMENTADO PARA REDISEÑAR UN ESTILO DESPUÉS

                    // let topics = res[i].topics
                    // if (topics.length != 0) {
                    //     repositorio += " Etiquetas: "
                    //     for (let o = 0; o < topics.length; o++)
                    //         repositorio += "<span>" + (o == topics.length - 1 ? " y " : o != 0 ? ", " : "") + topics[o] + "</span>"
                    // }

                    repositorio += "</div>"
                    this.document.getElementById("repositorios").innerHTML += repositorio
                }
            }
        });
}

function animaMenu() {
    // Cache selectors
    let lastId,
        topMenu = $("#menu, #arriba"),
        topMenuHeight = topMenu.outerHeight(),
        // All list items
        menuItems = topMenu.find("a"),
        // Anchors corresponding to menu items
        scrollItems = menuItems.map(function () {
            let item = $($(this).attr("href"));
            if (item.length) { return item; }
        });

    // Bind click handler to menu items
    // so we can get a fancy scroll animation
    menuItems.click(function (e) {
        let href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 1000);
        e.preventDefault();
    });

    // Bind to scroll
    $(window).scroll(function () {
        // Get container scroll position
        let fromTop = $(this).scrollTop() + topMenuHeight;

        // Get id of current scroll item
        let cur = scrollItems.map(function () {
            if ($(this).offset().top < fromTop)
                return this;
        });
        // Get the id of the current element
        cur = cur[cur.length - 1];
        let id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            menuItems
                .parent().removeClass("active")
                .end().filter("[href='#" + id + "']").parent().addClass("active");
        }
    });
}