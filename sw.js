const C = 'saaraati-v2';
const FILES = ['./', './index.html', './manifest.json', './css/style.css',
  './js/foods-data.js', './js/core.js', './js/sync.js', './js/foods.js', './js/views.js', './js/sheets.js', './js/app.js'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(C).then(c => c.addAll(FILES)));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== C).map(x => caches.delete(x)))));
  self.clients.claim();
});
// الشبكة أولاً (تصل التحديثات فوراً)، وإذا انقطع النت يخدم من الكاش
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  e.respondWith(
    fetch(e.request)
      .then(r => { const cp = r.clone(); caches.open(C).then(c => c.put(e.request, cp)); return r; })
      .catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
  );
});
