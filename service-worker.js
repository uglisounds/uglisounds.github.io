// Den gamla React-sidan registrerade en Workbox-service worker som cachade sidan.
// Den här versionen ersätter den: tömmer all cache, avregistrerar sig och laddar om
// öppna flikar, så att besökarna får den nya statiska sidan.
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (event) {
  event.waitUntil((async function () {
    const keys = await caches.keys();
    await Promise.all(keys.map(function (k) { return caches.delete(k); }));
    await self.registration.unregister();
    const clients = await self.clients.matchAll({ type: 'window' });
    clients.forEach(function (c) { c.navigate(c.url); });
  })());
});
