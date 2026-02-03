import { Banner, Text } from "@nypl/design-system-react-components"

import { appConfig } from "../../config/config"
import Link from "../Link/Link"

const FeesBanner = () => {
  return (
    <Banner
      variant="negative"
      content={
        <>
          <Text mb={0}>
            You have outstanding fees. Borrowing privileges will be suspended
            for cardholders with replacement fees totaling $100 or more. Fees
            can be paid at any New York Public Library branch in cash, U.S.
            Postal money order, personal check, or{" "}
            <Link
              isExternal
              href={`${appConfig.urls.circulatingCatalog}?openAccount=fines-and-fees`}
            >
              {" "}
              online through the Library website
            </Link>
            .
          </Text>
        </>
      }
    />
  )
}

export default FeesBanner
