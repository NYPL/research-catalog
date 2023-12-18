import Head from "next/head"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/router"
import { parse, stringify } from "qs"
import {
  Heading,
  Form,
  FormField,
  FormRow,
  TextInput,
  Select,
  HorizontalRule,
  ButtonGroup,
  Button,
} from "@nypl/design-system-react-components"
import type { TextInputRefType } from "@nypl/design-system-react-components"

import Layout from "../../src/components/Layout/Layout"

import { BASE_URL, SITE_NAME } from "../../src/config/constants"
import {
  getPickupTimeEstimate,
  overrideNow,
} from "../../src/utils/pickupTimeEstimator"

// Prepare fulfillment dropdown values:
const fulfillmentOptions = `
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

const todayAt = (hour) => {
  const now = new Date()
  now.setHours(hour, 0, 0)
  return now.toISOString()
}

const todayNMinutesFromNow = (minutes) => {
  const date = new Date()
  date.setTime(date.getTime() + minutes * 60_000)
  return date.toISOString()
}

const scenarios = {
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
const scenarioOptions = [""]
  .concat(Object.keys(scenarios))
  .reduce((a, label) => a.concat([{ label, value: label }]), [])

const validDate = (dateString) => {
  let time = null
  try {
    time = new Date(dateString).getTime()
  } catch (e) {
    console.error(`Invalid date: ${dateString}`)
  }

  return !!time
}

interface CurrentParams {
  fulfillment: string
  holdingLocation: string
  deliveryLocation: string
  requestTime: string
  currentTime: string
  scenario: string
}

/**
 * The Search page is responsible for fetching and displaying the Search results,
 * as well as displaying and controlling pagination and search filters.
 */
const TestPickupTimes = (params) => {
  const router = useRouter()
  const inputRef = useRef<TextInputRefType>()

  const [holdingLocation, setHoldingLocation] = useState(
    params.holdingLocation || "mal92"
  )
  const [fulfillment, setFulfillment] = useState(
    params.fulfillment || fulfillmentOptions[0].value
  )
  const [deliveryLocation, setDeliveryLocation] = useState(
    params.deliveryLocation || ""
  )

  const result = params.result

  const [requestTime, setRequestTime] = useState(params.requestTime || "")
  const [currentTime, setCurrentTime] = useState(params.currentTime || "")

  const [currentParams, setCurrentParams] = useState({} as CurrentParams)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const [scenario, setScenario] = useState("")

  const updateRoute = () => {
    const queryString = stringify(currentParams)
    router.push(`/test-pickup-times?${queryString}`)
  }

  useEffect(updateRoute, [currentParams])

  if (currentParams && scenario !== currentParams.scenario) {
    const scenarioParams = scenarios[scenario]
    if (scenarioParams) {
      setHoldingLocation(scenarioParams.holdingLocation || "")
      setFulfillment(scenarioParams.fulfillment || "")
      setDeliveryLocation(scenarioParams.deliveryLocation || "")
      setRequestTime(scenarioParams.requestTime || "")
      setCurrentTime(scenarioParams.currentTime || "")
    }
  }

  if (
    currentParams.fulfillment !== fulfillment ||
    currentParams.holdingLocation !== holdingLocation ||
    currentParams.deliveryLocation !== deliveryLocation ||
    currentParams.requestTime !== requestTime ||
    currentParams.currentTime !== currentTime
  ) {
    if (scenario && scenarios[scenario]) {
      Object.keys(scenarios[scenario]).forEach((key) => {
        if (scenarios[scenario][key] !== eval(key)) {
          console.log(
            "Detected divergence from scenario: ",
            key,
            scenarios[scenario][key],
            eval(key)
          )
        }
      })
    }
    setCurrentParams({
      fulfillment,
      holdingLocation,
      deliveryLocation,
      requestTime,
      currentTime,
      scenario,
    })

    let paramsValid = true

    // Validate dates:
    Object.entries({
      "Request time": requestTime,
      "Current time": currentTime,
    }).forEach(([label, time]) => {
      if (time && !validDate(time)) {
        console.log("Validating time: ", time)
        setError(`${label} (${requestTime}) is invalid`)
        setLoading(false)
        paramsValid = paramsValid && false
      }
    })

    if (!paramsValid) return
  }

  return (
    <>
      <Head>
        <title>Test Pickup Times | {SITE_NAME}</title>
      </Head>
      <Layout>
        <Heading level="h2" mb="xl" size="heading4">
          Test Pickup Times
        </Heading>
        <Form
          id="advancedSearchForm"
          // We are using a post request on advanced search when JS is disabled so that we can build the query
          // string correctly on the server and redirect the user to the search results.
          method="post"
          action={`${BASE_URL}/search`}
        >
          <FormRow gap="grid.m">
            <FormField id="advancedSearchLeft" gap="grid.s">
              <Select
                id="scenario"
                name="scenario"
                labelText="Preloaded Scenarios"
                value={scenario}
                onChange={(e) =>
                  setScenario((e.target as HTMLInputElement).value)
                }
              >
                {scenarioOptions.map((opt) => {
                  return (
                    <option value={opt.value} key={opt.value}>
                      {opt.label}
                    </option>
                  )
                })}
              </Select>

              <TextInput
                id="holdingLocation"
                labelText="Item Location"
                type="text"
                name="holdingLocation"
                value={holdingLocation}
                key="holdingLocation"
                onChange={(e) => setHoldingLocation(e.target.value)}
                ref={inputRef}
              />
              <Select
                id="fulfillment"
                name="fulfillment"
                labelText="Fulfillment"
                value={fulfillment}
                onChange={(e) =>
                  setFulfillment((e.target as HTMLInputElement).value)
                }
              >
                {fulfillmentOptions.map((opt) => {
                  return (
                    <option value={opt.value} key={opt.value}>
                      {opt.label}
                    </option>
                  )
                })}
              </Select>
              <TextInput
                id="deliveryLocation"
                labelText="Delivery Location (opt)"
                type="text"
                name="deliveryLocation"
                value={deliveryLocation}
                key="deliveryLocation"
                onChange={(e) => setDeliveryLocation(e.target.value)}
                ref={inputRef}
              />
              <TextInput
                id="requestTime"
                labelText="Requested at (opt)"
                type="text"
                name="requestTime"
                value={requestTime}
                key="requestTime"
                onChange={(e) => setRequestTime(e.target.value)}
                ref={inputRef}
              />
              <TextInput
                id="currentTime"
                labelText="Current time (opt)"
                type="text"
                name="currentTime"
                value={currentTime}
                key="currentTime"
                onChange={(e) => setCurrentTime(e.target.value)}
                ref={inputRef}
              />
            </FormField>
            <FormField id="advancedSearchRight" gap="grid.s">
              {loading && "Loading ..."}
              {error && <>{error}</>}
              {!loading && !error && result && (
                <>
                  <Heading level="h3">Result</Heading>
                  <p>&quot;{result.estimate}&quot;</p>

                  <Heading level="h3">Rationale</Heading>

                  {requestTime && (
                    <p>Requested at {new Date(requestTime).toLocaleString()}</p>
                  )}

                  <p>
                    Estimated arrival:{" "}
                    <span title={result.time}>
                      {new Date(result.time).toLocaleString()} ET
                    </span>{" "}
                    ({result.time})
                  </p>

                  <ul>
                    {result.rationale?.map((r, index) => {
                      return (
                        <li key={`rationale-${index}`}>
                          <span title={r.time}>
                            {new Date(r.time).toLocaleString()}
                          </span>
                          {r.ellapsed && <> (+{r.ellapsed})</>}: {r.activity}
                        </li>
                      )
                    })}
                  </ul>
                </>
              )}
            </FormField>
          </FormRow>
          <HorizontalRule __css={{ margin: 0 }} />
          <ButtonGroup
            id="advancedSearchButtons"
            buttonWidth="default"
            __css={{
              gap: "xs",
              marginLeft: "auto",
            }}
          >
            <Button id="advancedSearchSubmit" type="submit" size="large">
              Submit
            </Button>
          </ButtonGroup>
        </Form>
      </Layout>
    </>
  )
}

export async function getServerSideProps({ resolvedUrl }) {
  const queryString = resolvedUrl.slice(resolvedUrl.indexOf("?") + 1)
  const params = parse(queryString)
  let { fulfillment, holdingLocation } = params
  const { deliveryLocation, requestTime } = params
  fulfillment = fulfillment || "fulfillment:sasb-onsite"
  holdingLocation = holdingLocation || "mal92"

  // Override the pickupTimeEstimator's sense of when "now" is:
  overrideNow(params.currentTime || new Date().toISOString())

  const type =
    typeof fulfillment === "string" &&
    (/edd$/.test(fulfillment) ? "edd" : "phys")
  const result = await getPickupTimeEstimate(
    {
      [`${type}Fulfillment`]: fulfillment,
      holdingLocation: [{ id: holdingLocation }],
      idNyplSourceId: { "@type": "SierraNypl" },
    },
    deliveryLocation,
    type,
    requestTime
  ).catch((e) => {
    return {
      error: e.message,
    }
  })
  // const result = null

  return {
    props: {
      fulfillment,
      holdingLocation,
      result: JSON.parse(JSON.stringify(result)),
    },
  }
}

export default TestPickupTimes
