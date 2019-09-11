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
        primaryLight: '#bef67a',
        primaryDark: '#5a9216',

        secondary: '#ffa000',
        secondaryLight: '#ffd149',
        secondaryDark: '#c67100',

        anchor: colors.blue.darken2,
      },
    },
  },
}
