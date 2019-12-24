export default class Place {
  formattedAddress = ''
  geometry = {
    location: {
      lat: '',
      lng: '',
    },
    viewport: {},
  }

  internationalPhoneNumber = ''
  name = ''
  place = {
    city: '',
    state: '',
    country: '',
    countryCode: '',
  }

  placeId = ''
  types = []
  website = ''

  constructor(data) {
    // already saved
    if (data.place) {
      this.formattedAddress = data.formattedAddress
      this.geometry = data.geometry
      this.internationalPhoneNumber = data.internationalPhoneNumber
      this.name = data.name
      this.place = data.place
      this.placeId = data.placeId
      this.types = data.types
      this.website = data.website
      return
    }

    // fresh place from autocomplete
    this.formattedAddress = data.formatted_address || ''
    this.internationalPhoneNumber = data.international_phone_number || ''
    this.geometry = {
      location: {
        lat: data.geometry.location.lat(),
        lng: data.geometry.location.lng(),
      },
      viewport: data.geometry.viewport.toJSON(),
    }
    this.name = data.name || ''
    this.placeId = data.place_id || ''
    this.types = data.types || []
    this.website = data.website || ''

    this.createPlace(data.address_components)
  }

  lat() {
    return this.geometry.location.lat
  }

  lng() {
    return this.geometry.location.lng
  }

  createPlace(addressComponents = []) {
    addressComponents.forEach((component) => {
      const types = component.types
      if (
        types.includes('locality') ||
        types.includes('colloquial_area') ||
        types.includes('postal_town') ||
        types.includes('natural_feature')
      ) {
        this.place.city = component.long_name
      }

      if (types.includes('administrative_area_level_1')) {
        this.place.state = component.short_name
      }

      if (types.includes('country')) {
        const { short_name: code } = component
        this.place.countryCode = code === 'US' ? 'USA' : code
        this.place.country = component.long_name
      }

      if (types.includes('postal_code')) {
        this.place.zip = component.short_name
      }
    })
  }

  formattedNameShort() {
    return this.formattedName(false)
  }

  formattedName(long = true) {
    const { city, state, countryCode, country } = this.place

    // country
    if (this.types.includes('country')) return country

    // state
    if (this.types.includes('administrative_area_level_1'))
      return `${state}, ${countryCode}`

    const formattedState = this.isLocalityWithStates() ? `${state}, ` : ''

    const formattedCity = city ? `${city}, ` : ''
    const suffix = `${formattedCity}${formattedState}${
      long || this.name === city ? country : countryCode
    }`

    // city
    if (
      this.types.includes('locality') ||
      this.types.includes('colloquial_area') ||
      this.name === city
    )
      return suffix

    // place
    return `${this.name}, ${suffix}`
  }

  isLocalityWithStates() {
    return this.place.countryCode === 'USA'
  }

  toJSON() {
    return {
      formattedAddress: this.formattedAddress,
      geometry: this.geometry,
      internationalPhoneNumber: this.internationalPhoneNumber,
      name: this.name,
      place: this.place,
      placeId: this.placeId,
      types: this.types,
      website: this.website,
    }
  }
}
