import Vue from 'vue'

export default Vue.component('PlanFormDialog', {
  components: {},
  props: {
    visible: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      valid: false,
      place: '',
      startAt: '',
      endAt: '',
      confirmations: ['Not Sure', 'Most Likely', 'Confirmed'],
      confirmation: 1,
      note: '',
      startAtMenu: false,
      endAtMenu: false,
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
  methods: {},
})
