import Vue from 'vue'
import { mapActions, mapState } from 'vuex'

import LegalDialog from '@/components/dialogs/legal'
import Loader from '@/components/loader'

export default Vue.component('LoginPageComponent', {
  components: {
    LegalDialog,
    Loader,
  },
  props: [],
  data() {
    return {
      legalDialog: false,
      legalDialogTab: 'service',
      loading: false,
    }
  },
  computed: {
    ...mapState({
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
    showDialog(tab) {
      this.legalDialogTab = tab
      this.legalDialog = true
    },
    hideDialog() {
      this.legalDialog = false
    },
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
