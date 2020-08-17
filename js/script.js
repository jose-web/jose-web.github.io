window.onload = function () {
    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 80,
                "density":
                {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle"
            },
            "opacity": {
                "value": 1,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 0.2,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": false,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.05524295060491032,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": false,
                    "mode": "bubble"
                }, "onclick": {
                    "enable": false,
                    "mode": "repulse"
                },
                "resize": true
            }, "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                }, "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                }
            }
        },
        "retina_detect": true
    });

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
                        repositorio += "<p>"
                        for (let o = 0; o < topics.length; o++) {
                            repositorio += "<span>" + topics[o] + "</span>"
                        }
                        repositorio += "</p>"
                        console.log(res[i].html_url)
                    }

                    repositorio += "</div>"
                    this.document.getElementById("repositorios").innerHTML += repositorio
                }
            }
        });
}