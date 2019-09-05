import VFacebookLogin from 'vue-facebook-login-component'
import config from '~/config'

export default {
  components: {
    VFacebookLogin,
  },
  props: [],
  data() {
    return {
      // TODO remove if making our own button
      facebookAppId: config.facebook.secret,
    }
  },
  computed: {},
  created() {
    this.$store
      .dispatch('auth/signInAutomatic')
      .then((loggedIn) => {
        if (loggedIn) this.$router.push('/')
      })
      .catch((e) => {
        console.error(e)
      })
  },
  methods: {
    facebookLogin() {
      this.$store
        .dispatch('auth/signInWithFacebook')
        .then(() => {
          this.$router.push('/')
        })
        .catch((e) => {
          console.error(e)
        })
    },
  },
}
