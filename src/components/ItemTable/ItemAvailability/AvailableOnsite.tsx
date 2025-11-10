import { Box } from "@nypl/design-system-react-components"
import { appConfig } from "../../../config/config"
import ExternalLink from "../../Links/ExternalLink/ExternalLink"

const AvailableOnsite = ({ location }) => {
  const locationShort = location.prefLabel.split("-")[0]
  return (
    <>
      <Box as="span" color="ui.success.primary">
        Available
      </Box>
      {" - Can be used onsite. Please visit "}
      <ExternalLink href={`${appConfig.urls.locations}${location.endpoint}`}>
        {`New York Public Library - ${locationShort}`}
      </ExternalLink>
      {" to submit a request in person."}
    </>
  )
}

export default AvailableOnsite
