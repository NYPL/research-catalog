import { Text } from "@nypl/design-system-react-components"
import Head from "next/head"

import Layout from "../../src/components/Layout/Layout"
import initializePatronTokenAuth, {
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
} from "../../src/types/myAccountTypes"
import { BASE_URL } from "../../src/config/constants"
import { useEffect, useState } from "react"
import { incrementTime } from "../../src/utils/myAccountUtils"

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
  const [stuckInAuthRedirectLoop, setStuckInAuthRedirectLoop] = useState(false)
  // Detect a redirect loop and display error if we can't solve it any other way
  const trackRedirects = () => {
    const nyplAccountRedirectTracker = document.cookie
      .split(";")
      .find((cookie) => cookie.includes("nyplAccountRedirectTracker"))
    if (nyplAccountRedirectTracker) {
      const currentValue = nyplAccountRedirectTracker.split("=")[1].split("exp")
      const currentCount = parseInt(currentValue[0], 10)
      if (currentCount > 3) {
        fetch(
          `${BASE_URL}/api/accountError?type=redirect_loop&page=${encodeURI(
            window.location.href
          )}`
        )
        return true
      }
      const currentExp = currentValue[1]
      document.cookie = `nyplAccountRedirectTracker=${
        currentCount + 1
      }exp${currentExp}; expires=${currentExp}`
    } else {
      const expirationTime = incrementTime(0, 10)
      document.cookie = `nyplAccountRedirectTracker=1exp${expirationTime}; expires=${expirationTime}`
    }
    return false
  }

  useEffect(() => {
    const isInRedirectLoop = trackRedirects()
    setStuckInAuthRedirectLoop(isInRedirectLoop)
  }, [])

  return (
    <>
      <Head>
        <title>My Account</title>
      </Head>

      <Layout isAuthenticated={isAuthenticated} activePage="account">
        {stuckInAuthRedirectLoop ? (
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
            {fines.total > 0 && <FeesBanner />}
            <ProfileHeader patron={patron} />
            <ProfileTabs
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
  const tabsPathRegex = /\/account\/(.+)/
  const match = req.url.match(tabsPathRegex)
  const tabsPath = match ? match[1] : null
  const id = patronTokenResponse.decodedPatron.sub
  try {
    const client = await sierraClient()
    const { checkouts, holds, patron, fines } = await MyAccountFactory(
      id,
      client
    )
    /*  Redirecting invalid paths (including /overdues if user has none) and
    // cleaning extra parts off valid paths. */
    if (tabsPath) {
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
