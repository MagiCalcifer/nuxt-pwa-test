
import OneSignalVuePlugin from '@onesignal/onesignal-vue3'
// import { useOneSignal } from '@onesignal/onesignal-vue3';

export default defineNuxtPlugin((nuxtApp) => {
//   nuxtApp.vueApp.use(OneSignalVuePlugin, {
//     appId: '128191f3-21e0-40b9-9567-4d7c0cc0e387',
//     // safari_web_id: "web.onesignal.auto.27be598e-7a22-4ed6-a01a-10378439b214",
//   })

// const OneSignal = useOneSignal();

  // OneSignal.init({
  //   appId:'128191f3-21e0-40b9-9567-4d7c0cc0e387',
  //   allowLocalhostAsSecureOrigin: process.env.APP_ENV !== 'production',
  // });

  nuxtApp.vueApp.use(OneSignalVuePlugin, {
    appId: '128191f3-21e0-40b9-9567-4d7c0cc0e387'
  });

  // return {
  //   provide: {
  //       OneSignal
  //   }
  // }
})