import { Heading, Text, Flex } from "@nypl/design-system-react-components"
import { appConfig } from "../../src/config/config"
import Layout from "../../src/components/Layout/Layout"
import RCLink from "../../src/components/Links/RCLink/RCLink"
import { SITE_NAME } from "../../src/config/constants"
import ExternalLink from "../../src/components/Links/ExternalLink/ExternalLink"
import RCHead from "../../src/components/Head/RCHead"
import type { RCPage } from "../../src/types/pageTypes"
import Image from "next/image"
import errorImage from "../../src/assets/errorImage.png"
import type { HTTPStatusCode } from "../../src/types/appTypes"

type ErrorPageProps = {
  activePage: RCPage
  statusCode: HTTPStatusCode
}

export default function CustomError({
  activePage,
  statusCode = 404,
}: ErrorPageProps) {
  const metadataTitle = `${statusCode} | ${SITE_NAME}`
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
          {statusCode === 404 ? (
            <>
              <Heading level="h3">We couldn&apos;t find that page.</Heading>
              <Text marginBottom="xs">
                The page you were looking for doesn&apos;t exist or may have
                moved elsewhere.
              </Text>
              <p>
                Search the <RCLink>Research Catalog</RCLink> or our{" "}
                <ExternalLink href={appConfig.urls.legacyCatalog}>
                  Legacy Catalog
                </ExternalLink>{" "}
                for research materials.
              </p>
            </>
          ) : (
            <>
              <Heading level="h3">Something went wrong on our end.</Heading>
              <Text marginBottom="xs">
                We encountered an error while trying to load the page.
              </Text>
              <Text marginBottom="xs">
                Try refreshing the page or contact us if the error persists.
              </Text>
            </>
          )}
        </Flex>
      </Layout>
    </>
  )
}
