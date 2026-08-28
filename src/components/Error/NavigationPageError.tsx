import {
  Button,
  DSProvider,
  Flex,
  Heading,
  Text,
} from "@nypl/design-system-react-components"
import Image from "next/image"
import errorImage from "../../assets/errorImage.png"
import { SITE_NAME } from "../../config/constants"
import RCHead from "../Head/RCHead"
import ContactUs from "../ContactUs/ContactUs"
import Link from "../Link/Link"

/* Display full-page error when client-side navigation fails (like WAF returning non-JSON). */
export default function NavigationPageError() {
  const contactUsLink = <ContactUs errorStatus={500} />
  return (
    <>
      <RCHead metadataTitle={`Error | ${SITE_NAME}`} />
      <DSProvider>
        <Flex
          flexDir="column"
          marginTop="xxl"
          marginBottom="xxl"
          marginLeft="l"
          marginRight="l"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
        >
          <Image
            src={errorImage}
            alt="Error image"
            width={98}
            height={68}
            style={{ marginBottom: "48px" }}
          />
          <Heading level="h3" mb="s">
            Something went wrong on our end
          </Heading>
          <Text>
            We encountered an error while trying to load the page. <br /> Try{" "}
            <Button
              id="navigation-error-reload"
              onClick={() => window.location.reload()}
              variant="text"
              sx={{
                display: "inline",
                fontWeight: "inherit",
                fontSize: "inherit",
                p: 0,
                height: "auto",
                minHeight: "auto",
                textDecoration: "underline",
                textDecorationStyle: "dotted",
                textDecorationThickness: "1px",
                textUnderlineOffset: "2px",
              }}
            >
              reloading the page
            </Button>{" "}
            or{" "}
            <Link isExternal href="https://www.nypl.org/get-help/contact-us">
              contact us
            </Link>{" "}
            if the error persists.
          </Text>
        </Flex>
      </DSProvider>
    </>
  )
}
