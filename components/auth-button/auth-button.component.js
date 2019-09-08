import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons'

export default Vue.component('AuthButton', {
  components: {},
  props: {},
  data() {
    return {
      nextStep: this.isNewUser ? 'up' : this.isAuthenticated ? 'out' : 'in',
    }
  },
  computed: {
    ...mapState({
      isNewUser: (state) => state.auth.isNewUser,
      isAuthenticated: (state) => state.auth.isAuthenticated,
    }),
    icon() {
      return faFacebookSquare
    },
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
          this.$router.push('/landing')
        })
        .catch((e) => {
          console.error(e)
        })
    },
  },
})
