import Vue from 'vue'

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
  computed: {},
  created() {},
  methods: {
    showDialog(tab) {
      this.legalDialogTab = tab
      this.legalDialog = true
    },
    hideDialog() {
      this.legalDialog = false
    },
  },
})
