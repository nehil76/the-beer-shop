
var siteCache = "site-cache-v6";

var cachedFiles = [
    'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.8/angular.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css',
    'https://fonts.gstatic.com/s/materialicons/v52/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
    'https://fonts.gstatic.com/s/materialicons/v52/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
    'https://use.fontawesome.com/releases/v5.7.1/webfonts/fa-solid-900.woff2',
    'https://use.fontawesome.com/releases/v5.7.1/css/all.css',
    'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js',
    
    '/index',
    '/fallback',
    '/src/css/master.css',
    '/src/js/beer-ui.js',    
    '/src/js/beer.js',
    '/beerdetails',
    '/manifest.json'
];

self.addEventListener("install", evt => {
  console.log("service worker has been installed");
  evt.waitUntil(
  caches.open(siteCache).then((cache) =>{
      cache.addAll(cachedFiles);
  }));
});

self.addEventListener("activate", evt =>{
    console.log("service worker has been activated");
    evt.waitUntil(
    caches.keys().then(keys => Promise.all(
        keys.map(key => {
            if (key !== siteCache) {
                return caches.delete(key);
              }
        })
        ))
    );
});

self.addEventListener("fetch", evt =>{
    console.log("fetching");
    evt.respondWith(
        caches.match(evt.request.url).then(catchesRes =>{
           return catchesRes || fetch(evt.request).then(resp =>{
                if(resp && resp.ok){
                    return resp;
                }
                return caches.match("/fallback");
            })
        })
    );
});

