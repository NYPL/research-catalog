import Head from "next/head"
import RCLink from "../src/components/RCLink/RCLink"
import {
  Heading,
  SimpleGrid,
  Card,
  CardHeading,
  CardContent,
} from "@nypl/design-system-react-components"

export default function Home() {
  return (
    <div style={{ paddingBottom: "var(--nypl-space-l)" }}>
      <Head>
        <title>NYPL Research Catalog</title>
      </Head>
      <Heading level="two">
        Explore the Library&apos;s Vast Research Collections & More
      </Heading>
      <div>
        <p>
          Discover millions of items from The New York Public Library&apos;s
          Stephen A. Schwarzman Building, Schomburg Center for Research in Black
          Culture, and The New York Public Library for the Performing Arts.
          Plus, access materials from library collections at Columbia
          University, Harvard University, and Princeton University.{" "}
          <RCLink href="https://www.nypl.org/research/collections/about/shared-collection-catalog">
            Learn more.
          </RCLink>
        </p>
        <p>
          Please note that the Research Catalog does not include circulating
          materials. For books and more that you can check out to take home
          please visit our{" "}
          <RCLink href="https://browse.nypl.org">
            circulating branch catalog.
          </RCLink>{" "}
          The{" "}
          <RCLink href="https://legacycatalog.nypl.org/">
            legacy research catalog
          </RCLink>{" "}
          is still available, but does not include all of our Scan & Deliver
          options or the Columbia University, Harvard University, and Princeton
          University material from the Shared Collection.
        </p>
      </div>
      <SimpleGrid columns={1} gap="grid.m">
        <Heading level="three" noSpace>
          Research at NYPL
        </Heading>
        <Card
          imageProps={{
            alt: "Image of manuscript from NYPL Research Archive",
            aspectRatio: "twoByOne",
            size: "large",
            src: "https://cdn-petrol.nypl.org/sites/default/media/styles/extralarge/public/archives-portal.jpg?itok=-oYtHmeO",
          }}
          layout="row"
        >
          <CardHeading level="four">
            <RCLink href="https://nypl.org/research/collections">
              Collections
            </RCLink>
          </CardHeading>
          <CardContent>
            <p>
              Discover our world-renowned research collections, featuring more
              than 46 million items.
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
          <CardHeading level="four">
            <RCLink href="https://nypl.org/locations/map?libraries=research">
              Locations
            </RCLink>
          </CardHeading>
          <CardContent>
            <p>
              Access items, one-on-one reference help, and dedicated research
              study rooms.
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
          <CardHeading level="four">
            <RCLink href="https://nypl.org/about/divisions">Divisions</RCLink>
          </CardHeading>
          <CardContent>
            <p>
              Learn about the subject and media specializations of our research
              divisions.
            </p>
          </CardContent>
        </Card>
        <Card
          imageProps={{
            alt: "Image of man doing research in Rose main Reading Room",
            aspectRatio: "twoByOne",
            size: "large",
            src: "https://cdn-petrol.nypl.org/sites/default/media/styles/extralarge/public/plan-you-visit.jpg?itok=scG6cFgy",
          }}
          layout="row"
        >
          <CardHeading level="four">
            <RCLink href="https://nypl.org/research/support">Support</RCLink>
          </CardHeading>
          <CardContent>
            <p>
              Plan your in-person research visit and discover resources for
              scholars and writers.
            </p>
          </CardContent>
        </Card>
        <Card
          imageProps={{
            alt: "Image of man wheeling cart in NYPL stacks",
            aspectRatio: "twoByOne",
            size: "large",
            src: "https://cdn-petrol.nypl.org/sites/default/media/styles/extralarge/public/research-services.jpg?itok=rSo9t1VF",
          }}
          layout="row"
        >
          <CardHeading level="four">
            <RCLink href="https://nypl.org/research/services">Services</RCLink>
          </CardHeading>
          <CardContent>
            <p>
              Explore services for online and remote researchers, as well as our
              interlibrary services.
            </p>
          </CardContent>
        </Card>
      </SimpleGrid>
    </div>
  )
}
