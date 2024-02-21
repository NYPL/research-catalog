import Head from "next/head"
import { Heading } from "@nypl/design-system-react-components"
import Layout from "../../src/components/Layout/Layout"
import initializePatronTokenAuth, {
  getLoginRedirect,
} from "../../src/server/auth"
import { MyAccountFactory } from "../../src/models/MyAccount"
import type { Checkout, Hold, Patron, Fine } from "../../src/types/accountTypes"

interface MyAccountProps {
  checkouts: Checkout[]
  holds: Hold[]
  patron: Patron
  fines: Fine
  isAuthenticated: boolean
}

export default function MyAccount({
  checkouts,
  holds,
  patron,
  fines,
  isAuthenticated,
}: MyAccountProps) {
  console.log(checkouts, holds, patron, fines)
  return (
    <>
      <Head>
        <title>My Account</title>
      </Head>
      <Layout isAuthenticated={isAuthenticated} activePage="account">
        <Heading level="h1">my account</Heading>
      </Layout>
    </>
  )
}

export async function getServerSideProps({ req }) {
  const patronTokenResponse = await initializePatronTokenAuth(req)
  console.log("patronTokenResponse is", patronTokenResponse)
  const isAuthenticated = patronTokenResponse.isTokenValid
  if (!isAuthenticated) {
    const redirect = getLoginRedirect(req)
    return {
      redirect: {
        destination: redirect,
        permanent: false,
      },
    }
  }
  const id = patronTokenResponse.decodedPatron.sub
  const { checkouts, holds, patron, fines } = await MyAccountFactory(id)
  console.log("sierra Account Data", { checkouts, holds, patron, fines })

  return {
    props: { checkouts, holds, patron, fines, isAuthenticated },
  }
}
