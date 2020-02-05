import Vue from 'vue'
import { mapActions, mapGetters, mapState } from 'vuex'
import downArrowSimulator from 'vue2-google-maps/src/utils/simulateArrowDown'
import { bindProps, getPropsValues } from 'vue2-google-maps/src/utils/bindProps'
import { gmapApi } from 'vue2-google-maps'
import {
  formatDistance,
  isWithinAnyInterval,
  areIntervalsOverlapping,
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
      dateRules: [(v) => !!v || 'Date is required'],
      submitLoading: false,
      deleteLoading: false,
      startAtPickerDate: '',
      endAtPickerDate: '',
      maxDescriptionLength: 442,
      formattedStartDate: '',
      formattedEndDate: '',
      searchFocused: false,
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
    searchErrors() {
      return this.searchFocused || !!this.formattedName
        ? ''
        : 'Place is required'
    },
    formattedName() {
      let name = ''
      try {
        name = this.place.formattedName()
      } catch (e) {}

      return name
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
      } else if (
        newVal &&
        this.formattedName &&
        newVal !== this.formattedName
      ) {
        this.place = {}
      }
    },
    startAt(day) {
      this.formattedStartDate = formatDate(day)

      this.validateDates('startAt')
    },
    endAt(day) {
      this.formattedEndDate = formatDate(day)

      this.validateDates('endAt')
    },
    startAtMenu: {
      handler(newVal, oldVal) {
        const isOpen = newVal && !oldVal
        this.menuToggle('startAt', isOpen)
      },
    },
    endAtMenu: {
      handler(newVal, oldVal) {
        const isOpen = newVal && !oldVal
        this.menuToggle('endAt', isOpen)
      },
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
      this.datePicker = ''
      this.formattedStartDate = ''
      this.formattedEndDate = ''
      this.startAtPickerDate = ''
      this.endAtPickerDate = ''

      this.clearPlace()

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
      this.placeName = this.formattedName
    },
    clearPlace() {
      this.place = {}
      this.placeName = ''
      this.$refs.searchInput.$refs.input.value = ''
      this.$refs.searchInput.$refs.input.blur()
    },
    blurSearch() {
      setTimeout(() => {
        this.searchFocused = false
      }, 200)
    },
    menuToggle(key, isOpen) {
      if (!this.show || !this[key]) return

      const secondary = key === 'startAt' ? 'endAt' : 'startAt'

      // handle on close and only one date picked
      if (!isOpen && !this[secondary]) {
        // set next date picker
        this[`${secondary}PickerDate`] = this[key].slice(0, 7)
        // open next date picker
        this[`${secondary}Menu`] = true
      }

      if (isOpen) {
        // set date picker month
        this[`${key}PickerDate`] = this[key].slice(0, 7)
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
    clearDate(key) {
      this[key] = ''

      const date = new Date().toISOString().slice(0, 7)
      const secondary = key === 'startAt' ? 'endAt' : 'startAt'

      this[`${key}PickerDate`] = date

      if (!this[secondary]) {
        this[`${secondary}PickerDate`] = date
      }
    },
    // date picker allowed dates functions
    allowedDates(day) {
      return !isWithinAnyInterval(day, this.plannedDates)
    },
    validateDates(menu) {
      const { startAt, endAt } = this
      // valid order if
      // no start
      // no end
      // start same day as end
      if (!startAt || !endAt || startAt === endAt) {
        return
      }

      // start < end
      // plan doesn't overlap with other plans
      if (
        this.$dateFns.isBefore(new Date(startAt), new Date(endAt)) &&
        !areIntervalsOverlapping({ startAt, endAt }, this.plannedDates)
      ) {
        return
      }

      // start > end
      if (menu === 'endAt') {
        this.startAt = endAt
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
