import { Heading, Text, Flex } from "@nypl/design-system-react-components"
import { useRouter } from "next/router"
import Layout from "../src/components/Layout/Layout"
import { SITE_NAME } from "../src/config/constants"
import RCHead from "../src/components/Head/RCHead"
import type { RCPage } from "../src/types/pageTypes"
import Image from "next/image"
import errorImage from "../src/assets/errorImage.png"
import type { HTTPStatusCode } from "../src/types/appTypes"
import ContactUs from "../src/components/ContactUs/ContactUs"
import ReloadButton from "../src/components/ReloadButton/ReloadButton"
import initializePatronTokenAuth from "../src/server/auth"

type ErrorPageProps = {
  activePage: RCPage
  statusCode?: HTTPStatusCode | null
  isAuthenticated?: boolean
}

// Global catch-all error page.
function Error({ activePage, statusCode, isAuthenticated }: ErrorPageProps) {
  const { query } = useRouter()
  // Test-only hook
  if (query.breakErrorPage === "1") {
    throw new globalThis.Error("Simulated ErrorPage render failure")
  }
  const metadataTitle = `Error | ${SITE_NAME}`
  return (
    <>
      <RCHead metadataTitle={metadataTitle} />
      <Layout activePage={activePage} isAuthenticated={isAuthenticated}>
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
            Try <ReloadButton /> or <ContactUs errorStatus={statusCode} /> if
            the error persists.
          </Text>
        </Flex>
      </Layout>
    </>
  )
}

Error.getInitialProps = async ({
  req,
  res,
  err,
}: {
  req?: any
  res?: any
  err?: any
}) => {
  const statusCode = res?.statusCode ?? err?.statusCode ?? 500
  console.error(`Error in Next _error boundary: ${err}`)
  const isAuthenticated = req
    ? (await initializePatronTokenAuth(req.cookies)).isTokenValid
    : undefined
  return { statusCode, isAuthenticated }
}

export default Error
