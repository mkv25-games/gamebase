var cacheName = 'gamebase-service-id'
var filesToCache = [
  '/',
  '/index.html',
  'js/app.js',
  'js/start.js',
  'images/favicon.png',
  'images/icons-192.png',
  'images/icons-512.png',
  'images/phaser.png',
  '//code.jquery.com/jquery-3.2.1.slim.min.js',
  '//cdnjs.cloudflare.com/ajax/libs/phaser-ce/2.9.1/phaser.min.js'
]

self.addEventListener('install', function(e) {
  console.log('[Gamebase Service Worker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[Gamebase Service Worker] Caching app shell')
      return cache.addAll(filesToCache)
    })
  )
})

self.addEventListener('activate', function(e) {
  console.log('[Gamebase Service Worker] Activate')
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[Gamebase Service Worker] Removing old cache', key)
          return caches.delete(key)
        }
      }))
    })
  )
  return self.clients.claim()
})

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url)
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request)
    })
  )
})
