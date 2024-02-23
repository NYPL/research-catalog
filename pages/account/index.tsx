import Head from "next/head"
import { Button, Heading } from "@nypl/design-system-react-components"
import Layout from "../../src/components/Layout/Layout"
import initializePatronTokenAuth, {
  getLoginRedirect,
} from "../../src/server/auth"
import MyAccountModel from "../../src/models/MyAccount"
import type { Checkout, Hold, Patron, Fine } from "../../src/types/accountTypes"

interface MyAccountProps {
  checkouts: Checkout[]
  holds: Hold[]
  patron: Patron
  fines: Fine
}

export default function MyAccount({
  checkouts,
  holds,
  patron,
  fines,
}: MyAccountProps) {
  console.log(patron)
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
      if (responseData.status == 200) {
        // New due date.
        alert(responseData.body)
      } else {
        // Renewal failed.
        alert(responseData.message)
      }
    } catch (error) {
      // Request failed.
      alert("Fetching error")
    }
  }

  /** Testing settings api route */
  async function settingsUpdate(patronId) {
    try {
      const response = await fetch(
        `/research/research-catalog/api/account/settings/${patronId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ emails: ["goodbye"] }),
        }
      )
      const responseData = await response.json()
      if (response.ok) {
        alert(responseData)
      } else {
        alert(`error: ${responseData}`)
      }
    } catch (error) {
      alert("fetching error")
    }
  }

  /** Testing pin update api route */
  async function pinUpdate(patronId, patronBarcode, oldPin, newPin) {
    try {
      const response = await fetch(
        `/research/research-catalog/api/account/update-pin/${patronId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            old: oldPin,
            new: newPin,
            barcode: patronBarcode,
          }),
        }
      )
      const responseData = await response.json()
      if (response.ok) {
        alert(responseData)
      } else {
        console.log("problem")
        alert(`error: ${responseData}`)
      }
    } catch (error) {
      alert("fetching error")
    }
  }

  return (
    <>
      <Head>
        <title>My Account</title>
      </Head>
      <Layout activePage="account">
        <Heading level="h1">my account</Heading>
        {/** Testing renew checkout api route, with test checkout id. */}
        <Button
          id="checkout-test"
          onClick={() => checkoutRenew(58536266, patron.id)}
        >
          Renew checkout
        </Button>
        {/** Testing settings api route */}
        <Button id="settings-test" onClick={() => settingsUpdate(patron.id)}>
          Update settings
        </Button>
        {/** Testing pin update api route */}
        <Button
          id="pin-update"
          onClick={() => pinUpdate(patron.id, "23333094983077", "7890", "7890")}
        >
          Update pin
        </Button>
      </Layout>
    </>
  )
}

export async function getServerSideProps({ req }) {
  const patronTokenResponse = await initializePatronTokenAuth(req.cookies)
  console.log("patronTokenResponse is", patronTokenResponse)
  if (!patronTokenResponse.isTokenValid) {
    const redirect = getLoginRedirect(req)
    return {
      redirect: {
        destination: redirect,
        permanent: false,
      },
    }
  }
  const id = patronTokenResponse.decodedPatron.sub
  const { checkouts, holds, patron, fines } =
    await MyAccountModel.MyAccountFactory(id)

  return {
    props: { checkouts, holds, patron, fines },
  }
}
