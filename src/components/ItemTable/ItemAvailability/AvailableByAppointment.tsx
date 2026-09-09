import { Box } from "@nypl/design-system-react-components"
import { appConfig } from "../../../config/appConfig"
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
      <span>{"\u00A0at\u00A0"}</span>
      <Link
        translate="no"
        isExternal
        href={`${appConfig.urls.locations}${location.endpoint}`}
      >
        <span translate="no">{`${location.prefLabel}.`}</span>
      </Link>
    </>
  )
}

const AvailableAt = ({ location }) => {
  if (!location?.endpoint) return null
  return (
    <>
      <span>{"\u00A0at\u00A0"}</span>
      <span translate="no">{`${location.prefLabel}.`}</span>
      <span>{"\u00A0"}</span>
    </>
  )
}

export { AvailableByAppointment, AvailableAtLink, AvailableAt }
