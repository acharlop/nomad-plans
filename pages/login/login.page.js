import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'

import AuthButton from '@/components/auth-button'
import LegalDialog from '@/components/dialogs/legal'

export default Vue.component('LoginPageComponent', {
  components: {
    AuthButton,
    LegalDialog,
  },
  props: [],
  data() {
    return {
      legalDialog: false,
      legalDialogTab: 'service',
    }
  },
  computed: {
    ...mapState({
      isNewUser: (state) => state.auth.isNewUser,
    }),
  },
  created() {},
  methods: {
    ...mapMutations('auth', ['toggleNewUser']),
    showDialog(tab) {
      this.legalDialogTab = tab
      this.legalDialog = true
    },
    hideDialog() {
      this.legalDialog = false
    },
  },
})