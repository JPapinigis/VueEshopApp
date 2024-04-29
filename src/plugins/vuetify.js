// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import colors from 'vuetify/util/colors'


const myCustomLightTheme = {
  dark: false,
  colors: {
    primary: colors.green.darken1,
    secondary: colors.grey.darken3,

  },
}
export default createVuetify({
  components,
  directives,

  theme: {
    defaultTheme: 'myCustomLightTheme',
    themes: {
      myCustomLightTheme,
    },
  },
  defaults: {
      VCard: {
        style: {
          background: colors.green.darken1,
          color: colors.grey.darken3,
          elevation: 4,
        }
      }
  }

})
