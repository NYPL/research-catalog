import { Box } from "@nypl/design-system-react-components"
import { appConfig } from "../../../config/config"
import Link from "../../Link/Link"

const AvailableByAppointment = ({ displayPeriod = false }) => {
  return (
    <Box as="span" color="ui.success.primary">
      {`Available by appointment${displayPeriod ? ". " : ""}`}
    </Box>
  )
}

const AvailableAtLink = ({ location }) => {
  if (!location?.endpoint) return null
  return (
    <>
      {" at "}
      <Link isExternal href={`${appConfig.urls.locations}${location.endpoint}`}>
        {location.prefLabel + "."}
      </Link>
    </>
  )
}

const AvailableAt = ({ location }) => {
  if (!location?.endpoint) return null
  return <> {` at ${location.prefLabel}. `}</>
}

export { AvailableByAppointment, AvailableAtLink, AvailableAt }
