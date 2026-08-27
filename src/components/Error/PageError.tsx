import {
  Button,
  Heading,
  Flex,
  Text,
} from "@nypl/design-system-react-components"
import type { HTTPStatusCode } from "../../types/appTypes"
import { SITE_NAME } from "../../config/constants"
import RCHead from "../Head/RCHead"
import Layout from "../Layout/Layout"
import Image from "next/image"
import errorImage from "../../assets/errorImage.png"
import type { RCPage } from "../../types/pageTypes"
import Link from "../Link/Link"
import ContactUs from "../ContactUs/ContactUs"

type PageErrorProps = {
  page?: RCPage
  errorStatus: HTTPStatusCode | "navigation"
}

/* Display error state that replaces entire page contents. */
export default function PageError({ errorStatus, page }: PageErrorProps) {
  let metadataTitle = "Error"
  let errorContent
  const headingID = page ? `${page}-results-heading` : undefined
  const contactUsLink =
    errorStatus !== "navigation" ? (
      <ContactUs errorStatus={errorStatus} />
    ) : (
      <ContactUs errorStatus={500} />
    )

  switch (errorStatus) {
    case "navigation":
      errorContent = (
        <>
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
            or {contactUsLink} if the error persists.
          </Text>
        </>
      )
      break

    case 404:
      metadataTitle = "Page not found"
      errorContent = (
        <>
          <Heading level="h3" mb="s">
            We couldn&apos;t find that page
          </Heading>
          <Text>
            The page you were looking for doesn&apos;t exist or may have moved
            elsewhere.
          </Text>
          <Text>
            Try a <Link href="/">new search</Link> or {contactUsLink} if the
            error persists.
          </Text>
        </>
      )
      break

    case 500:
      errorContent = (
        <>
          <Heading level="h3" tabIndex={-1} id={headingID} mb="s">
            Something went wrong on our end
          </Heading>
          <Text marginBottom="0">
            We encountered an error while trying to load the page.
          </Text>
          <Text marginBottom="0">
            Try refreshing the page or {contactUsLink} if the error persists.
          </Text>
        </>
      )
      break

    // 4xx
    default:
      errorContent = (
        <>
          <Heading level="h3" tabIndex={-1} id={headingID} mb="s">
            There was an unexpected error
          </Heading>
          <Text marginBottom="0">
            We couldn&apos;t process your request at this time.
          </Text>
          <Text marginBottom="0">
            Try again later or {contactUsLink} if the error persists.
          </Text>
        </>
      )
      break
  }

  return (
    <>
      <RCHead metadataTitle={`${metadataTitle} | ${SITE_NAME}`} />
      <Layout activePage={page}>
        <Flex
          flexDir="column"
          marginTop="l"
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
            width={96}
            height={64}
            style={{ marginBottom: "48px" }}
          />
          {errorContent}
        </Flex>
      </Layout>
    </>
  )
}
