const V = 'gl-v6';
self.addEventListener('install', function(e) {
  self.skipWaiting();
});
self.addEventListener('activate', function(e) {
  self.clients.claim();
  e.waitUntil(
    caches.keys().then(function(ks) {
      return Promise.all(ks.filter(function(k){ return k!==V; }).map(function(k){ return caches.delete(k); }));
    })
  );
});
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(r){ return r || fetch(e.request); })
  );
});
