import { Box } from "@nypl/design-system-react-components"
import { appConfig } from "../../../config/config"
import type Item from "../../../models/Item"
import ExternalLink from "../../Links/ExternalLink/ExternalLink"

const AvailableOnsite = ({ item }: { item: Item }) => {
  const locationShort = item.location.prefLabel.split("-")[0]
  return (
    <>
      <Box as="span" color="ui.success.primary">
        Available
      </Box>
      {" - Can be used on site. Please visit "}
      <ExternalLink
        href={`${appConfig.urls.locations}${item.location.endpoint}`}
      >
        {`New York Public Library - ${locationShort}`}
      </ExternalLink>
      {" to submit a request in person."}
    </>
  )
}

export default AvailableOnsite
