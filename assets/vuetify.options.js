const colors = require('vuetify/es5/util/colors').default

export default {
  theme: {
    dark: true,
    options: {
      customProperties: true,
    },
    themes: {
      dark: {
        primary: colors.lightGreen.base,
        primaryLight: '#bef67a',
        primaryDark: '#5a9216',

        secondary: colors.amber.base,
        secondaryLight: '#fff350',
        secondaryDark: '#c79100',

        anchor: colors.blue.darken2,
      },
    },
  },
}
