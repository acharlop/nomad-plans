import Vue from 'vue'
import { mapMutations, mapState } from 'vuex'
import { confirmations } from '~/utils/confirmations'

const past = 'Hide Past Plans'

export default Vue.component('Filters', {
  components: {},
  props: [],
  data() {
    return {
      past,
      filters: [],
      filterItems: [...confirmations.t.all.reverse(), past],
    }
  },
  computed: {
    ...mapState({
      hidePast: (state) => state.plans.filters.hidePast,
    }),
  },
  watch: {
    filters(newVal) {
      this.setConfirmationsFilters(confirmations.t2b(newVal))

      const hidePast = newVal.includes(past)
      if (hidePast !== this.hidePast) {
        this.setPastFilter(hidePast)
      }
    },
  },
  mounted() {
    this.filters = []
  },
  methods: {
    ...mapMutations('plans', ['setConfirmationsFilters', 'setPastFilter']),
  },
})
