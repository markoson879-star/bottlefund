const CACHE_NAME = "bottlefund-cache-v4";
const ASSETS = [
  "./",
  "./index.html",
  "./stock.html",
  "./style.css?v=4",
  "./script.js?v=4",
  "./manifest.json?v=4",
  "./icon.png",
  "./berlin.png",
  "./stock.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : null)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((cached) => cached || fetch(event.request))
  );
});
