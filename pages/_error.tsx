import { Heading, Text, Flex, Link } from "@nypl/design-system-react-components"
import Layout from "../src/components/Layout/Layout"
import { SITE_NAME } from "../src/config/constants"
import RCHead from "../src/components/Head/RCHead"
import type { RCPage } from "../src/types/pageTypes"
import Image from "next/image"
import errorImage from "../src/assets/errorImage.png"
import { useContext } from "react"
import { FeedbackContext } from "../src/context/FeedbackContext"
import type { HTTPStatusCode } from "../src/types/appTypes"

type ErrorPageProps = {
  activePage: RCPage
  statusCode?: HTTPStatusCode | null
}

// Global catch-all for unhandled errors.
function Error({ activePage, statusCode }: ErrorPageProps) {
  const metadataTitle = `Error | ${SITE_NAME}`
  const { openFeedbackFormWithError } = useContext(FeedbackContext)
  return (
    <>
      <RCHead metadataTitle={metadataTitle} />
      <Layout activePage={activePage}>
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
          <Text marginBottom="0">
            We encountered an error while trying to load the page.
          </Text>
          <Text marginBottom="0">
            Try refreshing the page or{" "}
            <Link
              onClick={() => openFeedbackFormWithError(statusCode)}
              id="feedback-link"
            >
              contact us
            </Link>{" "}
            if the error persists.
          </Text>
        </Flex>
      </Layout>
    </>
  )
}

Error.getInitialProps = ({ res, err }: { res?: any; err?: any }) => {
  const statusCode = res?.statusCode ?? err?.statusCode ?? 500
  return { statusCode }
}

export default Error
