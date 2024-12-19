import { Box } from "@nypl/design-system-react-components"
import { appConfig } from "../../../config/config"
import ExternalLink from "../../Links/ExternalLink/ExternalLink"

const AvailableByAppointment = () => {
  return (
    <>
      <Box as="span" color="ui.success.primary">
        Available by appointment.
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
        {location.prefLabel}
      </ExternalLink>
    </>
  )
}

const AvailableAt = ({ location }) => {
  if (!location?.endpoint) return null
  else return ` at ${location.prefLabel}`
}

export { AvailableByAppointment, AvailableAtLink, AvailableAt }
