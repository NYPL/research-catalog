/**
 *  Prepare fulfillment dropdown values as an array of plainobjects that define a `value` and `label`
 */
export const fulfillmentOptions = `
  sasb-onsite	Onsite SASB	PT45M	ma
  sc-onsite	Onsite Schomburg	PT15M	sc
  lpa-onsite	Onsite LPA	PT45M	my
  recap-offsite	Offsite ReCAP	P1D
  hd-offsite	Offsite Harvard Depository	P2D
  sasb-edd	EDD Onsite	P2W
  lpa-edd	EDD Onsite	P2W
  sc-edd	EDD Onsite	P2W
  recap-edd	EDD ReCAP	P1W
  hd-edd	EDD Harvard Depository	P1W
`
  .split("\n")
  .map((l) => l.trim())
  .filter((l) => l)
  .map((l) => l.split("\t"))
  .map((values) => {
    const [id, label, duration] = values
    return {
      value: `fulfillment:${id}`,
      label: `${id} - ${label} (${duration})`,
    }
  })

/**
 *  Given an hour of the day (0-23), returns an ISO8601 string representing
 *  today at that time
 */
const todayAt = (hour: number): string => {
  const now = new Date()
  now.setHours(hour, 0, 0)
  return now.toISOString()
}

/**
 *  Given a number of minutes, returns an ISO8601 string representing now
 *  shifted forward/back by the specified minutes
 */
const todayNMinutesFromNow = (minutes: number): string => {
  const date = new Date()
  date.setTime(date.getTime() + minutes * 60_000)
  return date.toISOString()
}

/**
 *  Define a number of prebaked scenarios for the Test Pickup Times tool
 */
export const scenarios = {
  "ReCAP to any location": {
    holdingLocation: "rc",
    fulfillment: "fulfillment:recap-offsite",
  },
  "ReCAP to Rose": {
    holdingLocation: "rc",
    fulfillment: "fulfillment:recap-offsite",
    deliveryLocation: "mal",
  },
  "ReCAP to 217": {
    holdingLocation: "rc",
    fulfillment: "fulfillment:recap-offsite",
    deliveryLocation: "mal17",
  },
  "ReCAP to Rose after 2:30pm cut-off": {
    holdingLocation: "rc",
    fulfillment: "fulfillment:recap-offsite",
    deliveryLocation: "mal",
    requestTime: todayAt(15),
  },
  "ReCAP to SC": {
    holdingLocation: "rc",
    fulfillment: "fulfillment:recap-offsite",
    deliveryLocation: "sc",
  },
  "M1 to Rose": {
    holdingLocation: "mab88",
    fulfillment: "fulfillment:sasb-onsite",
    deliveryLocation: "mal",
  },
  "M1 to Rose after hours": {
    holdingLocation: "mab88",
    fulfillment: "fulfillment:sasb-onsite",
    deliveryLocation: "mal",
    requestTime: todayAt(21),
  },
  "M1 to Rose, hold placed 30 mins ago": {
    holdingLocation: "mab88",
    fulfillment: "fulfillment:sasb-onsite",
    deliveryLocation: "mal",
    requestTime: todayNMinutesFromNow(-30),
  },
  "SASB EDD": { holdingLocation: "mab88", fulfillment: "fulfillment:sasb-edd" },
  "ReCAP EDD": {
    holdingLocation: "rc123",
    fulfillment: "fulfillment:recap-edd",
  },
  "ReCAP EDD, requested 3 days ago": {
    holdingLocation: "rc123",
    fulfillment: "fulfillment:recap-edd",
    requestTime: todayNMinutesFromNow(-60 * 24 * 3),
  },
}

/**
 *  Build an array of options based on above scenarios
 */
export const scenarioOptions = [""]
  .concat(Object.keys(scenarios))
  .reduce((a, label) => a.concat([{ label, value: label }]), [])

/**
 * Given any string, returns `TRUE` if the string can be parsed into a Date
 */
export const validDate = (dateString): boolean => {
  let time = null
  try {
    time = new Date(dateString).getTime()
  } catch (e) {
    console.error(`Invalid date: ${dateString}`)
  }

  return !!time
}
