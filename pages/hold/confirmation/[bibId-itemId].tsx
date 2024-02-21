import { Heading } from "@nypl/design-system-react-components"
import Head from "next/head"

export default function Confirmation() {
  return (
    <>
      <Head>
        <title>Confirmation</title>
      </Head>
      <Heading>Confirmation</Heading>
    </>
  )
}

/**
 * @TODO Redirect if the patron is not logged in.
 */
export async function getServerSideProps() {
  return {}
}
