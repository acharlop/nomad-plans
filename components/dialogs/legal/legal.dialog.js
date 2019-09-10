import Vue from 'vue'
import PrivacyPolicyComponent from '@/components/privacy-policy'
import TermsOfServiceComponent from '@/components/terms-of-service'

export default Vue.component('LegalDialog', {
  components: {
    PrivacyPolicyComponent,
    TermsOfServiceComponent,
  },
  props: {
    visible: {
      type: Boolean,
      default: true,
    },
    tab: {
      type: String,
      default: 'service',
    },
  },
  data() {
    return {
      dialog: false,
    }
  },
  computed: {
    show: {
      get() {
        return this.visible
      },
      set(value) {
        if (!value) this.$emit('close')
      },
    },
    selectedTab: {
      get() {
        return `tab-${this.tab}`
      },
    },
  },
  mounted() {},
  methods: {},
})
