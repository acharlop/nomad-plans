import Vue from 'vue'
import { mapActions } from 'vuex'

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
      description: '',
      startAtMenu: false,
      endAtMenu: false,
      placeRules: [(v) => !!v || 'Name is required'],
      dateRules: [(v) => !!v || 'Date is required'],
      submitLoading: false,
    }
  },
  computed: {
    ...mapActions('plans', ['createPlan']),
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
    resetAndClose() {
      this.show = false
      this.submitLoading = false
      this.confirmation = 1
      this.$refs.form.reset()
    },
    submit() {
      if (this.$refs.form.validate()) {
        this.submitLoading = true

        const plan = {
          place: this.place,
          startAt: this.startAt,
          endAt: this.endAt,
          confirmation: this.confirmation,
          description: this.description,
        }

        this.$store.dispatch('plans/createPlan', plan).then(() => {
          this.resetAndClose()
        })
      }
    },
  },
})
