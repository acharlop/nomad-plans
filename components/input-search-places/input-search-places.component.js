import Vue from 'vue'

export default Vue.component('InputSearchPlacesComponent', {
  components: {},
  props: [],
  data() {
    return {
      place: '',
    }
  },
  computed: {},
  mounted() {},
  methods: {
    placeChanged(data) {
      this.place = data.name

      if (!data.name) return

      this.$emit('input', {
        name: data.name,
        address: data.formatted_address,
        lat: data.geometry.location.lat(),
        lng: data.geometry.location.lng(),
      })
    },
  },
})
