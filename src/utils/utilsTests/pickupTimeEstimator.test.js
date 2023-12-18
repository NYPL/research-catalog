import * as estimator from "../pickupTimeEstimator"

let mockNowTimestamp
let tzNote = ""

const HOURS = {
  sc: [
    {
      day: "Thursday",
      startTime: "2023-06-01T14:00:00.000Z",
      endTime: "2023-06-01T23:00:00.000Z",
      today: true,
    },
    {
      day: "Friday",
      startTime: "2023-06-02T14:00:00.000Z",
      endTime: "2023-06-02T23:00:00.000Z",
      nextDeliverableDay: true,
    },
    {
      day: "Saturday",
      startTime: "2023-06-03T14:00:00.000Z",
      endTime: "2023-06-03T23:00:00.000Z",
    },
    {
      day: "Monday",
      startTime: "2023-06-05T14:00:00.000Z",
      endTime: "2023-06-05T23:00:00.000Z",
    },
    {
      day: "Tuesday",
      startTime: "2023-06-06T14:00:00.000Z",
      endTime: "2023-06-06T20:00:00.000Z",
    },
    {
      day: "Wednesday",
      startTime: "2023-06-07T14:00:00.000Z",
      endTime: "2023-06-07T20:00:00.000Z",
    },
  ],
  ma: [
    {
      day: "Thursday",
      startTime: "2023-06-01T14:00:00+00:00",
      endTime: "2023-06-01T23:00:00+00:00",
      today: true,
    },
    {
      day: "Friday",
      startTime: "2023-06-02T14:00:00+00:00",
      endTime: "2023-06-02T23:00:00+00:00",
      nextDeliverableDay: true,
    },
    {
      day: "Saturday",
      startTime: "2023-06-03T14:00:00+00:00",
      endTime: "2023-06-03T23:00:00+00:00",
    },
    {
      day: "Monday",
      startTime: "2023-06-05T14:00:00+00:00",
      endTime: "2023-06-05T23:00:00+00:00",
    },
    {
      day: "Tuesday",
      startTime: "2023-06-06T14:00:00+00:00",
      endTime: "2023-06-06T20:00:00+00:00",
    },
    {
      day: "Wednesday",
      startTime: "2023-06-07T14:00:00+00:00",
      endTime: "2023-06-07T20:00:00+00:00",
    },
  ],
  rc: [
    {
      day: "Thursday",
      startTime: "2023-06-01T14:00:00+00:00",
      endTime: "2023-06-01T22:00:00+00:00",
      today: true,
    },
    {
      day: "Friday",
      startTime: "2023-06-02T14:00:00+00:00",
      endTime: "2023-06-02T22:00:00+00:00",
      nextDeliverableDay: true,
    },
    {
      day: "Monday",
      startTime: "2023-06-05T14:00:00+00:00",
      endTime: "2023-06-05T22:00:00+00:00",
    },
    {
      day: "Tuesday",
      startTime: "2023-06-06T14:00:00+00:00",
      endTime: "2023-06-06T22:00:00+00:00",
    },
    {
      day: "Wednesday",
      startTime: "2023-06-07T14:00:00+00:00",
      endTime: "2023-06-07T22:00:00+00:00",
    },
  ],
}

jest.mock("../../../pages/api/locations", () => {
  return {
    fetchLocations: ({ location_codes: code }) =>
      Promise.resolve({
        [code]: [
          {
            code,
            label: `Fake label for ${code}`,
            hours: HOURS[code],
          },
        ],
      }),
  }
})

describe("pickupTimeEstimator", () => {
  beforeEach(() => {
    // Add window global nyOffsets var, emulating a global var set by server
    // for the client, giving the current and future NY TZ offsets
    window.nyOffsets = [
      { from: "2023-03-10T06:00:00.000Z", offset: 4 },
      { from: "2023-11-05T06:00:00.000Z", offset: 5 },
    ]
    mockNowTimestamp = "2023-06-01T12:00:00"
    jest.spyOn(estimator, "now").mockImplementation(() => mockNowTimestamp)

    // When running tests with TZ set to anything other than ET, let"s expect
    // all statements about time of day to end in "ET":
    tzNote =
      process.env.TZ && process.env.TZ !== "America/New_York" ? " ET" : ""
  })

  describe("findNextAvailableHours", () => {
    const hours = [
      {
        day: "Thursday",
        startTime: "2023-06-01T14:00:00.000Z",
        endTime: "2023-06-01T23:00:00.000Z",
        today: true,
      },
      {
        day: "Friday",
        startTime: "2023-06-02T14:00:00.000Z",
        endTime: "2023-06-02T23:00:00.000Z",
      },
    ]

    it('returns today"s hours when called during business hours', async () => {
      mockNowTimestamp = "2023-06-01T10:00:00-04:00"
      expect(await estimator.findNextAvailableHours(hours)).toBe(hours[0])
      mockNowTimestamp = "2023-06-01T10:31:00-04:00"
      expect(await estimator.findNextAvailableHours(hours)).toBe(hours[0])
      // At 6:59pm, techinically the next avail hours are still today:
      mockNowTimestamp = "2023-06-01T18:59:00-04:00"
      expect(await estimator.findNextAvailableHours(hours)).toBe(hours[0])
    })

    it('returns tomorrow"s hours when called after business hours', async () => {
      // At 7pm, next avail hours are tomorrow:
      mockNowTimestamp = "2023-06-01T19:00:00-04:00"
      expect(await estimator.findNextAvailableHours(hours)).toBe(hours[1])
      // At 9pm, next avail hours are tomorrow:
      mockNowTimestamp = "2023-06-01T21:00:00-04:00"
      expect(await estimator.findNextAvailableHours(hours)).toBe(hours[1])
    })
  })

  describe("getNextServiceHours", () => {
    // Each of these times is strictly within the service-hours for Thursday:
    ;[
      "2023-06-01T10:30:00-04:00",
      "2023-06-01T12:00:00-04:00",
      "2023-06-01T17:59:59-04:00",
    ].forEach(async (timestamp) => {
      it(`should return today's hours when called mid-service-hours (${timestamp})`, async () => {
        expect(await estimator.getNextServiceHours("sc")).toEqual({
          day: "Thursday",
          startTime: "2023-06-01T14:00:00.000Z",
          endTime: "2023-06-01T22:00:00.000Z",
          today: true,
        })
      })
    })

    it("should return tomorrow when called at end of service hours", async () => {
      mockNowTimestamp = "2023-06-01T18:00:00"
      expect(await estimator.getNextServiceHours("sc")).toEqual({
        day: "Friday",
        startTime: "2023-06-02T14:00:00.000Z",
        endTime: "2023-06-02T22:00:00.000Z",
        nextDeliverableDay: true,
      })
    })

    // Each of these times is afterhours
    ;[
      // 7pm closing:
      "2023-06-01T19:00:09",
      // 8pm:
      "2023-06-01T20:00:00",
      // 2am:
      "2023-06-02T02:00:00",
    ].forEach(async (timestamp) => {
      it(`should return tomorrow when called after service hours (${timestamp})`, async () => {
        mockNowTimestamp = timestamp
        expect(await estimator.getNextServiceHours("sc")).toEqual({
          day: "Friday",
          startTime: "2023-06-02T14:00:00.000Z",
          endTime: "2023-06-02T22:00:00.000Z",
          nextDeliverableDay: true,
        })
      })
    })
  })

  describe("getServiceTime", () => {
    it('should return start of tomorrow"s service time when after hours', async () => {
      mockNowTimestamp = "2023-06-01T23:00:00"
      expect(await estimator.getServiceTime("sc")).toBe(
        "2023-06-02T14:00:00.000Z"
      )
    })

    it("should return now when during service hours", async () => {
      // mockNowTimestamp defaults to "2023-06-01T12:00:00"
      expect(await estimator.getServiceTime("sc")).toBe(mockNowTimestamp)
    })

    it("should return the given time if it falls within the next destination service time", async () => {
      expect(await estimator.getServiceTime("sc", "2023-06-01T12:00:00")).toBe(
        "2023-06-01T12:00:00"
      )
    })

    it("should return the start of the next service time if given time falls outside of service hours", async () => {
      // Request at 6:01pm ET:
      expect(
        await estimator.getServiceTime("sc", "2023-06-01T22:01:00-04:00")
      ).toBe("2023-06-02T14:00:00.000Z")
      // Request at 7pm ET:
      expect(
        await estimator.getServiceTime("sc", "2023-06-01T23:00:00-04:00")
      ).toBe("2023-06-02T14:00:00.000Z")
      // Request at 9pm ET:
      expect(
        await estimator.getServiceTime("sc", "2023-06-02T02:00:00-04:00")
      ).toBe("2023-06-02T14:00:00.000Z")
    })
  })

  describe("timestampIsGreater", () => {
    it("identifies timestamps that are greater regardless of timezone offsite", () => {
      // GT checks:
      expect(
        estimator.timestampIsGreater(
          "2023-01-01T01:00:00.001Z",
          "2023-01-01T01:00:00.000Z"
        )
      ).toBe(true)
      expect(
        estimator.timestampIsGreater(
          "2023-01-01T10:00:01-04:00",
          "2023-01-01T14:00:00.000Z"
        )
      ).toBe(true)
      expect(
        estimator.timestampIsGreater(
          "2023-01-01T14:00:01-00:00",
          "2023-01-01T10:00:00-04:00"
        )
      ).toBe(true)
      // LTE checks:
      expect(
        estimator.timestampIsGreater(
          "2023-01-01T01:00:00.000Z",
          "2023-01-01T01:00:00.000Z"
        )
      ).toBe(false)
      expect(
        estimator.timestampIsGreater(
          "2023-01-01T01:00:00.000Z",
          "2023-01-01T01:00:00.001Z"
        )
      ).toBe(false)
    })
  })

  describe("timestampIsLTE", () => {
    it("identifies timestamps that are less than or equal regardless of timezone offsite", () => {
      // Equal checks:
      expect(
        estimator.timestampIsLTE(
          "2023-01-01T01:00:00.000Z",
          "2023-01-01T01:00:00.000Z"
        )
      ).toBe(true)
      expect(
        estimator.timestampIsLTE(
          "2023-01-01T01:00:00.000Z",
          "2023-01-01T01:00:00.000Z"
        )
      ).toBe(true)
      // Less than checks:
      expect(
        estimator.timestampIsLTE(
          "2023-01-01T01:00:00.000Z",
          "2023-01-01T01:00:00.001Z"
        )
      ).toBe(true)
      expect(
        estimator.timestampIsLTE(
          "2023-01-01T14:00:00.000Z",
          "2023-01-01T10:00:01-04:00"
        )
      ).toBe(true)
      expect(
        estimator.timestampIsLTE(
          "2023-01-01T10:00:00-04:00",
          "2023-01-01T14:00:01-00:00"
        )
      ).toBe(true)
      // GT checks:
      expect(
        estimator.timestampIsLTE(
          "2023-06-01T14:01:00.000Z",
          "2023-06-01T14:00:00+00:00"
        )
      ).toBe(false)
      expect(
        estimator.timestampIsLTE(
          "2023-01-01T14:00:01-00:00",
          "2023-01-01T10:00:00-04:00"
        )
      ).toBe(false)
    })
  })

  describe("serviceHours", () => {
    afterEach(() => estimator.resetCacheForTesting())
    it("should return service hours array", async () => {
      // Note that service hours are not padded on the front because
      // technically staff can service requests immediately at opening.
      // Standard intra-building travel times apply.

      expect(await estimator.serviceHours("sc")).toContainEqual({
        day: "Thursday",
        startTime: "2023-06-01T14:00:00.000Z",
        endTime: "2023-06-01T22:00:00.000Z",
        today: true,
      })

      expect(await estimator.serviceHours("sc")).toContainEqual({
        day: "Friday",
        startTime: "2023-06-02T14:00:00.000Z",
        endTime: "2023-06-02T22:00:00.000Z",
        nextDeliverableDay: true,
      })
    })
  })

  describe("setHoursMinutes", () => {
    it("should set hours and minutes", () => {
      // This is the zulu representation of 230 eastern (DST):
      const local230 = "2023-06-07T18:30:00.000Z"
      // Eastern:
      expect(
        estimator.setHoursMinutes("2023-06-07T18:00:00-04:00", 14, 30)
      ).toBe(local230)
      // Zulu time; return Eastern:
      expect(
        estimator.setHoursMinutes("2023-06-07T22:00:00+00:00", 14, 30)
      ).toBe(local230)

      // Check that hour is set to 14:30 + 5 after DST end:
      expect(
        estimator.setHoursMinutes("2023-11-15T22:00:00+00:00", 14, 30)
      ).toBe("2023-11-15T19:30:00.000Z")
    })
  })

  describe("addMinutes", () => {
    it("should add 30 mins", () => {
      // Eastern time
      expect(estimator.addMinutes("2023-06-07T14:00:00-04:00", 30)).toBe(
        "2023-06-07T18:30:00.000Z"
      )
      // Zulu time
      expect(estimator.addMinutes("2023-06-07T14:00:00+00:00", 30)).toBe(
        "2023-06-07T14:30:00.000Z"
      )
    })

    it("should sub 30 mins", () => {
      expect(estimator.addMinutes("2023-06-07T14:00:00+00:00", -30)).toBe(
        "2023-06-07T13:30:00.000Z"
      )
    })

    it("should add 1 hour, rolling over to tomorrow", () => {
      expect(estimator.addMinutes("2023-06-07T23:00:00+00:00", 60)).toBe(
        "2023-06-08T00:00:00.000Z"
      )
    })
  })

  describe("operatingHours", () => {
    afterEach(() => estimator.resetCacheForTesting())
    it("should return operating hours array", async () => {
      expect(await estimator.operatingHours("sc")).toContainEqual(HOURS.sc[0])
    })

    it("should return an empty array if response is mangled", async () => {
      expect(await estimator.operatingHours("xx")).toEqual([])
    })

    it("should only make one get request for successive calls", async () => {
      await estimator.operatingHours("sc")
      await estimator.operatingHours("sc")
      const hours = await estimator.operatingHours("sc")
      // expect(sinon.assert.calledOnce(clientStub))
      // expect(hours).toEqual(hoursArray.sc)
    })
    it("should fetch new hours if it is expired", async () => {
      // set cache with expired time
      estimator.resetCacheForTesting(1687449047066)
      await estimator.operatingHours("sc")
      await estimator.operatingHours("sc")
      // expect(sinon.assert.calledOnce(clientStub))
    })
  })

  describe("dateDiff", () => {
    it("should return days, hours, minutes difference from d2 - d1", () => {
      // 12am ET
      mockNowTimestamp = "2023-01-01T00:00:00"

      // Same time:
      expect(estimator.dateDifference("2023-01-01T00:00:00")).toEqual({
        days: 0,
        hours: 0,
        minutes: 0,
      })
      // next day at 2:03am: EST:
      expect(estimator.dateDifference("2023-01-02T02:03:00")).toEqual({
        days: 1,
        hours: 0,
        minutes: 0,
      })
      // Same day at 10:30am EST:
      expect(estimator.dateDifference("2023-01-01T10:30:00")).toEqual({
        days: 0,
        hours: 10,
        minutes: 0,
      })
    })

    it("should consider any time after midnight as 1 day even if < 24h pass", () => {
      // At closing, 10am tomorrow is "1 day away" (even though it"s fewer than 24h)
      mockNowTimestamp = "2023-01-01T19:00:00"
      expect(estimator.dateDifference("2023-01-02T10:00:00")).toEqual({
        days: 1,
        hours: 0,
        minutes: 0,
      })

      // One minute after midnight is, colloquially, 1 day later:
      mockNowTimestamp = "2023-01-01T23:59:00"
      expect(estimator.dateDifference("2023-01-02T00:01:00")).toEqual({
        days: 1,
        hours: 0,
        minutes: 0,
      })
    })
  })

  describe("makeFriendly", () => {
    it('considers 45-59minutes to be "in an hour"', () => {
      mockNowTimestamp = "2023-06-01T14:30:00.000Z"
      expect(estimator.makeFriendly("2023-06-01T15:15:00.000Z")).toBe(
        "in an hour"
      )
      expect(estimator.makeFriendly("2023-06-01T15:29:00.000Z")).toBe(
        "in an hour"
      )
    })

    it("renders 1h+ as specific time", () => {
      mockNowTimestamp = "2023-06-01T14:30:00.000Z"
      expect(estimator.makeFriendly("2023-06-01T17:30:00.000Z")).toBe(
        `today by 1:30pm${tzNote}`
      )
      expect(estimator.makeFriendly("2023-06-01T15:30:00.000Z")).toBe(
        `today by 11:30am${tzNote}`
      )
    })

    it('renders dates happening tomorrow as "tomorrow"', () => {
      mockNowTimestamp = "2023-06-01T14:30:00.000Z"
      expect(estimator.makeFriendly("2023-06-02T14:30:00.000Z")).toBe(
        `tomorrow (6/2) by 10:30am${tzNote}`
      )
    })

    it('renders dates happening today within 45 minutes as "today by approximately ..."', () => {
      mockNowTimestamp = "2023-06-01T14:30:00.000Z"
      expect(estimator.makeFriendly("2023-06-01T15:05:00.000Z")).toBe(
        `today by approximately 11:15am${tzNote}`
      )
    })

    it('renders dates happening today within 45 minutes as "today by approximately ..."', () => {
      mockNowTimestamp = "2023-06-01T15:10:00.000Z"
      expect(
        estimator.makeFriendly("2023-06-01T15:10:00.000Z", {
          useTodayByTime: true,
        })
      ).toBe(`today by 11:15am${tzNote}`)
    })

    it("renders specific time when showTime is enabled", () => {
      mockNowTimestamp = "2023-06-01T14:10:00.000Z"
      expect(
        estimator.makeFriendly("2023-06-01T14:30:00.000Z", {
          useTodayByTime: true,
        })
      ).toBe(`today by 10:30am${tzNote}`)
      // Without the use-today-by-time flag, the default is to use "approximately":
      expect(estimator.makeFriendly("2023-06-01T14:30:00.000Z")).toBe(
        `today by approximately 10:30am${tzNote}`
      )
    })
  })

  describe("formatDateAndTime", () => {
    it("should format date and time", () => {
      mockNowTimestamp = "2023-06-01T14:10:00.000Z"
      expect(
        estimator.formatDateAndTime(new Date("2023-06-01T14:30:00.000Z"))
      ).toEqual({
        time: `10:30am${tzNote}`,
        date: "6/1",
        dayOfWeek: "Thursday",
      })
      expect(
        estimator.formatDateAndTime(new Date("2023-06-02T22:12:34.000Z"))
      ).toEqual({
        time: `6:12pm${tzNote}`,
        date: "6/2",
        dayOfWeek: "Friday",
      })
    })
  })

  describe("roundToQuarterHour", () => {
    it("should return same date if already rounded", () => {
      expect(
        estimator
          .roundToQuarterHour(new Date("2023-06-01T14:30:00.000Z"))
          .toISOString()
      ).toBe("2023-06-01T14:30:00.000Z")
    })

    it("should round date to next quarter hour", () => {
      expect(
        estimator
          .roundToQuarterHour(new Date("2023-06-01T14:31:00.000Z"))
          .toISOString()
      ).toBe("2023-06-01T14:45:00.000Z")
    })
  })

  describe("nyOffset", () => {
    it("should return default offset appropriate for now when window.nyOffsets is unset", () => {
      delete window.nyOffsets
      expect(window.nyOffsets).toBeUndefined()
      expect(estimator.nyOffset()).toBe(4)
    })

    it("should return offset based on window.nyOffsets", () => {
      window.nyOffsets = [{ from: "2023-11-01T06:00:00.000Z", offset: 4 }]
      mockNowTimestamp = "2023-11-01T14:10:00.000Z"
      expect(estimator.nyOffset()).toBe(4)
    })

    it("should return appropriate offset based on how requested time relates to registered offsets", () => {
      window.nyOffsets = [
        { from: "2023-11-01T06:00:00.000Z", offset: 4 },
        { from: "2023-11-05T06:00:00.000Z", offset: 5 },
      ]
      // When requesting the NY offset for Nov 2, should use first window.nyOffsets entry:
      mockNowTimestamp = "2023-11-02T14:10:00.000Z"
      expect(estimator.nyOffset()).toBe(4)

      // When requesting the NY offset for Nov 5, should use second window.nyOffsets entry:
      mockNowTimestamp = "2023-11-05T14:10:00.000Z"
      expect(estimator.nyOffset()).toBe(5)
      // Equivalently, should honor time given as param:
      expect(estimator.nyOffset("2023-11-15T14:10:00.000Z")).toBe(5)

      // If requested time is less than all registered offsets (indicating
      // server time and client time are out of sync), should return first
      // offset:
      expect(estimator.nyOffset("2023-01-00T00:00:00.000Z")).toBe(4)
    })
  })

  describe("getPickupTimeEstimate", () => {
    it("should return a pickup time estimate of 30mins for requests placed on-site at any location *before* business hours", async () => {
      // estimator.getPickupTimeEstimate = async (item, deliveryLocation, fromDate) => {
      const item = {
        holdingLocation: [{ id: "ma" }],
        physFulfillment: "fulfillment:sasb-onsite",
        idNyplSourceId: { "@type": "SierraNypl" },
      }
      // 9am:
      mockNowTimestamp = "2023-06-01T13:00:00.000Z"
      expect((await estimator.getPickupTimeEstimate(item, "ma")).time).toBe(
        "2023-06-01T14:30:00.000Z"
      )
      // 10am:
      mockNowTimestamp = "2023-06-01T14:00:00.000Z"
      expect((await estimator.getPickupTimeEstimate(item, "ma")).time).toBe(
        "2023-06-01T14:30:00.000Z"
      )

      // Try SC:
      item.holdingLocation[0].id = "sc"
      mockNowTimestamp = "2023-06-01T14:00:00.000Z"
      expect((await estimator.getPickupTimeEstimate(item, "sc")).time).toBe(
        "2023-06-01T14:30:00.000Z"
      )
    })

    it("should return a pickup time estimate of 15mins for requests placed on-site at SC during business hours", async () => {
      // estimator.getPickupTimeEstimate = async (item, deliveryLocation, fromDate) => {
      const item = {
        holdingLocation: [{ id: "sc" }],
        physFulfillment: "fulfillment:sc-onsite",
        idNyplSourceId: { "@type": "SierraNypl" },
      }
      // 10:01am
      mockNowTimestamp = "2023-06-01T14:01:00.000Z"
      expect((await estimator.getPickupTimeEstimate(item, "sc")).time).toBe(
        "2023-06-01T14:16:00.000Z"
      )

      mockNowTimestamp = "2023-06-01T14:30:00.000Z"
      expect((await estimator.getPickupTimeEstimate(item, "sc")).time).toBe(
        "2023-06-01T14:45:00.000Z"
      )

      mockNowTimestamp = "2023-06-01T15:00:00.000Z"
      expect((await estimator.getPickupTimeEstimate(item, "sc")).time).toBe(
        "2023-06-01T15:15:00.000Z"
      )
    })

    it("should return a pickup time estimate of 45mins for requests placed on-site at MA during business hours", async () => {
      // estimator.getPickupTimeEstimate = async (item, deliveryLocation, fromDate) => {
      const item = {
        holdingLocation: [{ id: "ma" }],
        physFulfillment: "fulfillment:sasb-onsite",
        idNyplSourceId: { "@type": "SierraNypl" },
      }
      // 10:01am:
      mockNowTimestamp = "2023-06-01T14:01:00.000Z"
      expect((await estimator.getPickupTimeEstimate(item, "ma")).time).toBe(
        "2023-06-01T14:46:00.000Z"
      )
      // 11am:
      mockNowTimestamp = "2023-06-01T15:00:00.000Z"
      expect((await estimator.getPickupTimeEstimate(item, "ma")).time).toBe(
        "2023-06-01T15:45:00.000Z"
      )
      // 4pm:
      mockNowTimestamp = "2023-06-01T20:00:00.000Z"
      expect((await estimator.getPickupTimeEstimate(item, "ma")).time).toBe(
        "2023-06-01T20:45:00.000Z"
      )
    })

    it("should return a on-site pickup time estimate of Monday if placed late Sat", async () => {
      // estimator.getPickupTimeEstimate = async (item, deliveryLocation, fromDate) => {
      const item = {
        holdingLocation: [{ id: "ma" }],
        physFulfillment: "fulfillment:sasb-onsite",
        idNyplSourceId: { "@type": "SierraNypl" },
      }
      // 6pm: (closes 7pm)
      mockNowTimestamp = "2023-06-03T22:00:00.000Z"
      expect((await estimator.getPickupTimeEstimate(item, "ma")).time).toBe(
        "2023-06-05T14:30:00.000Z"
      )
    })

    it("should return a pickup time estimate of tomorrow for ReCAP requests placed during Recap service hours", async () => {
      // estimator.getPickupTimeEstimate = async (item, deliveryLocation, fromDate) => {
      const item = {
        holdingLocation: [{ id: "rc" }],
        physFulfillment: "fulfillment:recap-offsite",
      }
      // 10:30am:
      mockNowTimestamp = "2023-06-01T14:30:00.000Z"
      expect((await estimator.getPickupTimeEstimate(item, "ma")).time).toBe(
        "2023-06-02T14:30:00.000Z"
      )
      // 1:30pm:
      mockNowTimestamp = "2023-06-01T17:30:00.000Z"
      expect((await estimator.getPickupTimeEstimate(item, "ma")).time).toBe(
        "2023-06-02T14:30:00.000Z"
      )
    })

    it("should return a pickup time estimate of 2 days for ReCAP requests placed after Recap service hours", async () => {
      const item = {
        holdingLocation: [{ id: "rc" }],
        physFulfillment: "fulfillment:recap-offsite",
      }
      // 2:30pm ET:
      mockNowTimestamp = "2023-06-01T18:30:00.000Z"
      expect((await estimator.getPickupTimeEstimate(item, "ma")).time).toBe(
        "2023-06-03T14:30:00.000Z"
      )
      // 4:30pm ET:
      mockNowTimestamp = "2023-06-01T20:30:00.000Z"
      expect((await estimator.getPickupTimeEstimate(item, "ma")).time).toBe(
        "2023-06-03T14:30:00.000Z"
      )
      // 11:30pm ET:
      mockNowTimestamp = "2023-06-02T03:30:00.000Z"
      expect((await estimator.getPickupTimeEstimate(item, "ma")).time).toBe(
        "2023-06-03T14:30:00.000Z"
      )
    })

    it("should return a pickup time of tues for ReCAP requests placed after Recap service hours on a Friday", async () => {
      const item = {
        holdingLocation: [{ id: "rc" }],
        physFulfillment: "fulfillment:recap-offsite",
      }
      // 2:30pm ET on a Friday:
      mockNowTimestamp = "2023-06-02T18:30:00.000Z"
      expect((await estimator.getPickupTimeEstimate(item, "ma")).time).toBe(
        "2023-06-06T14:30:00.000Z"
      )
      // 5:30pm ET on a Friday:
      mockNowTimestamp = "2023-06-02T21:30:00.000Z"
      expect((await estimator.getPickupTimeEstimate(item, "ma")).time).toBe(
        "2023-06-06T14:30:00.000Z"
      )
      // 8:00am ET on a Mon:
      mockNowTimestamp = "2023-06-05T12:00:00.000Z"
      expect((await estimator.getPickupTimeEstimate(item, "ma")).time).toBe(
        "2023-06-06T14:30:00.000Z"
      )
    })

    it("should return a pickup time estimate of 2 business days for HD requests placed during Recap service hours", async () => {
      const item = {
        holdingLocation: [{ id: "rc" }],
        physFulfillment: "fulfillment:hd-offsite",
      }
      // 10:30am:
      mockNowTimestamp = "2023-06-01T14:30:00.000Z"
      expect((await estimator.getPickupTimeEstimate(item, "ma")).time).toBe(
        "2023-06-03T14:30:00.000Z"
      )
      // 1:30pm:
      mockNowTimestamp = "2023-06-01T17:30:00.000Z"
      expect((await estimator.getPickupTimeEstimate(item, "ma")).time).toBe(
        "2023-06-03T14:30:00.000Z"
      )
    })

    it("should return a pickup time estimate of 3 business days for HD requests placed after Recap service hours", async () => {
      const item = {
        holdingLocation: [{ id: "rc" }],
        physFulfillment: "fulfillment:hd-offsite",
      }
      // 14:30am:
      mockNowTimestamp = "2023-06-01T18:30:00.000Z"
      // No Sunday service, so it gets bumped to Monday:
      expect((await estimator.getPickupTimeEstimate(item, "ma")).time).toBe(
        "2023-06-05T14:30:00.000Z"
      )
      // 14:31pm:
      mockNowTimestamp = "2023-06-01T18:31:00.000Z"
      expect((await estimator.getPickupTimeEstimate(item, "ma")).time).toBe(
        "2023-06-05T14:30:00.000Z"
      )
    })

    describe("estimate without a chosen destination", () => {
      it("items in HD should build estimate as if being sent to SASB by default", async () => {
        const item = {
          holdingLocation: [{ id: "rc" }],
          physFulfillment: "fulfillment:hd-offsite",
        }
        // 14:30 EDT:
        mockNowTimestamp = "2023-06-01T18:30:00.000Z"
        // No Sunday service, so it gets bumped to Monday:
        expect(await estimator.getPickupTimeEstimate(item)).toMatchObject({
          time: "2023-06-05T14:30:00.000Z",
          estimate: `Monday (6/5) by 10:30am${tzNote}`,
        })
      })

      it("items in SASB", async () => {
        const item = {
          holdingLocation: [{ id: "ma" }],
          physFulfillment: "fulfillment:sasb-onsite",
          idNyplSourceId: { "@type": "SierraNypl" },
        }
        // 9am:
        mockNowTimestamp = "2023-06-01T13:00:00.000Z"
        expect(await estimator.getPickupTimeEstimate(item)).toMatchObject({
          estimate: `today by 10:30am${tzNote}`,
          time: "2023-06-01T14:30:00.000Z",
        })
        // 10am:
        mockNowTimestamp = "2023-06-01T14:00:00.000Z"
        expect(await estimator.getPickupTimeEstimate(item)).toMatchObject({
          estimate: `today by 10:30am${tzNote}`,
          time: "2023-06-01T14:30:00.000Z",
        })
      })

      it("items in SC", async () => {
        const item = {
          holdingLocation: [{ id: "sc" }],
          physFulfillment: "fulfillment:sasb-onsite",
          idNyplSourceId: { "@type": "SierraNypl" },
        }
        // After hours:
        mockNowTimestamp = "2023-06-01T22:00:00.000Z"
        expect(await estimator.getPickupTimeEstimate(item)).toMatchObject({
          time: "2023-06-02T14:30:00.000Z",
          estimate: `tomorrow (6/2) by 10:30am${tzNote}`,
        })
        // Before opening:
        mockNowTimestamp = "2023-06-01T13:59:00.000Z"
        expect(await estimator.getPickupTimeEstimate(item)).toMatchObject({
          time: "2023-06-01T14:30:00.000Z",
          estimate: `today by 10:30am${tzNote}`,
        })
        // At opening:
        mockNowTimestamp = "2023-06-01T14:00:00.000Z"
        expect(await estimator.getPickupTimeEstimate(item)).toMatchObject({
          time: "2023-06-01T14:30:00.000Z",
          estimate: `today by 10:30am${tzNote}`,
        })
      })
    })

    describe("active hold requests", () => {
      it("should render approximate pickup time as it draws near", async () => {
        const item = {
          holdingLocation: [{ id: "ma" }],
          physFulfillment: "fulfillment:sasb-onsite",
          idNyplSourceId: { "@type": "SierraNypl" },
        }
        // It"s 9:00am
        mockNowTimestamp = "2023-06-01T13:00:00.000Z"
        // Without an active hold request, the estimate is:
        expect(await estimator.getPickupTimeEstimate(item, "ma")).toMatchObject(
          {
            time: "2023-06-01T14:30:00.000Z",
            estimate: `today by 10:30am${tzNote}`,
          }
        )
        // At 10:00am I consider placing a hold request:
        mockNowTimestamp = "2023-06-01T14:00:00.000Z"
        // Without an active hold request, the estimate is:
        expect(await estimator.getPickupTimeEstimate(item, "ma")).toMatchObject(
          {
            time: "2023-06-01T14:30:00.000Z",
            estimate: `today by 10:30am${tzNote}`,
          }
        )
        // At 10:05 I place a hold request:
        mockNowTimestamp = "2023-06-01T14:05:00.000Z"
        const holdPlaced = mockNowTimestamp
        expect(
          await estimator.getPickupTimeEstimate(item, "ma", "phys", holdPlaced)
        ).toMatchObject({
          // 10:05 + 45mins === 10:50am
          time: "2023-06-01T14:50:00.000Z",
          // Initially it"s 45 mins, so rounds up to about "an hour"
          estimate: "in an hour",
        })
        // 1 min later...
        mockNowTimestamp = "2023-06-01T14:06:00.000Z"
        expect(
          await estimator.getPickupTimeEstimate(item, "ma", "phys", holdPlaced)
        ).toMatchObject({
          time: "2023-06-01T14:50:00.000Z",
          estimate: `today by approximately 11:00am${tzNote}`,
        })
        // 20 min later...
        mockNowTimestamp = "2023-06-01T14:06:00.000Z"
        expect(
          await estimator.getPickupTimeEstimate(item, "ma", "phys", holdPlaced)
        ).toMatchObject({
          time: "2023-06-01T14:50:00.000Z",
          estimate: `today by approximately 11:00am${tzNote}`,
        })
        // 45 min later...
        mockNowTimestamp = "2023-06-01T14:50:00.000Z"
        expect(
          await estimator.getPickupTimeEstimate(item, "ma", "phys", holdPlaced)
        ).toMatchObject({
          time: "2023-06-01T14:50:00.000Z",
          estimate: `today by approximately 11:00am${tzNote}`,
        })
        // 45 min later...
        mockNowTimestamp = "2023-06-01T14:51:00.000Z"
        expect(
          await estimator.getPickupTimeEstimate(item, "ma", "phys", holdPlaced)
        ).toMatchObject({
          time: "2023-06-01T14:50:00.000Z",
          estimate: `today by approximately 11:00am${tzNote}`,
        })
      })
    })

    describe("human readable estimate", () => {
      const item = {
        holdingLocation: [{ id: "ma" }],
        physFulfillment: "fulfillment:sasb-onsite",
        idNyplSourceId: { "@type": "SierraNypl" },
      }

      it("onsite sasb pre-request", async () => {
        // 10:30am ET on a Friday:
        mockNowTimestamp = "2023-06-02T14:30:00.000Z"
        expect(
          (await estimator.getPickupTimeEstimate(item, "ma")).estimate
        ).toBe("in an hour")
        // 2:30pm ET on a Friday:
        mockNowTimestamp = "2023-06-02T18:30:00.000Z"
        expect(
          (await estimator.getPickupTimeEstimate(item, "ma")).estimate
        ).toBe("in an hour")
      })

      it("by approximately OPENING TOMORROW", async () => {
        mockNowTimestamp = "2023-06-01T23:00:00+00:00"
        const estimate = await estimator.getPickupTimeEstimate(
          item,
          "ma",
          "phys",
          "2023-06-01T22:00:00+00:00"
        )
        expect(estimate.estimate).toBe(`tomorrow (6/2) by 10:30am${tzNote}`)
      })

      it("request made after request cutoff time, library is closed tomorrow", async () => {
        mockNowTimestamp = "2023-06-03T23:00:00+00:00"
        const estimate = await estimator.getPickupTimeEstimate(
          item,
          "ma",
          "phys"
        )
        expect(estimate.estimate).toBe(`Monday (6/5) by 10:30am${tzNote}`)
      })
    })
  })
})
