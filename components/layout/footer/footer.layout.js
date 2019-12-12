import Vue from 'vue'

export default Vue.component('Footer', {
  components: {},
  props: [],
  data() {
    return {
      currentDate: 50,
      filterItems: ['Unsure', 'Probably', 'Confirmed'],
      chips: [],
    }
  },
  computed: {},
  mounted() {},
  methods: {
    remove(item) {
      this.chips.splice(this.chips.indexOf(item), 1)
      this.chips = [...this.chips]
    },
  },
})
