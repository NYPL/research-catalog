import { Link, Banner, Text } from "@nypl/design-system-react-components"
import { appConfig } from "../../config/config"

const FeesBanner = () => {
  return (
    <Banner
      sx={{ "> div ": { maxWidth: "unset" }, marginBottom: "m" }}
      type="negative"
      content={
        <>
          <Text sx={{ marginBottom: 0 }}>
            You have outstanding fees. Borrowing privileges will be suspended
            for cardholders with replacement fees totaling $100 or more. <br />{" "}
            Fees can be paid at any New York Public Library branch in cash, U.S.
            Postal money order, personal check, or{" "}
            <Link
              href={`${appConfig.urls.circulatingCatalog}?openAccount=fines-and-fees`}
              sx={{
                color: "ui.link.primary !important",
                textDecoration: "underline",
                _hover: { color: "ui.link.secondary !important" },
              }}
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
