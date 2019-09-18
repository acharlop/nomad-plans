export const mockLatLng = jest.fn()

const mock = jest.fn().mockImplementation(() => ({
  maps: {
    LatLng: jest.fn().mockImplementation(() => mockLatLng),
  },
}))

export default mock
