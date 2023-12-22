const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching

const assetCache = new CacheFirst(
  {
    cacheName: 'asset-cache', //creates a cache called 'asset-cache'
    plugins:
    [
      new CacheableResponsePlugin({statuses: [0, 200]}), // The cache has responses 0-200 available
      new ExpirationPlugin({maxAgeSeconds: 30 * 24 * 60 * 60}), //The cache contents will expire after a month
    ],
  });
  
  //This will route any image assets to be stored in the 'asset-cache' cache
  registerRoute(({request}) => request.destination === 'image', assetCache);
