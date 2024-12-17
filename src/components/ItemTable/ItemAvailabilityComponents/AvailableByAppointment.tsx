import { Box } from "@nypl/design-system-react-components"
import { appConfig } from "../../../config/config"
import ExternalLink from "../../Links/ExternalLink/ExternalLink"

const AvailableByAppointment = ({ item }) => {
  return (
    <>
      <Box as="span" color="ui.success.primary">
        Available by appointment
      </Box>
      {!item.isReCAP && (
        <>
          {" at "}
          <ExternalLink
            href={`${appConfig.urls.locations}${item.location.endpoint}`}
          >
            {item.location.prefLabel}
          </ExternalLink>
        </>
      )}
    </>
  )
}

export default AvailableByAppointment
