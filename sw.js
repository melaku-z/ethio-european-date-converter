/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-01d9f47c'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "assets/app-1e60832f.js",
    "revision": null
  }, {
    "url": "assets/index-95c5e6dd.css",
    "revision": null
  }, {
    "url": "assets/pwa-4501c027.js",
    "revision": null
  }, {
    "url": "assets/workbox-window.prod.es5-295a6886.js",
    "revision": null
  }, {
    "url": "google4ea6bc293950abe1.html",
    "revision": "f5390ad846f57f3cc1e069e1ca354a23"
  }, {
    "url": "index.html",
    "revision": "a54f32639ef04276a6a003b0ffe55e8d"
  }, {
    "url": "icons-b23883c8/android-chrome-36x36.png",
    "revision": "656b2f5cfdae0e548abee573998395fb"
  }, {
    "url": "icons-b23883c8/android-chrome-48x48.png",
    "revision": "c4f06b06760bfcba0607c45a47bbcc95"
  }, {
    "url": "icons-b23883c8/android-chrome-72x72.png",
    "revision": "27578c1b3f11c5d244f99e9f3bf8e9d6"
  }, {
    "url": "icons-b23883c8/android-chrome-96x96.png",
    "revision": "93ee145e33793b6fe7d0e842bebcdea5"
  }, {
    "url": "icons-b23883c8/android-chrome-144x144.png",
    "revision": "9437d14c1ef2bd49e6214f963edebca2"
  }, {
    "url": "icons-b23883c8/android-chrome-192x192.png",
    "revision": "da72a5a226c632f7e94548e6033e61fb"
  }, {
    "url": "icons-b23883c8/android-chrome-256x256.png",
    "revision": "f0e2b7c86a2a2e0bd5eeff3a9dedd326"
  }, {
    "url": "icons-b23883c8/android-chrome-384x384.png",
    "revision": "d8ee97f11a2db74e7ab799a8d254e86d"
  }, {
    "url": "icons-b23883c8/android-chrome-512x512.png",
    "revision": "8f4ecd8960c52e6451c774404a47e641"
  }, {
    "url": "icons-b23883c8/icons.svg",
    "revision": "6ed1638e1bf3bf512a7da04a7a1331ce"
  }, {
    "url": "manifest.webmanifest",
    "revision": "4d275df851ee3f1b06b856470ff9343e"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));

}));
