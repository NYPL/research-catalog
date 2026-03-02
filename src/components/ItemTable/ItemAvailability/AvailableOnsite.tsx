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
      {" - Can be used onsite. Please visit "}
      <Link isExternal href={`${appConfig.urls.locations}${location.endpoint}`}>
        {`New York Public Library - ${locationShort}`}
      </Link>
      {" to submit a request in person."}
    </>
  )
}

export default AvailableOnsite
