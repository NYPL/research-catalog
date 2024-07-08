import { Text } from "@nypl/design-system-react-components"
import Head from "next/head"

import Layout from "../../src/components/Layout/Layout"
import initializePatronTokenAuth, {
  doRedirectBasedOnNyplAccountRedirects,
  getLoginRedirect,
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
import TimedLogoutModal from "../../src/components/MyAccount/TimedLogoutModal"
import { buildTimeLeft, incrementTime } from "../../src/utils/cookieUtils"
import { useEffect, useState } from "react"
interface MyAccountPropsType {
  patron?: Patron
  checkouts?: Checkout[]
  holds?: Hold[]
  fines?: Fine
  isAuthenticated: boolean
  tabsPath?: string
  pickupLocations: SierraCodeName[]
  redirectLoop?: boolean
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

  const [displayTimedLogoutModal, setDisplayTimedLogoutModal] = useState(false)
  const [expirationTime, setExpirationTime] = useState("")

  const resetCountdown = () => {
    const inFive = incrementTime(5)
    const newExpirationTime = `accountPageExp=${inFive}; expires=${inFive}`
    document.cookie = newExpirationTime
    setExpirationTime(inFive)
    setDisplayTimedLogoutModal(true)
  }

  useEffect(() => {
    resetCountdown()
  })

  return (
    <>
      <Head>
        <title>My Account</title>
      </Head>

      <Layout isAuthenticated={isAuthenticated} activePage="account">
        {displayTimedLogoutModal && (
          <TimedLogoutModal
            stayLoggedIn={resetCountdown}
            expirationTime={expirationTime}
          />
        )}
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
  const redirectTrackerCookie = req.cookies["nyplAccountRedirects"]
  const redirectCount = parseInt(redirectTrackerCookie, 10) || 0
  const redirectBasedOnNyplAccountRedirects =
    doRedirectBasedOnNyplAccountRedirects(redirectCount)
  // If we end up not authenticated 3 times after redirecting to the login url, don't redirect.
  if (redirectBasedOnNyplAccountRedirects && !isAuthenticated) {
    res.setHeader(
      "Set-Cookie",
      `nyplAccountRedirects=${redirectCount + 1}; Max-Age=10`
    )
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
        redirectLoop: !redirectBasedOnNyplAccountRedirects,
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
