self.addEventListener('install', (e) => {
  console.log('Service Worker instalado!');
});

self.addEventListener('fetch', (e) => {
  // O navegador exige que o evento fetch seja escutado
  e.respondWith(fetch(e.request));
});
