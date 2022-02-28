//activate cache

const CACHE_NAME = 'version - 1';

const urlsToCache = ['index.html', 'offline.html']
;

//this is our serviceworker

const self = this;

//events for the installation of the servcieworker

self.addEventListener('install',
    (event) => {

        event.waitUntil(
            caches.open(CACHE_NAME)

                .then((cache) => {

                    console.log('opened cache')
                    ;

                    return cache.addAll(urlsToCache);

                })
        )

    }
)
//listen to request

self.addEventListener('fetch',
    (event) => {

        // answer with requested response

        event.respondWith(
            //request for example on image or API-call

            caches.match(event.request)

                .then(() => {

                    return fetch(event.request)

                        .catch(() => caches.match('./offline.html'))

                })
        )

    }
)
//activate serviceworker

self.addEventListener('activate',
    (event) => {

        const cacheWhitelist = [];

        cacheWhitelist.push(CACHE_NAME);

        event.waitUntil(
            caches.keys().then((cacheNames) => Promise.all(
                    cacheNames.map((cacheName) => {

                        if (!cacheWhitelist.includes(cacheName)) {

                            return caches.delete(cacheName);

                        }

                    })
                )
            ))

    }
)