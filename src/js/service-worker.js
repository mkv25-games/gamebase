const cacheName = 'gamebase-service-id'
const filesToCache = [
  '/',
  '/index.html',
  '/js/app.js',
  '/js/start.js',
  '/images/favicon.png',
  '/images/icons-192.png',
  '/images/icons-512.png',
  '/images/phaser.png',
  '//code.jquery.com/jquery-3.2.1.slim.min.js',
  '//cdnjs.cloudflare.com/ajax/libs/phaser-ce/2.9.1/phaser.min.js'
]

function serviceWorkerReport(...messages) {
  console.log('[Gamebase Service Worker]', ...messages)
}

self.addEventListener('install', function(event) {
  // Perform install steps
  serviceWorkerReport('Install');
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      serviceWorkerReport('Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(event) {
  serviceWorkerReport('Activate');
  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          serviceWorkerReport('Removing old cache shell', key);
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', (event) => {
  serviceWorkerReport('Fetch');
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
