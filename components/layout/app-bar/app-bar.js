import Vue from 'vue'
import { mapMutations, mapState } from 'vuex'

import AuthButton from '@/components/auth-button'

export default Vue.component('AppBar', {
  components: {
    AuthButton,
  },
  props: [],
  data() {
    return {
      title: 'Nomad Maps',
      profileMenu: false,
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
    ...mapMutations('layout', [
      'closeDialogs',
      'showDialogLegal',
      'showDialogInvite',
      'showDialogPlanForm',
      'toggleSideDrawer',
    ]),
  },
})
