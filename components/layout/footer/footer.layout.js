import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'
import getDayOfYear from 'date-fns/getDayOfYear'
import lightFormat from 'date-fns/lightFormat'
import { confirmations } from '~/utils/confirmations'

const today = new Date()

export default Vue.component('Footer', {
  components: {},
  props: [],
  data() {
    return {
      today,
      sliderValue: getDayOfYear(today),
      filterItems: confirmations.t.all,
      filters: [],
      filteredCurrentYear: today.getFullYear(),
      months: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
    }
  },
  computed: {
    currentYear: {
      get() {
        return this.filteredCurrentYear
      },
      set(value) {
        this.filteredCurrentYear = value
        this.today.setYear(value)
      },
    },
    nextYear() {
      return this.currentYear + 1
    },
    prevYear() {
      return this.currentYear - 1
    },
    plans() {
      return this.myFilteredPlans()
    },
    firstPlanYear() {
      return this.plans.length
        ? parseInt(this.plans[this.plans.length - 1].startAt.substring(0, 4))
        : today.getFullYear()
    },
    finalPlanYear() {
      return this.plans.length
        ? parseInt(this.plans[0].endAt.substring(0, 4))
        : today.getFullYear()
    },
    hasPlansYearNext() {
      return this.nextYear <= this.finalPlanYear
    },
    hasPlansYearPrev() {
      return this.prevYear >= this.firstPlanYear
    },
    sliderSteps() {
      return (
        differenceInCalendarDays(
          new Date(this.nextYear, 0, 1),
          new Date(this.currentYear, 0, 1)
        ) - 1
      )
    },
    day() {
      return new Date(this.currentYear, 0, this.sliderValue)
    },
    selectedMonth() {
      return this.day.getMonth()
    },
  },
  watch: {
    filters(newVal) {
      this.setConfirmationsFilters(confirmations.t2i(newVal))
    },
    day(newVal) {
      this.setHighlightedDate(this.selectedDate())
    },
  },
  mounted() {
    this.filters = []
    this.setHighlightedDate(this.selectedDate())
  },
  methods: {
    ...mapMutations('plans', ['setConfirmationsFilters', 'setHighlightedDate']),
    ...mapGetters('plans', ['myFilteredPlans']),
    setMonth(month) {
      this.day.setMonth(month, 1)
      this.sliderValue = getDayOfYear(this.day)
    },
    dayOfYearToDate(day = 1) {
      return lightFormat(this.day.setDate(day), 'd')
    },
    selectedDate() {
      return lightFormat(this.day, 'yyyy-MM-dd')
    },
  },
})
