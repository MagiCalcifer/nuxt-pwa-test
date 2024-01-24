// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app:{
    head:{
      script:[
        { children:'https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js',defer:true }
      ]
    }
  },
  modules: ["@vite-pwa/nuxt", '@nuxtjs/tailwindcss'],
  pwa: {
    /* PWA options */
    registerType: 'autoUpdate',
    manifest: {
      name: 'Oxbull.tech',
      short_name: 'OXB',
      theme_color: '#ffffff',
      icons: [
        {
          src: '192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'pw512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: '512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
    client: {
      installPrompt: true,
      // you don't need to include this: only for testing purposes
      // if enabling periodic sync for update use 1 hour or so (periodicSyncForUpdates: 3600)
      periodicSyncForUpdates: 20,
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module',
    },
    strategies: 'injectManifest',
    filename: 'sw.js'
  }
})