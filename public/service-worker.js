const serviceWorkerVersion = '0.1.0'
const cacheName = 'MyPdfSlideshowPWA-v' + serviceWorkerVersion

const appShellFiles = [
    './index.html',
    './app.js',
    './app.css',
    './images/mps-icon-128-16x16.png',
    './images/mps-icon-128-32x32.png',
    './images/mps-icon-128-48x48.png',
    './images/mps-icon-128-64x64.png',
    './images/mps-icon-128-128x128.png',
    './lib/lodash/full.min.js',
    './lib/pdfjs/pdf.js',
    './lib/pdfjs/pdf.worker.js'
]
const otherFiles = []
const contentToCache = appShellFiles.concat(otherFiles)

self.addEventListener('install', function (evt) {
    console.log('[Service Worker] Installing... version: ' + serviceWorkerVersion + ' cacheName:' + cacheName)
    // use newly installed service worker.
    // returned Promise from skipWaiting() can be safely ignored.
    self.skipWaiting()
    evt.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log('[Service Worker] Caching all: app shell and content')
            return cache.addAll(contentToCache)
        })
    )
})


self.addEventListener('fetch', function (evt) {
    evt.respondWith(
        caches.match(evt.request).then(function (r) {
            console.log('[Service Worker] Fetching resource: ' + evt.request.url)
            // we don't store falsy objects, so '||' works fine here.
            return r || fetch(evt.request).then(function (response) {
                return caches.open(cacheName).then(function (cache) {
                    console.log('[Service Worker] Caching new resource: ' + evt.request.url)
                    cache.put(evt.request, response.clone())
                    return response
                })
            })
        })
    )
})