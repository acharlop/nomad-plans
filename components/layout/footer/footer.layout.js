import Vue from 'vue'
import { mapMutations } from 'vuex'
import { confirmations } from '~/utils/confirmations'

export default Vue.component('Footer', {
  components: {},
  props: [],
  data() {
    return {
      currentDate: 50,
      filterItems: confirmations.t.all,
      chips: [],
    }
  },
  computed: {},
  watch: {
    chips(newVal) {
      this.setConfirmationsFilters(confirmations.t2i(newVal))
    },
  },
  mounted() {
    this.chips = []
  },
  methods: {
    ...mapMutations('plans', ['setConfirmationsFilters']),
    remove(item) {
      this.chips.splice(this.chips.indexOf(item), 1)
      this.chips = [...this.chips]
    },
  },
})
