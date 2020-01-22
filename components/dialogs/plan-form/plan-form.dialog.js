import Vue from 'vue'
import { mapActions, mapGetters, mapState } from 'vuex'
import downArrowSimulator from 'vue2-google-maps/src/utils/simulateArrowDown'
import { bindProps, getPropsValues } from 'vue2-google-maps/src/utils/bindProps'
import { gmapApi } from 'vue2-google-maps'
import {
  formatDistance,
  intervalContainingDate,
  isWithinAnyInterval,
  formatDate,
} from '@/utils/date'
import Place from '~/models/place'
import { confirmations } from '~/utils/confirmations'

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
      confirmations: confirmations.t,
      confirmed: 0,
      description: '',
      startAtMenu: false,
      endAtMenu: false,
      placeRules: [(v) => !!v || 'Place is required'],
      dateRules: [(v) => !!v || 'Date is required'],
      submitLoading: false,
      deleteLoading: false,
      startAfter: '',
      endBefore: '',
      startDatePicker: '',
      endDatePicker: '',
      maxDescriptionLength: 442,
      formattedStartDate: '',
      formattedEndDate: '',
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
    dateRange() {
      return formatDistance(this.startAt, this.endAt)
    },
  },
  watch: {
    isEdit(newVal) {
      if (!newVal) return

      const { editPlan } = this

      this.place = editPlan.place
      this.placeName = editPlan.place.formattedName()
      this.startAt = editPlan.startAt
      this.endAt = editPlan.endAt
      this.description = editPlan.description
      this.confirmed = editPlan.confirmed ? 1 : 0
      this.setAllowedRange(editPlan.startAt)
      this.formattedStartDate = formatDate(editPlan.startAt)
      this.formattedEndDate = formatDate(editPlan.endAt)
    },
    show(newVal) {
      if (newVal && !this.isEdit) {
        this.confirmed = 0
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
    startAt(day) {
      if (!this.endAt) {
        this.setAllowedRange(day)
      }

      this.formattedStartDate = formatDate(day)

      this.validateDatesOrder('startAt')
    },
    endAt(day) {
      if (!this.startAt) {
        this.setAllowedRange(day)
      }

      this.formattedEndDate = formatDate(day)

      this.validateDatesOrder('endAt')
    },
    startAtMenu: {
      handler(newVal, oldVal) {
        const isOpen = newVal && !oldVal
        this.dateToggle('startAt', isOpen)
      },
    },
    endAtMenu: {
      handler(newVal, oldVal) {
        const isOpen = newVal && !oldVal
        this.dateToggle('endAt', isOpen)
      },
    },
    place(newVal) {
      if (newVal) this.placeName = newVal.formattedName()
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
      this.startAt = ''
      this.endAt = ''
      this.startAtMenu = false
      this.endAtMenu = false
      this.placeName = ''
      this.startAfter = ''
      this.endBefore = ''
      this.datePicker = ''
      this.formattedStartDate = ''
      this.formattedEndDate = ''
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
    searchFocus() {
      this.$refs.searchInput.$refs.input.focus()
    },
    placeSelected(data) {
      this.place = new Place(data)
    },
    dateToggle(key, isOpen) {
      if (!this.show || this.searchFocused) return

      const secondary = key === 'startAt' ? 'endAt' : 'startAt'

      // handle on close
      if (!isOpen) {
        // open next date picker when date is picked
        if (this[key] && !this[secondary]) this[`${secondary}Menu`] = true
      }

      // handle on open
      if (isOpen) {
        // date picked ? set allowed range : reset allowed range
        this[key] ? this.setAllowedRange(this[key]) : this.resetAllowedRange()
      }
    },
    submit() {
      if (this.$refs.form.validate()) {
        this.submitLoading = true

        const plan = {
          place: this.place.toJSON(),
          startAt: this.startAt,
          endAt: this.endAt,
          confirmed: !!this.confirmed,
          description: this.description,
        }

        const action = this.isEdit ? 'plans/editPlan' : 'plans/createPlan'

        this.$store.dispatch(action, plan).then(() => {
          this.close()
        })
      }
    },
    clearDate(range) {
      this[range] = ''
    },
    // date picker allowed dates functions
    allowedDates(day) {
      return !isWithinAnyInterval(day, this.plannedDates)
    },
    setAllowedRange(day) {
      const { startAfter, endBefore } = intervalContainingDate(
        this.plannedDates,
        day
      )

      this.startAfter = startAfter
      this.endBefore = endBefore

      this.setDatePickers(startAfter.slice(0, 7))
    },
    setDatePickers(yearMonth) {
      this.startDatePicker = this.startAt || yearMonth
      this.endDatePicker = this.endAt || yearMonth
    },
    resetAllowedRange() {
      this.startAfter = ''
      this.endBefore = ''
    },
    validateDatesOrder(menu) {
      if (!this.startAt || !this.endAt) {
        return
      }

      // start < end (ok)
      if (this.$dateFns.isBefore(new Date(this.startAt), new Date(this.endAt)))
        return

      // start > end
      if (menu === 'endAt') {
        this.startAt = this.endAt
      }

      this.endAt = ''
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

        if (!this.isEdit) this.searchFocus()
      })
    },
  },
})
