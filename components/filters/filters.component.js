import Vue from 'vue'
import { mapMutations, mapState } from 'vuex'

export default Vue.component('Filters', {
  components: {},
  props: [],
  data() {
    return {
      past: false,
      unconfirmed: false,
    }
  },
  computed: {
    ...mapState({
      hidePast: (state) => state.plans.filters.hidePast,
      hideUnconfirmed: (state) => state.plans.filters.hideUnconfirmed,
    }),
  },
  watch: {
    past(newVal) {
      this.setPastFilter(newVal)
    },
    unconfirmed(newVal) {
      this.setUnconfirmedFilter(newVal)
    },
  },
  mounted() {
    this.past = this.hidePast
    this.unconfirmed = this.hideUnconfirmed
  },
  methods: {
    ...mapMutations('plans', ['setUnconfirmedFilter', 'setPastFilter']),
  },
})
