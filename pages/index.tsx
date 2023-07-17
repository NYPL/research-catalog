import Head from "next/head"
import Link from "next/link"
import ImageCard from "@/components/ImageCard/ImageCard"
import { Heading, Link as DSLink } from "@nypl/design-system-react-components"

export default function Home() {
  return (
    <>
      <Head>
        <title>NYPL Research Catalog</title>
      </Head>
      <main>
        <Heading level="two">
          Explore the Library&apos;s Vast Research Collections & More
        </Heading>
        <div>
          <p>
            Discover millions of items from The New York Public Library&apos;s
            Stephen A. Schwarzman Building, Schomburg Center for Research in
            Black Culture, and The New York Public Library for the Performing
            Arts. Plus, access materials from library collections at Columbia
            University, Harvard University, and Princeton University.{" "}
            <Link
              href="https://www.nypl.org/research/collections/about/shared-collection-catalog"
              passHref
            >
              <DSLink>Learn more.</DSLink>
            </Link>
          </p>
          <p>
            Please note that the Research Catalog does not include circulating
            materials. For books and more that you can check out to take home
            please visit our{" "}
            <Link href="https://browse.nypl.org" passHref>
              <DSLink>circulating branch catalog.</DSLink>
            </Link>{" "}
            The{" "}
            <Link href="https://legacycatalog.nypl.org/" passHref>
              <DSLink>legacy research catalog</DSLink>
            </Link>{" "}
            is still available, but does not include all of our Scan & Deliver
            options or the Columbia University, Harvard University, and
            Princeton University material from the Shared Collection.
          </p>
        </div>
        <div>
          <Heading level="three">Research at NYPL</Heading>
          <ImageCard imageSrc="https://cdn-petrol.nypl.org/sites/default/media/styles/extralarge/public/archives-portal.jpg?itok=-oYtHmeO">
            <>
              <Heading level="four">
                <Link href="https://nypl.org/research/collections" passHref>
                  <DSLink>Collections</DSLink>
                </Link>
              </Heading>
              <p>
                Discover our world-renowned research collections, featuring more
                than 46 million items.
              </p>
            </>
          </ImageCard>

          <ImageCard imageSrc="https://cdn-petrol.nypl.org/sites/default/media/styles/extralarge/public/sasb.jpg?itok=sdQBITR7">
            <>
              <Heading level="four">
                <Link
                  href="https://nypl.org/locations/map?libraries=research"
                  passHref
                >
                  <DSLink>Locations</DSLink>
                </Link>
              </Heading>
              <p>
                Access items, one-on-one reference help, and dedicated research
                study rooms.
              </p>
            </>
          </ImageCard>

          <ImageCard imageSrc="https://cdn-petrol.nypl.org/sites/default/media/styles/extralarge/public/divisions.jpg?itok=O4uSedcp">
            <>
              <Heading level="four">
                <Link href="https://nypl.org/about/divisions" passHref>
                  <DSLink>Divisions</DSLink>
                </Link>
              </Heading>
              <p>
                Learn about the subject and media specializations of our
                research divisions.
              </p>
            </>
          </ImageCard>

          <ImageCard imageSrc="https://cdn-petrol.nypl.org/sites/default/media/styles/extralarge/public/plan-you-visit.jpg?itok=scG6cFgy">
            <>
              <Heading level="four">
                <Link href="https://nypl.org/research/support" passHref>
                  <DSLink>Support</DSLink>
                </Link>
              </Heading>
              <p>
                Plan your in-person research visit and discover resources for
                scholars and writers.
              </p>
            </>
          </ImageCard>

          <ImageCard imageSrc="https://cdn-petrol.nypl.org/sites/default/media/styles/extralarge/public/research-services.jpg?itok=rSo9t1VF">
            <>
              <Heading level="four">
                <Link href="https://nypl.org/research/services" passHref>
                  <DSLink>Services</DSLink>
                </Link>
              </Heading>
              <p>
                Explore services for online and remote researchers, as well as
                our interlibrary services.
              </p>
            </>
          </ImageCard>
        </div>
      </main>
    </>
  )
}
