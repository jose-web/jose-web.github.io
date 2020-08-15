const COD_ACTUALIZACION = 'v1'

self.addEventListener('install', function (evento) {
    evento.waitUntil(
        caches.open(COD_ACTUALIZACION).then(function (cache) {
            return cache.addAll([
                'index.html',
                'sw.js',
                'js/script.js',
                'css/estilos.css'
            ])
        })
    )
})


self.addEventListener('activate', function (evento) {
    evento.waitUntil(
        caches.keys().then(function (keys) {
            return Promise.all(keys.filter(function (key) {
                return key !== COD_ACTUALIZACION //Antigua versión
            }).map(function (key) {
                return caches.delete(key) //Borra los SW con una versión antigua
            }))
        })
    )
})

self.addEventListener('fetch', event => {
    event.respondWith(fromCache(event.request));
    event.waitUntil(
        update(event.request)
    );
});

function fromCache(request) {
    return caches.open(COD_ACTUALIZACION).then(cache => {
        return cache.match(request);
    });
}

function update(request) {
    caches.open(COD_ACTUALIZACION).then(cache => {
        fetch(request).then(response => {
            cache.put(request, response)
        });
    });
}