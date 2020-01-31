import Vue from 'vue'
import { mapState, mapActions } from 'vuex'

export default Vue.component('AuthButton', {
  components: {},
  props: {},
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    ...mapState({
      isNewUser: (state) => state.auth.isNewUser,
      isLoading: (state) => state.auth.isLoading,
    }),
  },
  watch: {
    isLoading: {
      handler(newVal, oldVal) {
        const setLoading = () => {
          this.loading = newVal
        }

        if (oldVal && !newVal) {
          setTimeout((_) => setLoading(), 300)
        } else {
          setLoading()
        }
      },
    },
  },
  created() {
    this.loading = this.isLoading

    this.signInAutomatic()
      .then((loggedIn) => {
        if (loggedIn) this.$router.push('/')
      })
      .catch((e) => {
        console.error(e)
      })
  },
  methods: {
    ...mapActions('auth', ['signInWithFacebook', 'signInAutomatic']),
    login() {
      this.signInWithFacebook()
        .then(() => {
          this.$router.push('/')
        })
        .catch((e) => {
          console.error(e)
        })
    },
  },
})
