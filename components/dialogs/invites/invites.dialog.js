import Vue from 'vue'

export default Vue.component('InvitesDialog', {
  components: {},
  props: {
    visible: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      snackbar: false,
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
  },
  mounted() {},
  methods: {
    copyText() {
      // var copyText = "https://nomadplans.co"
      const copyText = document.getElementById('nomadLink')
      copyText.select()
      document.execCommand('copy')
      this.snackbar = true
      copyText.blur()
    },
  },
})
