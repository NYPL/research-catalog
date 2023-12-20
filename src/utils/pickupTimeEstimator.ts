import { parse as parseDuration, toSeconds } from "iso8601-duration"
import { fetchLocations } from "../../pages/api/locations"
import { nyplCore } from "./nyplCore"

const cache = {}

const MS_PER_HOUR = 3_600_000
const MS_PER_DAY = 3_600_000 * 24

// An object representing the key/value pairs returned by:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatToParts
type DateFormatType = {
  day?: string
  dayPeriod?: string
  hour?: string
  month?: string
  minute?: string
  weekday?: string
}

/**
 *  Given a DiscoverApi item, an optional delivery location id, and a optional request timestamp, returns an object defining:
 *   - time: An ISO8601 formatted timestamp represeting the estimated time of arrival at the holdshelf
 *   - estimate: A "friendly" statement built from the estimated time
 *
 *  The process for estimating arrival-at-holdshelf is:
 *   - Compute arrivalAtDestination as:
 *     - If onsite, it's now
 *     - If offsite:
 *       - Determine earliest processing time at origin (now if currently open; otherwise start of next operating hours)
 *       - Add depository specific travel time
 *   - Compute destinationServiceTime as:
 *     - Determine earliest processing time at destination starting at arrivalAtDestination
 *   - Compute arrivalAtHoldshelf as:
 *     - Add location specific onsite travel time to destinationServiceTime
 *     - Bump to next delivery time for rooms with special delivery schoedules
 */
export const getPickupTimeEstimate = async (
  item,
  deliveryLocationId,
  type = "phys",
  fromTimestamp = module.exports.now()
) => {
  "use server"

  if (!["phys", "edd", "spec"].includes(type))
    throw new Error("Invalid type: " + type)

  const fulfillments = await nyplCore("fulfillment")
  const fulfillment = fulfillments[item[`${type}Fulfillment`]]
  if (!fulfillment)
    throw new Error(`Invalid fulfillment: ${item[`${type}Fulfillment`]}`)

  fromTimestamp = fromTimestamp || module.exports.now()

  // If no deliveryLocation specified, fall back on the one associated with the
  // fulfillment or just 'ma' (which is a fine default for offsite requests)
  deliveryLocationId = deliveryLocationId || fulfillment.location || "ma"

  const rationale = [{ time: fromTimestamp, activity: "request time" }]

  const fulfillmentTimeMinutes = parseOffsiteTravelDuration(
    fulfillment.estimatedTime
  )
  if (fulfillmentTimeMinutes > 60 * 24 * 5) {
    const turnaroundTime = addMinutes(fromTimestamp, fulfillmentTimeMinutes)
    rationale.push({ time: turnaroundTime, activity: "turnaround time" })
    return {
      time: turnaroundTime,
      estimate: makeFriendly(turnaroundTime),
      rationale,
    }
  }

  const originLocationId = locationId(item)

  // Assume onsite request (i.e. already arrived at "destination" building)
  let arrivalAtDestination = fromTimestamp

  // If offsite:
  if (/^rc/.test(originLocationId)) {
    const originServiceTime = await getServiceTime(
      originLocationId,
      fromTimestamp
    )

    rationale.push({ time: originServiceTime, activity: "origin service time" })

    const offsiteTravelDuration = parseOffsiteTravelDuration(
      fulfillment.estimatedTime
    )
    arrivalAtDestination = addMinutes(originServiceTime, offsiteTravelDuration)

    rationale.push({
      time: arrivalAtDestination,
      activity: "travel to destination",
    })
  }

  // Bump time to next available service time at destination:
  const destinationServiceTime = await getServiceTime(
    deliveryLocationId,
    arrivalAtDestination
  )
  rationale.push({
    time: destinationServiceTime,
    activity: `destination (${deliveryLocationId}) service time`,
  })

  // Account for travel to reading room:
  let arrivalAtHoldshelf = await addOnsiteTravelDuration(
    destinationServiceTime,
    deliveryLocationId
  )
  rationale.push({ time: arrivalAtHoldshelf, activity: "onsite travel time" })

  // Adjust to special delivery schedules for special rooms:
  const hasSpecialDelivery = hasSpecialDeliverySchedule(deliveryLocationId)
  if (hasSpecialDelivery) {
    arrivalAtHoldshelf = adjustToSpecialSchedule(
      deliveryLocationId,
      arrivalAtHoldshelf
    )
  }

  // Return the specific `time` and a human readable `estimate` string
  return {
    time: arrivalAtHoldshelf,
    estimate: makeFriendly(arrivalAtHoldshelf, {
      useTodayAtTime: hasSpecialDelivery,
      useTodayByTime: await isAtOrBeforeServiceHours(
        deliveryLocationId,
        destinationServiceTime
      ),
    }),
    rationale: rationaleWithDurations(rationale),
  }
}

export const rationaleWithDurations = (rationale) => {
  return rationale.map((r, index) => {
    if (index === 0) return r

    const diff = dateDifference(
      new Date(r.time).toISOString(),
      new Date(rationale[index - 1].time).toISOString()
    )

    r.ellapsed = diff.days
      ? `${diff.days} days`
      : diff.hours
      ? `${diff.hours}h`
      : diff.minutes
      ? `${diff.minutes}m`
      : ""
    return r
  })
}

/**
 *  Given an ISO8601 Duration {string} representing the an offsite fulfillment
 *  turnaround, returns {int} number of minutes it should represent (for the
 *  purpose of estimating arrival)
 */
export const parseOffsiteTravelDuration = (duration) => {
  const statedDurationMinutes = toSeconds(parseDuration(duration)) / 60
  // Calculate travel time as the stated duration (e.g. PT2D, PT1D) minus 12H
  // (artificially reduced to translate the colloquial "T2D" into the more
  // accurate "T1D12H")
  return statedDurationMinutes - 12 * 60
}

/**
 *  Given a serviceTime representing the start of staff processing and a
 *  location id, returns an updated timestamp estimating arrival at a holdshelf
 *  in the same building
 */
export const addOnsiteTravelDuration = async (serviceTime, locationId) => {
  let onsiteTravelDuration
  // If hold placed before opening, travel time is 30mins
  if (await isAtOrBeforeServiceHours(locationId, serviceTime)) {
    onsiteTravelDuration = "PT30M"
  } else {
    // If hold placed after opening, travel time depends on location:
    onsiteTravelDuration = await onsiteFulfillmentDuration(locationId)
  }
  return addDuration(serviceTime, onsiteTravelDuration)
}

/**
 *  Returns true if the named location has a special delivery schedule (e.g. is
 *  a scholar room)
 *
 *  TODO: Implement
 */
export const hasSpecialDeliverySchedule = (locationId: string) => {
  // Return true if locationId matches room known to have a specific delivery schedule
  return false
}

/**
 *  Given a location id and a timestamp string, returns a new timestamp string
 *  representing the future delivery time for the location given the known
 *  delivery schedule.
 *
 *  TODO: Implement
 */
export const adjustToSpecialSchedule = (locationId, time): string => {
  // Update time to next delivery schedule after given time
  return time
}

type MakeFriendlyOptions = {
  useTodayAtTime?: boolean
  useTodayByTime?: boolean
}

/**
 *  Given a timestamp string (ISO8601 format), returns a phrase like
 *   - "in an hour" - if time is about an hour away
 *   - "today by 10:45am" - if time is today and gte 1h
 *   - "tomorrow (M/D) by HH:MM" - if time is tomorrow
 *   - "Monday (M/D) by HH:MM" - e.g. if time is beyond tomorrow
 *   - "today 2pm" - e.g. if time is today at 2 and options.useTodayAtTime is set
 *
 *  Options:
 *   - useTodayAtTime: When true and time is mere hours away, renders "today HH:MM"
 *   - useTodayByTime: When true and time is mere hours away, renders "today by HH:MM"
 */
export const makeFriendly = (
  time,
  options: MakeFriendlyOptions = {}
): string => {
  options = Object.assign(
    {
      useTodayAtTime: false,
      useTodayByTime: false,
    },
    options
  )

  const { days, hours, minutes } = dateDifference(time)

  let date = new Date(time)
  date = roundToQuarterHour(date)

  const {
    time: formattedTime,
    date: formattedDate,
    dayOfWeek,
  } = formatDateAndTime(date)

  if (days && days > 5) {
    const weeks = Math.round(days / 7)
    return "in about " + (weeks === 1 ? "a week" : `${weeks} weeks`)
  }
  // One or more days:
  if (days && days === 1) {
    return `tomorrow (${formattedDate}) by ${formattedTime}`
  } else if (days) {
    return `${dayOfWeek} (${formattedDate}) by ${formattedTime}`
  }
  // Use exacting language? (for fixed special schedules)
  if (options.useTodayAtTime) {
    return `today ${formattedTime}`
  }
  // One or more hours:
  if (hours >= 1 || options.useTodayByTime) {
    return `today by ${formattedTime}`
  }
  // Call 45+ minutes "an hour":
  if (minutes >= 45) {
    return "in an hour"
  } else {
    return `today by approximately ${formattedTime}`
  }
}

/**
 *  Given a Date object, returns a plainobject with:
 *   - date {string} A string representation of the date (e.g. '10/1')
 *   - time {string} A string representation of the time of day (e.g. '10:30am')
 *   - dayOfWeek {string} The day of the week (e.g. 'Wednesday')
 */
export const formatDateAndTime = (date: Date) => {
  const formatOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    weekday: "long",
    day: "numeric",
    month: "numeric",
    timeZone: "America/New_York",
  }
  const values: DateFormatType = Intl.DateTimeFormat("en", formatOptions)
    .formatToParts(date)
    .reduce((h, part) => Object.assign(h, { [part.type]: part.value }), {})

  // In Node 10, this one comes through all lowercase:
  // values.dayPeriod = values.dayperiod || values.dayPeriod || ""

  values.dayPeriod = values.dayPeriod && values.dayPeriod.toLowerCase()

  const showTimezone =
    nyOffset() !== new Date(module.exports.now()).getTimezoneOffset() / 60
  const timezoneSuffix = showTimezone ? " ET" : ""

  return {
    date: `${values.month}/${values.day}`,
    time: `${values.hour}:${values.minute}${values.dayPeriod}${timezoneSuffix}`,
    dayOfWeek: values.weekday,
  }
}

/**
 *  Given a DiscoveryAPI item, returns the holding location id
 *
 *  If item is a partner record, returns 'rc'
 */
export const locationId = (item) => {
  const nyplSource = item.idNyplSourceId && item.idNyplSourceId["@type"]

  if (nyplSource !== "SierraNypl") return "rc"

  return (
    item.holdingLocation &&
    item.holdingLocation[0] &&
    item.holdingLocation[0].id
  )
}

/**
 *  Given a location id, returns the fulfillment duration as a ISO8601
 *  Duration string
 */
export const onsiteFulfillmentDuration = async (locationId) => {
  if (!locationId || locationId.length < 2) return null

  const buildingCode = {
    ma: "sasb",
    pa: "lpa",
    sc: "sc",
  }[locationId.slice(0, 2)]

  const fulfillments = await nyplCore("fulfillment")
  const fulfillment = fulfillments[`fulfillment:${buildingCode}-onsite`]
  return fulfillment.estimatedTime
}

/**
 *  Given a location, and an optional timestamp (default now), returns true if
 *  the timestamp is less than or equal to the start of the service hours for
 *  the location
 */
export const isAtOrBeforeServiceHours = async (
  locationId,
  time = module.exports.now()
) => {
  const nextServiceHours = await getNextServiceHours(locationId, time)
  const timeIsBeforeServiceHours = timestampIsLTE(
    time,
    nextServiceHours.startTime
  )
  return timeIsBeforeServiceHours
}

/**
 *  Given a location,
 */
export const getServiceTime = async (
  locationId,
  afterTimestamp = module.exports.now()
) => {
  const holdServiceHours = await getNextServiceHours(locationId, afterTimestamp)

  // If we're in the middle of the service window, service-time is now:
  return maximumTimestamp(afterTimestamp, holdServiceHours.startTime)
}

/**
 *  Given a location id (e.g. rc, mal, sc1234) returns the next available
 *  window in which staff may process a request.
 *
 *  The return object defines:
 *   - startTime
 *   - endTime
 */
export const getNextServiceHours = async (
  locationId,
  afterTimestamp = module.exports.now()
) => {
  const allHours = await serviceHours(locationId)
  const hours = findNextAvailableHours(allHours, afterTimestamp)
  if (!hours) {
    throw new Error(
      `Could not find next hours for ${locationId} after ${afterTimestamp} (${allHours.map(
        (h) => h.startTime
      )})`
    )

    console.error(
      `Error: could not find next available hours for ${locationId} after (${afterTimestamp})`,
      allHours
    )
  }
  return hours
}

/**
 *  Given an array of hours such as is returned from the LocationsService,
 *  returns the first aviailable entry (i.e. the entry that either includes
 *  now or is tomorrow)
 */
export const findNextAvailableHours = (
  hours,
  afterTimestamp = module.exports.now()
) => {
  const day = hours
    // Only consider hours that have not passed (in practice, all hours
    // considered will be current or future, but let's be sure)
    .filter((hours) => timestampIsGreater(hours.endTime, afterTimestamp))
    // Sort hours ascending, so soonest is first:
    .sort((h1, h2) => (timestampIsGreater(h1.startTime, h2.startTime) ? 1 : -1))
    // Get first day:
    .shift()

  return day
}

/**
 *  Given a holdingLocation, returns an array of hours such as that returned
 *  from the LocationsService, which has been adjusted to represent the hours
 *  during which staff can service a request.
 */
export const serviceHours = async (locationId) => {
  const hours = await operatingHours(locationId)

  return hours.map((hours) => {
    // Copy object so we don't mutate original:
    hours = Object.assign({}, hours)

    // If it's at ReCAP, cut-off is 2:30pm:
    if (/^rc/.test(locationId)) {
      hours.endTime = setHoursMinutes(hours.endTime, 14, 30)
    } else {
      // Otherwise, cut-off is 1h before closing:
      hours.endTime = addMinutes(hours.endTime, -60)
    }
    return hours
  })
}

let overrideNowTimestamp
export const overrideNow = (when) => (overrideNowTimestamp = when)

/**
 *  Returns now as an ISO8601 timestamp
 */
export const now = () => overrideNowTimestamp || new Date().toISOString()

/**
 *  Given a 8601 timestamp and a 8601 Duration string, adds the two together
 *  and returns the result as a timestamp string
 */
export const addDuration = (timestamp, duration) => {
  const minutes = toSeconds(parseDuration(duration)) / 60
  return module.exports.addMinutes(timestamp, minutes)
}

/**
 *  Given a 8601 timestamp string and a number of minutes, adds the two
 *  together and returns the result as a timestamp string
 */
export const addMinutes = (dateString, minutes) => {
  const date = new Date(dateString)
  date.setTime(date.getTime() + minutes * 60_000)
  return date.toISOString()
}

/**
 *  Extend Window object to allow for an optional `nyOffsets` property:
 */
type TzOffsetStart = {
  from: string
  offset: number
}
declare global {
  interface Window {
    nyOffsets?: TzOffsetStart[]
  }
}

/**
 *  Return the current hours offset for NY (either 4 or 5)
 *
 *  This accepts an optiona timestamp so that we can calculate the
 *  NY offset for both now and some date in the future (important for
 *  calculating estimates just before/after Daylight Savings days)
 */
export const nyOffset = (timestamp = module.exports.now()) => {
  try {
    if (
      typeof window !== "undefined" &&
      window &&
      window.nyOffsets &&
      window.nyOffsets.length
    ) {
      // Identify the offset that starts before timestamp:
      const currentOffset = window.nyOffsets
        .filter((offset) => new Date(offset.from) < new Date(timestamp))
        .pop()
      if (currentOffset) {
        return currentOffset.offset
      } else {
        // If no matching offset found, local clock is out of sync with server
        // time; return first server offset:
        return window.nyOffsets[0].offset
      }
    }
  } catch (e) {
    console.error(`Failed to parse nyOffsets from window: ${e.message}`)
  }

  return roughNyOffset(timestamp)
}

export const roughNyOffset = (timestamp) => {
  const date = new Date(timestamp)
  // Use 2023 DST dates as a rough estimation:
  if (
    // Apr-Oct: Firmly DST:
    (date.getMonth() >= 3 && date.getMonth() < 10) ||
    // Mar 12 2am: Start of DST:
    (date.getMonth() === 2 && date.getDate() > 12) ||
    // Nov 5 2am: End of DST:
    (date.getMonth() === 10 && date.getDate() < 5)
  ) {
    return 4
  }

  return 5
}

/**
 *  Given a 8601 timestamp string and a specific time of day (represented as
 *  integer hours and minutes), sets the time of the timestamp and together and
 *  returns the result as a timestamp string
 */
export const setHoursMinutes = (timestamp, hours, minutes = 0) => {
  hours = hours + nyOffset(timestamp)
  const date = new Date(timestamp)
  date.setUTCHours(hours, minutes)
  return date.toISOString()
}

/**
 *  Given a Date object, returns a new Date object rounded to the next quarter hour
 */
export const roundToQuarterHour = (date) => {
  const roundTo = 15
  const minutesToAdd = (60 + roundTo - date.getMinutes()) % roundTo

  return new Date(date.getTime() + minutesToAdd * 60_000)
}

/**
 *  Given a location id, returns an array of operating hours.
 */
export const operatingHours = async (locationId) => {
  let hours
  // if cache is less than one hour old, it is still valid
  if (
    cache[locationId] &&
    Date.now() - cache[locationId].updatedAt < MS_PER_HOUR
  ) {
    return (await cache[locationId].request).hours
  } else {
    cache[locationId] = {}

    cache[locationId] = {
      request: fetchLocations({ location_codes: locationId, fields: "hours" })
        .then(async (resp) => {
          // FIXME: Until location-service supports RC hours, fake it:
          if (!resp[locationId][0].hours && /^rc/.test(locationId)) {
            const hours = await fetchLocations({
              location_codes: "ma",
              fields: "hours",
            })
            const daysWithSaturdayClosed = hours["ma"][0].hours.map((day) => {
              if (day.day === "Saturday") {
                delete day.startTime
                delete day.endTime
              }
              return day
            })
            resp = {
              [locationId]: [{ hours: daysWithSaturdayClosed }],
            }
          }

          return resp
        })
        .then((json) => {
          if (!json || !json[locationId]) {
            console.error(
              `Could not find hours for ${locationId} in locations response (${Object.keys(
                json
              )})`
            )
            return { hours: [] }
          }
          return json[locationId].shift()
        })
        .then((hours) => {
          if (!hours || !hours.hours) {
            console.error(`Could not get hours for ${locationId}`)
            return { hours: [] }
          }

          // TODO FIXME: LocationsService has a tz offset bug (https://jira.nypl.org/browse/SCC-3884 )
          const fixLocationServiceTZ = hours.hours.some((hours) => {
            const d = new Date(hours.startTime)
            // No library opens before 7am. Assume this is due to a UTC offset on a ET timestamp:
            return d.getHours() <= 7
          })
          if (fixLocationServiceTZ) {
            hours.hours = hours.hours.map((h) => {
              h.startTime = h.startTime
                ? h.startTime.replace(/\+00:00$/, "-05:00")
                : h.startTime
              h.endTime = h.endTime
                ? h.endTime.replace(/\+00:00$/, "-05:00")
                : h.endTime
              return h
            })
          }
          // Remove days without hours (closed days) because it's impossible to sort them:
          hours.hours = hours.hours.filter((h) => h.startTime && h.endTime)

          // Backfill last week's hours based on this week's hours:
          const lastWeekHours = hours.hours.map((day) => {
            return {
              startTime: new Date(
                Date.parse(day.startTime) - 7 * MS_PER_DAY
              ).toISOString(),
              endTime: new Date(
                Date.parse(day.endTime) - 7 * MS_PER_DAY
              ).toISOString(),
            }
          })
          hours.hours = hours.hours.concat(lastWeekHours)

          // Sort hours:
          const sorted = hours.hours.sort((h1, h2) => {
            const v = h1.startTime < h2.startTime ? -1 : 1
            return v
          })

          return { hours: sorted }
        }),
      updatedAt: Date.now(),
    }

    await cache[locationId].request
    return (await cache[locationId].request).hours
  }
  return hours
}

/**
 *  Given a timestamp, calculates roughly how long until we arrive there.
 *
 *  Returns an object with one of three properties set:
 *   - days: The number of calendar calendar days away the timestamp is from now
 *   - hours: The number of hours away the timestamp is from now
 *   - minutes: The number of minutes away the timestamp is from now
 */
export const dateDifference = (d1, d2 = module.exports.now()) => {
  "use client"

  const date1 = Date.parse(d1)
  const date2 = Date.parse(d2)

  const date1Date = new Date(d1)
  const date2Date = new Date(d2)

  const diffMs = date1 - date2

  let days = Math.floor(diffMs / 86400000)
  // If date is in a couple days, recalculate it in terms of calendar days:
  if (days < 2) {
    days = (7 + date1Date.getDay() - date2Date.getDay()) % 7
  }

  const hours = days ? 0 : Math.floor((diffMs % 86400000) / MS_PER_HOUR)
  const minutes =
    days || hours ? 0 : Math.round(((diffMs % 86400000) % 3600000) / 60000)
  return {
    days,
    hours,
    minutes,
  }
}

/**
 *  Given two datestrings, returns the version that represents a larger date
 */
export const maximumTimestamp = (d1, d2) => {
  return Date.parse(d1) > Date.parse(d2) ? d1 : d2
}

/**
 * Given two ISO8601 formatted timestamps, returns true if the first represents
 * a date that is greater than the second.
 */
export const timestampIsGreater = (d1, d2) => {
  return Date.parse(d1) > Date.parse(d2)
}

/**
 * Given two ISO8601 formatted timestamps, returns true if the first represents
 * a date that is greater than the second.
 */
export const timestampIsLTE = (d1, d2) => {
  return Date.parse(d1) <= Date.parse(d2)
}

export const resetCacheForTesting = (time = null) => {
  Object.keys(cache).forEach((deliveryLocation) => {
    cache[deliveryLocation].updatedAt = time
    cache[deliveryLocation].hours = undefined
  })
}
