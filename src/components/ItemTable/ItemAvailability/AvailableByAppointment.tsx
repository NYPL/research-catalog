import { Box, Text } from "@nypl/design-system-react-components"
import { appConfig } from "../../../config/config"
import ExternalLink from "../../Links/ExternalLink/ExternalLink"

const AvailableByAppointment = ({ displayPeriod = false }) => {
  return (
    <>
      <Box as="span" color="ui.success.primary">
        {`Available by appointment${displayPeriod ? ". " : ""}`}
      </Box>
    </>
  )
}

const AvailableAtLink = ({ location }) => {
  if (!location?.endpoint) return null
  return (
    <>
      {" at "}
      <ExternalLink href={`${appConfig.urls.locations}${location.endpoint}`}>
        {location.prefLabel + "."}
      </ExternalLink>
    </>
  )
}

const AvailableAt = ({ location }) => {
  if (!location?.endpoint) return null
  else return <Text>` at ${location.prefLabel}. `</Text>
}

export { AvailableByAppointment, AvailableAtLink, AvailableAt }
