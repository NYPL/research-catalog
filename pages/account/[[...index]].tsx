import Head from "next/head"
import { Text } from "@nypl/design-system-react-components"
import Layout from "../../src/components/Layout/Layout"
import initializePatronTokenAuth, {
  getLoginRedirect,
} from "../../src/server/auth"
import { MyAccountFactory } from "../../src/models/MyAccount"
import type MyAccountModel from "../../src/models/MyAccount"
import ProfileTabs from "../../src/components/MyAccount/ProfileTabs"
import ProfileHeader from "../../src/components/MyAccount/ProfileHeader"
import { BASE_URL, PATHS } from "../../src/config/constants"
import FeesBanner from "../../src/components/MyAccount/FeesBanner"

interface MyAccountPropsType {
  patron?: MyAccountModel["patron"]
  checkouts?: MyAccountModel["checkouts"]
  holds?: MyAccountModel["holds"]
  fines?: MyAccountModel["fines"]
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
  async function holdUpdate(patronId, holdId, frozen, pickupLocation) {
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
            frozen,
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
            {fines.total > 0 && <FeesBanner />}
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
          </>
        )}
      </Layout>
    </>
  )
}

export async function getServerSideProps({ req }) {
  const patronTokenResponse = await initializePatronTokenAuth(req.cookies)
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
  const tabsPath = req.url.split("/").slice(2).join("/") || null
  const id = patronTokenResponse.decodedPatron.sub
  try {
    const { checkouts, holds, patron, fines } = await MyAccountFactory(id)

    // Immediately returning base path.
    if (!tabsPath) {
      return {
        props: { checkouts, holds, patron, fines, tabsPath, isAuthenticated },
      }
    }

    /*  Redirecting invalid paths (including /overdues if user has none) and
    // cleaning extra parts off valid paths. */
    const allowedPaths = ["items", "requests", "overdues", "settings"]
    if (
      !allowedPaths.some((path) => tabsPath.startsWith(path)) ||
      (tabsPath === "overdues" && fines.total === 0)
    ) {
      return {
        redirect: {
          destination: "/account",
          permanent: false,
        },
      }
    } else {
      const matchedPath = allowedPaths.find((path) => tabsPath.startsWith(path))
      if (tabsPath != matchedPath)
        return {
          redirect: {
            destination: "/account/" + matchedPath,
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
