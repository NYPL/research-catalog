import { Box } from "@nypl/design-system-react-components"
import { appConfig } from "../../../config/config"
import RCLink from "../../Links/RCLink/RCLink"

const AvailableOnsite = ({ location }) => {
  const locationShort = location.prefLabel.split("-")[0]
  return (
    <>
      <Box as="span" color="ui.success.primary">
        Available
      </Box>
      {" - Can be used on site. Please visit "}
      <RCLink
        isExternal
        href={`${appConfig.urls.locations}${location.endpoint}`}
      >
        {`New York Public Library - ${locationShort}`}
      </RCLink>
      {" to submit a request in person."}
    </>
  )
}

export default AvailableOnsite
