import Vue from 'vue'
import { mapState, mapActions } from 'vuex'

export default Vue.component('AuthButton', {
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {
    ...mapState({
      isNewUser: (state) => state.auth.isNewUser,
      isAuthenticated: (state) => state.auth.isAuthenticated,
    }),
  },
  created() {
    this.signInAutomatic()
      .then((loggedIn) => {
        if (loggedIn) this.$router.push('/')
      })
      .catch((e) => {
        console.error(e)
      })
  },
  methods: {
    ...mapActions('auth', ['signInWithFacebook', 'signOut', 'signInAutomatic']),
    login() {
      this.signInWithFacebook()
        .then(() => {
          this.$router.push('/')
        })
        .catch((e) => {
          console.error(e)
        })
    },
    logout() {
      this.signOut()
        .then(() => {
          this.$router.push('/login')
        })
        .catch((e) => {
          console.error(e)
        })
    },
  },
})
