import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

function getBrowserLocale() {
  const browerLanguage = navigator.languages !== undefined ? navigator.languages[0] : navigator.language

  if (!browerLanguage) {
    return undefined
  }

  let locale = browerLanguage.trim().split(/-|_/)[0];

  // hard coded check for supported locales, can be done automatically
  if (locale !== 'de') {
    locale = 'en';
  }

  return locale;
}

function loadLocaleMessages () {
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })
  return messages
}

export default new VueI18n({
  locale: getBrowserLocale() || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: loadLocaleMessages()
})
