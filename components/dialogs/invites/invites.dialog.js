import Vue from 'vue'

export default Vue.component('InvitesDialog', {
  components: {},
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
