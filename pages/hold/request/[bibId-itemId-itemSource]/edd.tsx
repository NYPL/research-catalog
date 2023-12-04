import { Heading } from "@nypl/design-system-react-components"
import Head from "next/head"

export default function EDD() {
  return (
    <>
      <Head>
        <title>EDD</title>
      </Head>
      <Heading>EDD</Heading>
    </>
  )
}

/**
 * @TODO Redirect if the patron is not logged in.
 */
export async function getServerSideProps() {
  return {}
}
