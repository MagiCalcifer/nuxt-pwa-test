import { precacheAndRoute } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'

const version = 'v1.0.0'

self.skipWaiting()
clientsClaim()

precacheAndRoute(self.__WB_MANIFEST)