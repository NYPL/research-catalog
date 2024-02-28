import Head from "next/head"
import { Button, Heading, Text } from "@nypl/design-system-react-components"
import Layout from "../../src/components/Layout/Layout"
import initializePatronTokenAuth, {
  getLoginRedirect,
} from "../../src/server/auth"
import { MyAccountFactory } from "../../src/models/MyAccount"
import type { Checkout, Hold, Patron, Fine } from "../../src/types/accountTypes"
import ProfileHeader from "../../src/components/MyAccount/ProfileHeader"

interface MyAccountPropsType {
  checkouts?: Checkout[]
  holds?: Hold[]
  patron?: Patron
  fines?: Fine
  isAuthenticated: boolean
}

export default function MyAccount({
  checkouts,
  holds,
  patron,
  fines,
  isAuthenticated,
}: MyAccountPropsType) {
  const errorRetrievingPatronData = !patron
  console.log(checkouts, holds, patron, fines)
  /** Testing renew checkout api route, displaying alerts of whatever the handler returns. */
  async function checkoutRenew(checkoutId, patronId) {
    try {
      const response = await fetch(
        `/research/research-catalog/api/account/checkouts/renewal/${checkoutId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(patronId),
        }
      )
      const responseData = await response.json()
      if (response.status == 200) {
        // New due date.
        alert(responseData.dueDate)
      } else {
        // Renewal failed.
        alert(responseData.message)
      }
    } catch (error) {
      // Request failed.
      alert("Fetching error")
    }
  }

  return (
    <>
      <Head>
        <title>My Account</title>
      </Head>
      <Layout isAuthenticated={isAuthenticated} activePage="account">
        {errorRetrievingPatronData ? (
          <Text>
            We are unable to display your account information at this time.
            Please contact gethelp@nypl.org for assistance.
          </Text>
        ) : (
          <ProfileHeader patron={patron} />
        )}
        {/** Testing renew checkout api route, with test checkout id. */}
        <Button
          id="checkout-test"
          onClick={() => checkoutRenew(58536261, patron.id)}
        >
          Renew checkout
        </Button>
      </Layout>
    </>
  )
}

export async function getServerSideProps({ req }) {
  const patronTokenResponse = await initializePatronTokenAuth(req.cookies)
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
        isAuthenticated,
      },
    }
  }
}
