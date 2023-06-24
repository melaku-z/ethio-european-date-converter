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
define(['./workbox-ab7aa862'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "assets/app-7cc80f14.js",
    "revision": null
  }, {
    "url": "assets/index-7274410b.css",
    "revision": null
  }, {
    "url": "assets/workbox-window.prod.es5-a7b12eab.js",
    "revision": null
  }, {
    "url": "google4ea6bc293950abe1.html",
    "revision": "f5390ad846f57f3cc1e069e1ca354a23"
  }, {
    "url": "index.html",
    "revision": "cfedde92633473c3c68a80675f104fbc"
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
    "revision": "0b02079eea64e85f9be7298578c00b26"
  }, {
    "url": "icons-b23883c8/windows11/LargeTile.scale-100.png",
    "revision": "926c066e6aef6c9702b84c2866b66c3e"
  }, {
    "url": "icons-b23883c8/windows11/LargeTile.scale-125.png",
    "revision": "ee5d141de669a5ce11162466e86d6269"
  }, {
    "url": "icons-b23883c8/windows11/LargeTile.scale-150.png",
    "revision": "f72471fc5d54e69557be50671d69d5bc"
  }, {
    "url": "icons-b23883c8/windows11/LargeTile.scale-200.png",
    "revision": "51fa1a742dc9b1d0b364cd39c4ba47a0"
  }, {
    "url": "icons-b23883c8/windows11/LargeTile.scale-400.png",
    "revision": "9b27424f6b717b47fd794c375fa298ef"
  }, {
    "url": "icons-b23883c8/android/android-launchericon-512-512.png",
    "revision": "e76b9072bad1b6c82cbbf44f996b2f0e"
  }, {
    "url": "icons-b23883c8/android/android-launchericon-192-192.png",
    "revision": "80996b103e64f2a8847f8f23a1519ab2"
  }, {
    "url": "icons-b23883c8/android/android-launchericon-144-144.png",
    "revision": "f5f1588b53bc4c60e97a4b8aa8aa9dea"
  }, {
    "url": "icons-b23883c8/android/android-launchericon-96-96.png",
    "revision": "fd25dd6b86a7949357a59a610bfbdfec"
  }, {
    "url": "icons-b23883c8/android/android-launchericon-72-72.png",
    "revision": "35e2a38b41a64f38329ac6d76935c0c8"
  }, {
    "url": "icons-b23883c8/android/android-launchericon-48-48.png",
    "revision": "00eb03278bd518496ef9b8f92974ca78"
  }, {
    "url": "icons-b23883c8/ios/16.png",
    "revision": "7710fa83770641393150985cb4aa2bbe"
  }, {
    "url": "icons-b23883c8/ios/20.png",
    "revision": "aca2ff38bde39a1afee00ee1d6d1e472"
  }, {
    "url": "icons-b23883c8/ios/29.png",
    "revision": "22772dc8e104cf20252e2b30aaa03d27"
  }, {
    "url": "icons-b23883c8/ios/32.png",
    "revision": "ebaa837a48433071607e98d99c6670d9"
  }, {
    "url": "icons-b23883c8/ios/40.png",
    "revision": "c57dd9481b152e8515358f1d04b3b51e"
  }, {
    "url": "icons-b23883c8/ios/50.png",
    "revision": "fcfa0ec289bf0e2954d9cb3c7b1f4401"
  }, {
    "url": "icons-b23883c8/ios/57.png",
    "revision": "4ce572adc9b984d5ec12bed1a3363fd9"
  }, {
    "url": "icons-b23883c8/ios/58.png",
    "revision": "2cf39d8cb7c352d85b0266f12059239f"
  }, {
    "url": "icons-b23883c8/ios/60.png",
    "revision": "a6c127b208bd9b473cd15c40fefe7acb"
  }, {
    "url": "icons-b23883c8/ios/64.png",
    "revision": "468d75ba2465accf74923438b8bbfb24"
  }, {
    "url": "icons-b23883c8/ios/72.png",
    "revision": "35e2a38b41a64f38329ac6d76935c0c8"
  }, {
    "url": "icons-b23883c8/ios/76.png",
    "revision": "2ce5b7ff87fb35bff3af6259f7fd984a"
  }, {
    "url": "icons-b23883c8/ios/80.png",
    "revision": "e83de94a6249425c108ddc08c09450c4"
  }, {
    "url": "icons-b23883c8/ios/87.png",
    "revision": "d54fa4efda6112c29031f6f8fc30b6c6"
  }, {
    "url": "icons-b23883c8/ios/100.png",
    "revision": "49804bb4bc1405e08396739166ad3be4"
  }, {
    "url": "icons-b23883c8/ios/114.png",
    "revision": "e9ca2417f5320215a5aa857eb31e6ef9"
  }, {
    "url": "icons-b23883c8/ios/120.png",
    "revision": "8ed390f25cdb18810f979026ff7ac069"
  }, {
    "url": "icons-b23883c8/ios/128.png",
    "revision": "74b7620e07992b6d802ca5b32d64849d"
  }, {
    "url": "icons-b23883c8/ios/144.png",
    "revision": "f5f1588b53bc4c60e97a4b8aa8aa9dea"
  }, {
    "url": "icons-b23883c8/ios/152.png",
    "revision": "38c73d95c24462ea4b618fa1a599fa8b"
  }, {
    "url": "icons-b23883c8/ios/167.png",
    "revision": "ea87dd6f5dec644a7a3d8c1396c53f37"
  }, {
    "url": "icons-b23883c8/ios/180.png",
    "revision": "fb3322d81949405badcf4ad09307e902"
  }, {
    "url": "icons-b23883c8/ios/192.png",
    "revision": "80996b103e64f2a8847f8f23a1519ab2"
  }, {
    "url": "icons-b23883c8/ios/256.png",
    "revision": "f5ce614b0776b7693192e8bd009e3bbc"
  }, {
    "url": "icons-b23883c8/ios/512.png",
    "revision": "e76b9072bad1b6c82cbbf44f996b2f0e"
  }, {
    "url": "icons-b23883c8/ios/1024.png",
    "revision": "7036ccc0a23f38947fccb11a614e1b26"
  }, {
    "url": "./icons-b23883c8/maskable/maskable_icon_x48.png",
    "revision": "5664229485f0c486f89e4fa6bcf0a996"
  }, {
    "url": "./icons-b23883c8/maskable/maskable_icon_x72.png",
    "revision": "12cae7b7b18414b1f2bfa6684c467157"
  }, {
    "url": "./icons-b23883c8/maskable/maskable_icon_x96.png",
    "revision": "f1f3bfa20e45a5459176b974ca953540"
  }, {
    "url": "./icons-b23883c8/maskable/maskable_icon_x128.png",
    "revision": "6fc266d1cfbb4cb075c0b1ea87609e07"
  }, {
    "url": "./icons-b23883c8/maskable/maskable_icon_x192.png",
    "revision": "72a1e8cb8773b16a1bec8718ae1454fc"
  }, {
    "url": "./icons-b23883c8/maskable/maskable_icon_x384.png",
    "revision": "e626c9b7f05f2cf1e6c5756ba4c41439"
  }, {
    "url": "./icons-b23883c8/maskable/maskable_icon_x512.png",
    "revision": "3797e4e3a2e61588453f196391e243fb"
  }, {
    "url": "manifest.webmanifest",
    "revision": "35db8f422eeb1c8b9a1b5533010c7147"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));

}));
