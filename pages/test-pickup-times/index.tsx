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
} from "@nypl/design-system-react-components"
import type { TextInputRefType } from "@nypl/design-system-react-components"

import Layout from "../../src/components/Layout/Layout"

import { BASE_URL, SITE_NAME } from "../../src/config/constants"
import { getPickupTimeEstimate, overrideNow } from "@nypl/pickup-time-estimator"
import {
  fulfillmentOptions,
  scenarios,
  scenarioOptions,
  validDate,
} from "../../src/utils/testPickupTimesUtils"

interface CurrentParams {
  fulfillment: string
  holdingLocation: string
  deliveryLocation: string
  requestTime: string
  currentTime: string
  scenario: string
}

/**
 * This is a tool for testing pickup time estimates for different permutations
 * of item, destination, and request time. Although public, it is intended for
 * internal use.
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
  const error = params.error

  const [scenario, setScenario] = useState("")

  const updateRoute = () => {
    const queryString = stringify(currentParams)
    router.push(`/test-pickup-times?${queryString}`)
  }

  useEffect(updateRoute, [currentParams])

  if (
    currentParams &&
    scenario !== currentParams.scenario &&
    scenarios[scenario]
  ) {
    const scenarioParams = scenarios[scenario]
    setHoldingLocation(scenarioParams.holdingLocation || "")
    setFulfillment(scenarioParams.fulfillment || "")
    setDeliveryLocation(scenarioParams.deliveryLocation || "")
    setRequestTime(scenarioParams.requestTime || "")
    setCurrentTime(scenarioParams.currentTime || "")
  }

  if (
    currentParams.fulfillment !== fulfillment ||
    currentParams.holdingLocation !== holdingLocation ||
    currentParams.deliveryLocation !== deliveryLocation ||
    currentParams.requestTime !== requestTime ||
    currentParams.currentTime !== currentTime
  ) {
    setCurrentParams({
      fulfillment,
      holdingLocation,
      deliveryLocation,
      requestTime,
      currentTime,
      scenario,
    })
  }

  return (
    <>
      <Head>
        <title>Test Pickup Times | {SITE_NAME}</title>
      </Head>
      <Layout activePage="">
        <Heading level="h2" mb="xl" size="heading4">
          Test Pickup Times
        </Heading>
        <Form
          data-testid="testPickupTimeForm"
          id="testPickupTimeForm"
          method="post"
          action={`${BASE_URL}/test-pickup-times`}
        >
          <FormRow gap="grid.m">
            <FormField gap="grid.s">
              <Select
                id="scenario"
                name="scenario"
                labelText="Preloaded Scenarios"
                value={scenario}
                onChange={(e) =>
                  setScenario((e.target as HTMLSelectElement).value)
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
              <HorizontalRule __css={{ margin: 0 }} />

              <TextInput
                id="holdingLocation"
                labelText="Item location"
                name="holdingLocation"
                value={holdingLocation}
                onChange={(e) => setHoldingLocation(e.target.value)}
                ref={inputRef}
              />
              <Select
                id="fulfillment"
                name="fulfillment"
                labelText="Fulfillment"
                value={fulfillment}
                onChange={(e) =>
                  setFulfillment((e.target as HTMLSelectElement).value)
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
                labelText="Delivery location (opt)"
                name="deliveryLocation"
                value={deliveryLocation}
                onChange={(e) => setDeliveryLocation(e.target.value)}
                ref={inputRef}
              />
              <TextInput
                id="requestTime"
                labelText="Requested at (opt)"
                name="requestTime"
                value={requestTime}
                onChange={(e) => setRequestTime(e.target.value)}
                ref={inputRef}
              />
              <TextInput
                id="currentTime"
                labelText="Current time (opt)"
                name="currentTime"
                value={currentTime}
                onChange={(e) => setCurrentTime(e.target.value)}
                ref={inputRef}
              />
            </FormField>
            <FormField id="testPickupTimesRight" gap="grid.s">
              {error && <>{error}</>}
              {!error && result && (
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
        </Form>
      </Layout>
    </>
  )
}

export async function getServerSideProps({ resolvedUrl }) {
  const queryString = resolvedUrl.slice(resolvedUrl.indexOf("?") + 1)
  const params = parse(queryString)
  const { deliveryLocation, requestTime, currentTime } = params
  let { fulfillment, holdingLocation } = params
  fulfillment = fulfillment || "fulfillment:sasb-onsite"
  holdingLocation = holdingLocation || "mal92"

  // Override the pickupTimeEstimator's sense of when "now" is:
  overrideNow(currentTime || new Date().toISOString())

  let error = null
  let paramsValid = true

  // Validate dates:
  Object.entries({
    "Request time": requestTime,
    "Current time": currentTime,
  }).forEach(([label, time]) => {
    if (time && !validDate(time)) {
      error = `${label} (${time}) is invalid`
      paramsValid = paramsValid && false
    }
  })

  const type =
    typeof fulfillment === "string" &&
    (/edd$/.test(fulfillment) ? "edd" : "phys")

  let result = null
  if (paramsValid) {
    result = await getPickupTimeEstimate(
      {
        [`${type}Fulfillment`]: fulfillment,
        holdingLocation: [{ id: holdingLocation }],
        idNyplSourceId: { "@type": "SierraNypl" },
      },
      deliveryLocation,
      type,
      requestTime
    ).catch((e) => {
      error = e.message
      error += "\n__________________________________" + e.stack
      return {}
    })
  }

  return {
    props: {
      fulfillment,
      holdingLocation,
      deliveryLocation: deliveryLocation || null,
      requestTime: requestTime || null,
      currentTime: currentTime || null,
      result: result,
      error,
    },
  }
}

export default TestPickupTimes
