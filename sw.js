const CACHE_NAME = 'innovax-bom-validator-v3';
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/assets/demo.css',
  '/assets/demo.js',
  '/assets/icon.svg',
  '/manifest.webmanifest',
  '/stitch_innovax_bom_validator_pro/assembly_search/',
  '/stitch_innovax_bom_validator_pro/bom_explorer/',
  '/stitch_innovax_bom_validator_pro/validation_engine/',
  '/stitch_innovax_bom_validator_pro/bom_comparator/',
  '/stitch_innovax_bom_validator_pro/reports_history/'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request).then((cached) => cached || caches.match('/offline.html') || caches.match('/')))
    );
    return;
  }
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request).then((cached) => cached || caches.match('/')))
  );
});
