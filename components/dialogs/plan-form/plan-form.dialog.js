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
    return {}
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
