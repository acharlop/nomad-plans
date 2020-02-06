import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.component('PinComponent', {
  components: {},
  props: {
    plan: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      today: new Date().toISOString().split('T')[0],
    }
  },
  computed: {
    ...mapState({
      highlightId: (state) => state.plans.highlightId,
      photoURL: (state) => `${state.auth.user.photoURL}?height=50&width=50`,
    }),
    isHighlighted() {
      return this.plan.id === this.highlightId
    },
    stroke() {
      return this.plan.confirmed ? '#8BC34A' : '#FFB300'
    },
    strokeWidth() {
      return this.plan.endAt >= this.today ? 5 : 0
    },
    size() {
      return this.isHighlighted ? 55 : 22
    },
  },
  mounted() {},
  methods: {},
})
