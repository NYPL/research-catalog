import {
  Heading,
  SimpleGrid,
  Card,
  CardHeading,
  CardContent,
  Box,
  SkeletonLoader,
  Flex,
} from "@nypl/design-system-react-components"

import Layout from "../src/components/Layout/Layout"
import ExternalLink from "../src/components/Links/ExternalLink/ExternalLink"

import { SITE_NAME } from "../src/config/constants"
import { appConfig } from "../src/config/config"
import initializePatronTokenAuth from "../src/server/auth"
import useLoading from "../src/hooks/useLoading"
import RCHead from "../src/components/Head/RCHead"

interface HomeProps {
  bannerNotification?: string
  isAuthenticated: boolean
}

export default function Home({
  bannerNotification,
  isAuthenticated,
}: HomeProps) {
  const isLoading = useLoading()
  return (
    <>
      <RCHead metadataTitle={SITE_NAME} />
      <Layout
        isAuthenticated={isAuthenticated}
        activePage="search"
        bannerNotification={bannerNotification}
      >
        {isLoading ? (
          <Flex
            justifyContent="space-between"
            marginTop="xxs"
            direction="row"
            gap="m"
          >
            <SkeletonLoader showImage={false} width="250px" />
            <SkeletonLoader showImage={false} />
          </Flex>
        ) : (
          <>
            <Heading level="h2">
              Explore the Library&apos;s Vast Research Collections &amp; More
            </Heading>
            <Box>
              <p>
                Discover millions of items from The New York Public
                Library&apos;s Stephen A. Schwarzman Building, Schomburg Center
                for Research in Black Culture, and The New York Public Library
                for the Performing Arts. Plus, access materials from library
                collections at Columbia University, Harvard University, and
                Princeton University.{" "}
                <ExternalLink
                  href="/research/collections/about/shared-collection-catalog"
                  aria-label="Learn more about the Research Catalog."
                >
                  Learn more.
                </ExternalLink>
              </p>
              <p>
                Please note that the Research Catalog does not include
                circulating materials. For books and more that you can check out
                to take home please visit our{" "}
                <ExternalLink href={appConfig.urls.circulatingCatalog}>
                  circulating branch catalog.
                </ExternalLink>{" "}
                The{" "}
                <ExternalLink href={appConfig.urls.legacyCatalog}>
                  legacy research catalog
                </ExternalLink>{" "}
                is still available, but does not include all of our Scan &amp;
                Deliver options or the Columbia University, Harvard University,
                and Princeton University material from the Shared Collection.
              </p>
            </Box>
            <SimpleGrid columns={1} gap="grid.m">
              <Heading level="h3" noSpace>
                Research at NYPL
              </Heading>
              <Card
                imageProps={{
                  alt: "Manuscript from NYPL Research Archive",
                  aspectRatio: "twoByOne",
                  size: "large",
                  src: "https://cdn-petrol.nypl.org/sites/default/media/styles/extralarge/public/archives-portal.jpg?itok=-oYtHmeO",
                }}
                layout="row"
              >
                <CardHeading level="h4" url="/research/collections">
                  Collections
                </CardHeading>
                <CardContent>
                  <p>
                    Discover our world-renowned research collections, featuring
                    more than 46 million items.
                  </p>
                </CardContent>
              </Card>
              <Card
                imageProps={{
                  alt: "Exterior shot of Stephen A. Schwarzman building",
                  aspectRatio: "twoByOne",
                  size: "large",
                  src: "https://cdn-petrol.nypl.org/sites/default/media/styles/extralarge/public/sasb.jpg?itok=sdQBITR7",
                }}
                layout="row"
              >
                <CardHeading level="h4" url="/locations/map?libraries=research">
                  Locations
                </CardHeading>
                <CardContent>
                  <p>
                    Access items, one-on-one reference help, and dedicated
                    research study rooms.
                  </p>
                </CardContent>
              </Card>
              <Card
                imageProps={{
                  alt: "The Lionel Pincus and Princess Firyal Map Division.",
                  aspectRatio: "twoByOne",
                  size: "large",
                  src: "https://cdn-petrol.nypl.org/sites/default/media/styles/extralarge/public/divisions.jpg?itok=O4uSedcp",
                }}
                layout="row"
              >
                <CardHeading level="h4" url="/about/divisions">
                  Divisions
                </CardHeading>
                <CardContent>
                  <p>
                    Learn about the subject and media specializations of our
                    research divisions.
                  </p>
                </CardContent>
              </Card>
              <Card
                imageProps={{
                  alt: "Man doing research in Rose main Reading Room",
                  aspectRatio: "twoByOne",
                  size: "large",
                  src: "https://cdn-petrol.nypl.org/sites/default/media/styles/extralarge/public/plan-you-visit.jpg?itok=scG6cFgy",
                }}
                layout="row"
              >
                <CardHeading level="h4" url="/research/support">
                  Support
                </CardHeading>
                <CardContent>
                  <p>
                    Plan your in-person research visit and discover resources
                    for scholars and writers.
                  </p>
                </CardContent>
              </Card>
              <Card
                imageProps={{
                  alt: "Man wheeling cart in NYPL stacks",
                  aspectRatio: "twoByOne",
                  size: "large",
                  src: "https://cdn-petrol.nypl.org/sites/default/media/styles/extralarge/public/research-services.jpg?itok=rSo9t1VF",
                }}
                layout="row"
              >
                <CardHeading level="h4" url="/research/services">
                  Services
                </CardHeading>
                <CardContent>
                  <p>
                    Explore services for online and remote researchers, as well
                    as our interlibrary services.
                  </p>
                </CardContent>
              </Card>
            </SimpleGrid>
          </>
        )}
      </Layout>
    </>
  )
}

export async function getServerSideProps({ req }) {
  const bannerNotification = process.env.SEARCH_RESULTS_NOTIFICATION || ""
  // Every page that needs patron data must call initializePatronTokenAuth
  // to find if the token is valid and what the patron id is.
  const patronTokenResponse = await initializePatronTokenAuth(req.cookies)
  // Now it can be used to get patron data from Sierra or Platform API
  // or use `isTokenValid` to redirect to login page if it's not valid.
  const isAuthenticated = patronTokenResponse.isTokenValid
  // return props object
  return {
    props: { isAuthenticated, bannerNotification },
  }
}
