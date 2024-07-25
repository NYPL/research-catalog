import { buildTimeLeft } from "../cookieUtils"

const now = 1721918635573
describe("cookie utils", () => {
  describe("buildTimeLeft", () => {
    beforeAll(() => {
      jest.useFakeTimers().setSystemTime(new Date(now))
    })
    it("returns 1 minute and 0 seconds when there are 59.7 seconds left", () => {
      // expiration time is just under 1 minute to make sure that rounding is
      // happening properly
      const expirationTime = now + 59700
      expect(buildTimeLeft(expirationTime)).toStrictEqual({
        minutes: 1,
        seconds: 0,
      })
    })
    it("returns 1 minute and 30 seconds when there are 90 seconds left", () => {
      // expiration time is just under 1 minute to make sure that rounding is
      // happening properly
      const expirationTime = now + 90 * 1000
      expect(buildTimeLeft(expirationTime)).toStrictEqual({
        minutes: 1,
        seconds: 30,
      })
    })
    it("returns 0 minute and 0 seconds when there are 0 seconds left", () => {
      // expiration time is just under 1 minute to make sure that rounding is
      // happening properly
      const expirationTime = now
      expect(buildTimeLeft(expirationTime)).toStrictEqual({
        minutes: 0,
        seconds: 0,
      })
    })
  })
})
