import { Banner, Text } from "@nypl/design-system-react-components"

import { appConfig } from "../../config/config"
import RCLink from "../Links/RCLink/RCLink"

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
            <RCLink
              isExternal
              href={`${appConfig.urls.circulatingCatalog}?openAccount=fines-and-fees`}
            >
              {" "}
              online through the Library website
            </RCLink>
            .
          </Text>
        </>
      }
    />
  )
}

export default FeesBanner
