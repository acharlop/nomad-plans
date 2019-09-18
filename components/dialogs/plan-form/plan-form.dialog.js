import Vue from 'vue'
import { mapActions, mapGetters, mapState } from 'vuex'
import downArrowSimulator from 'vue2-google-maps/src/utils/simulateArrowDown'
import { bindProps, getPropsValues } from 'vue2-google-maps/src/utils/bindProps'
import { gmapApi } from 'vue2-google-maps'

const mappedProps = {
  bounds: {
    type: Object,
  },
  componentRestrictions: {
    type: Object,
    // Do not bind -- must check for undefined
    // in the property
    noBind: true,
  },
  types: {
    type: Array,
    default() {
      return []
    },
  },
}

export default Vue.component('PlanFormDialog', {
  components: {},
  props: {
    visible: {
      type: Boolean,
      default: true,
    },
    selectFirstOnEnter: {
      required: false,
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      valid: false,
      placeName: '',
      place: {},
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
      allowedPlanRange: {
        startAfter: '',
        endBefore: '',
        set: false,
      },
    }
  },
  computed: {
    ...mapState({
      isEdit: (state) => !!state.plans.editId,
    }),
    ...mapGetters('plans', ['editPlan', 'plannedDates']),
    show: {
      get() {
        return this.visible
      },
      set(value) {
        if (!value) this.$emit('close')
      },
    },
    google: gmapApi,
  },
  watch: {
    isEdit(newVal) {
      if (newVal) {
        const { editPlan } = this

        this.place = editPlan.place
        this.placeName = editPlan.place.name
        this.startAt = editPlan.startAt
        this.endAt = editPlan.endAt
        this.description = editPlan.description
        this.confirmation = editPlan.confirmation
        this.setAllowedPlanRange(editPlan.startAt)
      }
    },
    show(newVal) {
      if (newVal && !this.isEdit) {
        this.confirmation = 0
      }
      if (newVal) {
        this.safeSetup()
      }
    },
    description(newVal) {
      if (newVal === undefined) {
        this.description = ''
      }
    },
    placeName(newVal) {
      if (newVal === undefined) {
        this.placeName = ''
      }
    },
    startAt(val) {
      if (!this.allowedPlanRange.set) {
        this.setAllowedPlanRange(val, true)
      } else if (!val && !this.endAt) {
        this.resetAllowedPlanRange()
      }
    },
    endAt(val) {
      if (!this.allowedPlanRange.set) {
        this.setAllowedPlanRange(val, false)
      } else if (!val && !this.startAt) {
        this.resetAllowedPlanRange()
      }
    },
  },
  mounted() {
    this.safeSetup()
  },
  methods: {
    ...mapActions('plans', ['createPlan', 'deletePlan']),
    close() {
      this.show = false
      this.$refs.form.reset()
      this.submitLoading = false
      this.deleteLoading = false
      this.startAtMenu = false
      this.endAtMenu = false
      this.placeName = ''
      this.resetAllowedPlanRange()
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
    placeSelected(data) {
      if (!data.name) return

      this.placeName = data.name

      this.place = {
        name: data.name,
        address: data.formatted_address,
        lat: data.geometry.location.lat(),
        lng: data.geometry.location.lng(),
      }
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
    // date picker allowed dates functions
    allowedDates(val) {
      const hasDates = this.startAt || this.endAt

      return hasDates
        ? this.limitDatesByRange(val)
        : this.limitDatesByPlans(val)
    },
    limitDatesByPlans(val) {
      let allowed = true
      this.plannedDates.forEach((range) => {
        if (range.startAt <= val && val <= range.endAt) {
          allowed = false
        }
      })
      return allowed
    },
    limitDatesByRange(val) {
      const { startAfter, endBefore } = this.allowedPlanRange

      const isBefore = !startAfter || val > startAfter
      const isAfter = !endBefore || val < endBefore

      return !this.allowedPlanRange.set || (isBefore && isAfter)
    },
    setAllowedPlanRange(val) {
      const { plannedDates: planned } = this

      if (!val || !planned.length) return

      let startAfter = ''
      let endBefore = ''

      if (planned.length === 1) {
        if (val < planned[0].startAt) {
          endBefore = planned[0].startAt
        } else {
          startAfter = planned[0].endAt
        }
      }

      for (let i = 0; i < planned.length; i++) {
        if (
          val < planned[i].startAt &&
          (!endBefore || endBefore > planned[i].startAt)
        ) {
          endBefore = planned[i].startAt
        }

        if (
          val > planned[i].endAt &&
          (!startAfter || startAfter > planned[i].endAt)
        ) {
          startAfter = planned[i].endAt
        }
      }

      this.allowedPlanRange = { startAfter, endBefore, set: true }
    },
    resetAllowedPlanRange() {
      this.allowedPlanRange = {
        startAfter: '',
        endBefore: '',
        set: false,
      }
    },
    // setup functions
    safeSetup() {
      try {
        if (this.$refs.searchInput.$refs.input) {
          this.setupSearch()
        }
      } catch (e) {
        setTimeout(() => {
          this.safeSetup()
        }, 200)
      }
    },
    setupSearch() {
      this.$gmapApiPromiseLazy().then(() => {
        if (this.selectFirstOnEnter) {
          downArrowSimulator(this.$refs.searchInput.$refs.input)
        }

        if (typeof this.google.maps.places.Autocomplete !== 'function') {
          throw new TypeError('google.maps.places.Autocomplete is undefined.')
        }

        // set placeholder
        this.$refs.searchInput.$refs.input.placeholder = ''

        this.$autocomplete = new this.google.maps.places.Autocomplete(
          this.$refs.searchInput.$refs.input,
          getPropsValues(this, mappedProps)
        )
        bindProps(this, this.$autocomplete, mappedProps)

        this.$watch('componentRestrictions', (v) => {
          if (v !== undefined) {
            this.$autocomplete.setComponentRestrictions(v)
          }
        })

        // Not using `bindEvents` because we also want
        // to return the result of `getPlace()`
        this.$autocomplete.addListener('place_changed', () => {
          this.placeSelected(this.$autocomplete.getPlace())
        })
      })
    },
  },
})
