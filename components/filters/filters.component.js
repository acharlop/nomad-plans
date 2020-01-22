import Vue from 'vue'
import { mapMutations } from 'vuex'
import { confirmations } from '~/utils/confirmations'

export default Vue.component('Filters', {
  components: {},
  props: [],
  data() {
    return {
      filters: [],
      filterItems: confirmations.t.all.reverse(),
    }
  },
  computed: {},
  watch: {
    filters(newVal) {
      this.setConfirmationsFilters(confirmations.t2b(newVal))
    },
  },
  mounted() {
    this.filters = []
  },
  methods: {
    ...mapMutations('plans', ['setConfirmationsFilters']),
  },
})
