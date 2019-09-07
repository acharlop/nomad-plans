import Vue from 'vue'

export default Vue.component('LandingPageComponent', {
  props: [],
  data() {
    return {}
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
})
