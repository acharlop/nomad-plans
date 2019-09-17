import Vue from 'vue'
import { mapActions, mapGetters, mapState } from 'vuex'

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
      confirmation: 0,
      description: '',
      startAtMenu: false,
      endAtMenu: false,
      placeRules: [(v) => !!v || 'Place is required'],
      dateRules: [(v) => !!v || 'Date is required'],
      submitLoading: false,
      deleteLoading: false,
    }
  },
  computed: {
    ...mapState({
      isEdit: (state) => !!state.plans.editId,
    }),
    ...mapGetters('plans', ['editPlan']),
    show: {
      get() {
        return this.visible
      },
      set(value) {
        if (!value) this.$emit('close')
      },
    },
  },
  watch: {
    isEdit(newVal) {
      if (newVal) {
        const { editPlan } = this

        this.place = editPlan.place
        this.startAt = editPlan.startAt
        this.endAt = editPlan.endAt
        this.description = editPlan.description
        this.confirmation = editPlan.confirmation
      }
    },
    show(newVal) {
      if (newVal && !this.isEdit) {
        this.confirmation = 0
      }
    },
  },
  beforeUpdate() {},
  methods: {
    ...mapActions('plans', ['createPlan', 'deletePlan']),
    close() {
      this.show = false
      this.submitLoading = false
      this.deleteLoading = false
      this.confirmation = 0
      this.startAtMenu = false
      this.endAtMenu = false
      this.$refs.form.reset()
      if (this.isEdit) {
        this.$store.commit('plans/removePlanEditId')
      }
    },
    remove() {
      this.deleteLoading = true
      this.deletePlan().then(() => {
        this.close()
      })
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

        const action = this.isEdit ? 'plans/editPlan' : 'plans/createPlan'

        this.$store.dispatch(action, plan).then(() => {
          this.close()
        })
      }
    },
  },
})
