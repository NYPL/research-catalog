import { Box } from "@nypl/design-system-react-components"
import { appConfig } from "../../../config/appConfig"
import Link from "../../Link/Link"

const AvailableOnsite = ({ location }) => {
  const locationShort = location.prefLabel.split("-")[0]
  return (
    <>
      <Box as="span" color="ui.success.primary">
        Available
      </Box>
      <span>{"\u00A0- Can be used onsite. Please visit\u00A0"}</span>
      <Link
        translate="no"
        isExternal
        href={`${appConfig.urls.locations}${location.endpoint}`}
      >
        <span translate="no">{`New York Public Library - ${locationShort}`}</span>
      </Link>
      <span>{"\u00A0to submit a request in person."}</span>
    </>
  )
}

export default AvailableOnsite
