const colors = require('vuetify/es5/util/colors').default

export default {
  theme: {
    light: true,
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: colors.lightGreen.base,
        secondary: colors.amber.base,
        anchor: colors.amber.darken2,
      },
    },
  },
}
