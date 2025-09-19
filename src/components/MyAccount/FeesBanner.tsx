import { Banner, Text } from "@nypl/design-system-react-components"

import ExternalLink from "../Links/ExternalLink/ExternalLink"
import { appConfig } from "../../config/config"

const FeesBanner = () => {
  return (
    <Banner
      mb="m"
      variant="negative"
      content={
        <>
          <Text mb={0}>
            You have outstanding fees. Borrowing privileges will be suspended
            for cardholders with replacement fees totaling $100 or more. Fees
            can be paid at any New York Public Library branch in cash, U.S.
            Postal money order, personal check, or{" "}
            <ExternalLink
              href={`${appConfig.urls.circulatingCatalog}?openAccount=fines-and-fees`}
            >
              {" "}
              online through the Library website
            </ExternalLink>
            .
          </Text>
        </>
      }
    />
  )
}

export default FeesBanner
