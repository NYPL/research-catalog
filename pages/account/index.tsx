import Head from "next/head"
import { Heading, Text } from "@nypl/design-system-react-components"
import Layout from "../../src/components/Layout/Layout"
import initializePatronTokenAuth, {
  getLoginRedirect,
} from "../../src/server/auth"
import { MyAccountFactory } from "../../src/models/MyAccount"
import type { Checkout, Hold, Patron, Fine } from "../../src/types/accountTypes"

interface MyAccountPropsType {
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
}: MyAccountPropsType) {
  const sierraClientErrorThrown = !patron.name
  console.log(checkouts, holds, patron, fines)
  return (
    <>
      <Head>
        <title>My Account</title>
      </Head>
      <Layout isAuthenticated={isAuthenticated} activePage="account">
        <Heading level="h1">my account</Heading>
        {sierraClientErrorThrown && (
          <Text>
            We are unable to display your account information at this time.
            Please contact gethelp@nypl.org for assistance.
          </Text>
        )}
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
  try {
    const { checkouts, holds, patron, fines } = await MyAccountFactory(id)
    return { props: { checkouts, holds, patron, fines, isAuthenticated } }
  } catch (e) {
    console.log(e.message)
    return {
      props: {
        patron: {},
        isAuthenticated,
      },
    }
  }
}
