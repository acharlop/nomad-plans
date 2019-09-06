import VFacebookLogin from 'vue-facebook-login-component'

export default {
  components: {
    VFacebookLogin,
  },
  props: [],
  data() {
    return {
      // TODO remove if making our own button
      facebookAppId: process.env.facebookAppId,
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
