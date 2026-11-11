// Ma Bulle : marche hors connexion. Réseau d'abord (toujours la dernière version), cache si pas de réseau.
const C = "ma-bulle-v11", F = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "miku-salut.png", "miku-douce.png", "miku-fete.png", "seances/seances.js", "voix/01.mp3", "voix/02.mp3", "voix/03.mp3", "voix/04.mp3", "voix/05.mp3", "voix/06.mp3", "voix/07.mp3", "voix/08.mp3", "voix/09.mp3", "voix/10.mp3", "voix/11.mp3", "voix/12.mp3", "voix/13.mp3", "voix/14.mp3", "voix/15.mp3", "voix/16.mp3", "voix/17.mp3", "voix/18.mp3", "voix/19.mp3", "voix/20.mp3", "voix/21.mp3", "voix/22.mp3", "voix/23.mp3", "voix/24.mp3", "voix/25.mp3", "voix/26.mp3", "voix/27.mp3", "voix/28.mp3", "voix/voix.js"];
self.addEventListener("install", e => { e.waitUntil(caches.open(C).then(c => c.addAll(F))); self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(n => n !== C).map(n => caches.delete(n))))); self.clients.claim(); });
self.addEventListener("fetch", e => {
  if (e.request.headers.has("range")) return;   // audio lu par morceaux (iPhone) : laisser le navigateur faire
  e.respondWith(fetch(e.request).then(r => { const cp = r.clone(); caches.open(C).then(c => c.put(e.request, cp)); return r; }).catch(() => caches.match(e.request)));
});
