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
import FeesBanner from "../../src/components/MyAccount/FeesBanner"
import sierraClient from "../../src/server/sierraClient"
import type {
  Patron,
  Hold,
  Checkout,
  Fine,
} from "../../src/types/myAccountTypes"

interface MyAccountPropsType {
  patron?: Patron
  checkouts?: Checkout[]
  holds?: Hold[]
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
    const client = sierraClient()
    const { checkouts, holds, patron, fines } = await MyAccountFactory(
      id,
      client
    )
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
