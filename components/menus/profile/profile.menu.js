import Vue from 'vue'
import { mapActions, mapMutations, mapState } from 'vuex'

export default Vue.component('ProfileMenu', {
  components: {},
  props: [],
  data() {
    return {
      profileMenu: false,
      imgLoaded: false,
    }
  },
  computed: {
    ...mapState({
      photoURL: (state) => `${state.auth.user.photoURL}?height=36&width=36`,
      name: (state) => state.auth.user.displayName,
      email: (state) => state.auth.user.email,
    }),
  },
  mounted() {},
  methods: {
    ...mapMutations('layout', ['showDialogLegal', 'showDialogInvite']),
    ...mapActions('auth', ['signOut']),
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
