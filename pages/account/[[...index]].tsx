import Head from "next/head"
import { Button, Text } from "@nypl/design-system-react-components"
import Layout from "../../src/components/Layout/Layout"
import initializePatronTokenAuth, {
  getLoginRedirect,
} from "../../src/server/auth"
import { MyAccountFactory } from "../../src/models/MyAccount"
import type { Checkout, Hold, Patron, Fine } from "../../src/types/accountTypes"
import ProfileTabs from "../../src/components/MyAccount/ProfileTabs"
import ProfileHeader from "../../src/components/MyAccount/ProfileHeader"
import { BASE_URL } from "../../src/config/constants"

interface MyAccountPropsType {
  checkouts?: Checkout[]
  holds?: Hold[]
  patron?: Patron
  fines?: Fine
  isAuthenticated: boolean
  tabsPath?: string
}

export default function MyAccount({
  checkouts,
  holds,
  patron,
  fines,
  isAuthenticated,
  tabsPath,
}: MyAccountPropsType) {
  const errorRetrievingPatronData = !patron
  console.log(checkouts, holds, patron, fines, tabsPath)

  /** Testing settings api route */
  async function settingsUpdate(patronId) {
    try {
      const response = await fetch(
        `${BASE_URL}/api/account/settings/${patronId}`,
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
        `${BASE_URL}/api/account/update-pin/${patronId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            oldPin,
            newPin,
            barcode: patronBarcode,
          }),
        }
      )
      const responseData = await response.json()
      if (response.ok) {
        alert(responseData)
      } else {
        alert(`error: ${responseData}`)
      }
    } catch (error) {
      console.log(error)
      alert("fetching error")
    }
  }

  /** Testing hold update api route */
  async function holdUpdate(patronId, holdId, freeze, pickupLocation) {
    try {
      const response = await fetch(
        `/research/research-catalog/api/account/holds/update/${holdId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            patronId,
            freeze,
            pickupLocation,
          }),
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

  /** Testing hold cancel api route */
  async function holdCancel(patronId, holdId) {
    try {
      const response = await fetch(
        `/research/research-catalog/api/account/holds/cancel/${holdId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ patronId }),
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
          <>
            <ProfileHeader patron={patron} />
            <ProfileTabs
              patron={patron}
              checkouts={checkouts}
              holds={holds}
              fines={fines}
              activePath={tabsPath}
            />
            {/** Testing settings api route */}
            {/* <Button
              id="settings-test"
              onClick={() => settingsUpdate(patron.id)}
            >
              Update settings
            </Button> */}
            {/** Testing pin update api route */}
            {/* <Button
              id="pin-update"
              onClick={() =>
                pinUpdate(patron.id, patron.barcode, "7890", "7890")
              }
            >
              Update pin
            </Button> */}
            {/** Testing hold update api route */}
            {/* <Button
              id="hold-update"
              onClick={() => holdUpdate(patron.id, "42273325", false, "")}
            >
              Update hold request
            </Button> */}
            {/** Testing hold cancelapi route */}
            {/* <Button
              id="hold-cancel"
              onClick={() => holdCancel(patron.id, "42273326")}
            >
              Cancel hold request
            </Button> */}
          </>
        )}
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
  // Parsing path from url to pass to ProfileTabs.
  const tabsPath = req.url.split("/", -1)[2] || null
  const id = patronTokenResponse.decodedPatron.sub
  try {
    const { checkouts, holds, patron, fines } = await MyAccountFactory(id)
    // Redirecting /fines if user has none.
    if (tabsPath === "overdues" && fines.total === 0) {
      return {
        redirect: {
          destination: "/account",
          permanent: false,
        },
      }
    }
    return {
      props: { checkouts, holds, patron, fines, tabsPath, isAuthenticated },
    }
  } catch (e) {
    console.log(e.message)
    return {
      props: {
        tabsPath,
        isAuthenticated,
      },
    }
  }
}
