self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("bottlefund-store").then((cache) => {
      return cache.addAll([
        "./",
        "./index.html",
        "./style.css",
        "./script.js",
        "./berlin.png",
        "./icon.png"
      ]);
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
