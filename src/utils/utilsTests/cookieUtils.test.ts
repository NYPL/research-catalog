import { buildTimeLeft } from "../cookieUtils"

const now = 1721918635573
describe("cookie utils", () => {
  describe("buildTimeLeft", () => {
    beforeAll(() => {
      jest.useFakeTimers().setSystemTime(new Date(now))
    })
    it("returns 2 minutes and 0 seconds at the start of the timer", () => {
      const expirationTime = now + 2 * 60 * 1000
      expect(buildTimeLeft(expirationTime)).toStrictEqual({
        minutes: 2,
        seconds: 0,
      })
    })
    it("returns 2 minutes and 0 seconds when there are not exactly 2 minutes left", () => {
      const expirationTime = now + 2 * 60 * 1000 - 500
      expect(buildTimeLeft(expirationTime)).toStrictEqual({
        minutes: 2,
        seconds: 0,
      })
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
      const expirationTime = now
      expect(buildTimeLeft(expirationTime)).toStrictEqual({
        minutes: 0,
        seconds: 0,
      })
    })
    it("returns 0 minute and 0 seconds when there are 0 seconds left", () => {
      // expiration time is a fraction of a second ahead of now to check for
      // rounding
      const expirationTime = now + 500
      expect(buildTimeLeft(expirationTime)).toStrictEqual({
        minutes: 0,
        seconds: 0,
      })
    })
  })
})
