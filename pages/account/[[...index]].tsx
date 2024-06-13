import { Text } from "@nypl/design-system-react-components"
import Head from "next/head"

import Layout from "../../src/components/Layout/Layout"
import initializePatronTokenAuth, {
  getLoginRedirect,
  buildNewAuthRedirectCookie,
  stuckInRedirectLoop,
} from "../../src/server/auth"
import { MyAccountFactory } from "../../src/models/MyAccount"
import ProfileTabs from "../../src/components/MyAccount/ProfileTabs"
import ProfileHeader from "../../src/components/MyAccount/ProfileHeader"
import FeesBanner from "../../src/components/MyAccount/FeesBanner"
import sierraClient from "../../src/server/sierraClient"
import type {
  Patron,
  Hold,
  Checkout,
  Fine,
  SierraCodeName,
} from "../../src/types/myAccountTypes"
interface MyAccountPropsType {
  patron?: Patron
  checkouts?: Checkout[]
  holds?: Hold[]
  fines?: Fine
  isAuthenticated: boolean
  tabsPath?: string
  pickupLocations: SierraCodeName[]
  redirectLoop: boolean
}

export default function MyAccount({
  redirectLoop,
  pickupLocations,
  checkouts,
  holds,
  patron,
  fines,
  isAuthenticated,
  tabsPath,
}: MyAccountPropsType) {
  const errorRetrievingPatronData = !patron
  if (redirectLoop)
    return (
      <>
        <Head>
          <title>My Account</title>
        </Head>

        <Layout isAuthenticated={isAuthenticated} activePage="account">
          {redirectLoop ? (
            <Text>
              We are unable to display your account information at this time due
              an error with our authentication server. Please contact
              gethelp@nypl.org for assistance.
            </Text>
          ) : errorRetrievingPatronData ? (
            <Text>
              We are unable to display your account information at this time.
              Please contact gethelp@nypl.org for assistance.
            </Text>
          ) : (
            <>
              {fines?.total > 0 && <FeesBanner />}
              <ProfileHeader patron={patron} />
              <ProfileTabs
                pickupLocations={pickupLocations}
                patron={patron}
                checkouts={checkouts}
                holds={holds}
                fines={fines}
                activePath={tabsPath}
              />
            </>
          )}
        </Layout>
      </>
    )
}

export async function getServerSideProps({ req, res }) {
  const patronTokenResponse = await initializePatronTokenAuth(req.cookies)
  const isAuthenticated = patronTokenResponse.isTokenValid
  const redirectTrackerCookie = req.cookies["nyplAccountRedirectTracker"]
  const threeRedirectsHaveHappened = stuckInRedirectLoop(redirectTrackerCookie)
  const newCookie = buildNewAuthRedirectCookie(redirectTrackerCookie)
  res.setHeader("Set-Cookie", "username=lee; Path=/; HttpOnly")
  if (!isAuthenticated && !threeRedirectsHaveHappened) {
    // if we're in the loop, return some flag
    // else return redirect response with redirectcookie updated with new :
    const redirect = getLoginRedirect(req)
    return {
      redirect: {
        destination: redirect,
        permanent: false,
      },
    }
  }
  // Parsing path from url to pass to ProfileTabs.
  const tabsPathRegex = /\/account\/(.+)/
  const match = req.url.match(tabsPathRegex)
  const tabsPath = match ? match[1] : null
  const id = patronTokenResponse.decodedPatron.sub
  try {
    const client = await sierraClient()
    const { checkouts, holds, patron, fines, pickupLocations } =
      await MyAccountFactory(id, client)
    /*  Redirecting invalid paths (including /overdues if user has none) and
    // cleaning extra parts off valid paths. */
    if (tabsPath) {
      const allowedPaths = ["items", "requests", "overdues", "settings"]
      if (
        !allowedPaths.some((path) => tabsPath.startsWith(path)) ||
        (tabsPath === "overdues" && fines?.total === 0)
      ) {
        return {
          redirect: {
            destination: "/account",
            permanent: false,
          },
        }
      } else {
        const matchedPath = allowedPaths.find((path) =>
          tabsPath.startsWith(path)
        )
        if (tabsPath != matchedPath) {
          return {
            redirect: {
              destination: "/account/" + matchedPath,
              permanent: false,
            },
          }
        }
      }
    }
    return {
      props: {
        checkouts,
        holds,
        patron,
        fines,
        tabsPath,
        isAuthenticated,
        pickupLocations,
        redirectLoop: threeRedirectsHaveHappened,
      },
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
