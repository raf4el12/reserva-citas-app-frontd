import i18next from 'i18next'
import { z } from 'zod'
import { zodI18nMap } from 'zod-i18n-map'
import es from 'zod-i18n-map/locales/es/zod.json'

i18next.init({
  lng: 'es',
  resources: {
    es: { zod: es },
  },
})

z.setErrorMap(zodI18nMap)
