import { Text } from "@nypl/design-system-react-components"
import Head from "next/head"

import Layout from "../../src/components/Layout/Layout"
import initializePatronTokenAuth, {
  doRedirectBasedOnNyplAccountRedirects,
  getLoginRedirect,
} from "../../src/server/auth"
import ProfileContainer from "../../src/components/MyAccount/ProfileContainer"
import type { MyAccountPatronData } from "../../src/types/myAccountTypes"
import { PatronDataProvider } from "../../src/context/PatronDataContext"
import TimedLogoutModal from "../../src/components/MyAccount/TimedLogoutModal"
import { getIncrementedTime } from "../../src/utils/cookieUtils"
import { useEffect, useState } from "react"
import { getPatronData } from "../api/account/[id]"
interface MyAccountPropsType {
  accountData: MyAccountPatronData
  isAuthenticated: boolean
  tabsPath?: string
  renderAuthServerError?: boolean
}

export default function MyAccount({
  renderAuthServerError,
  accountData,
  isAuthenticated,
  tabsPath,
}: MyAccountPropsType) {
  const errorRetrievingPatronData = !accountData.patron

  const [expirationTime, setExpirationTime] = useState("")
  const [displayLogoutModal, setDisplayLogoutModal] = useState(false)

  const resetCountdown = () => {
    const inFive = getIncrementedTime(5)
    const newExpirationTime = `accountPageExp=${inFive}; expires=${inFive}`
    document.cookie = newExpirationTime
    setExpirationTime(inFive)
  }
  const serverError = (
    <Text>
      We are unable to display your account information at this time. Please
      contact gethelp@nypl.org for assistance.
    </Text>
  )
  const authError = (
    <Text>
      We are unable to display your account information at this time due an
      error with our authentication server. Please contact gethelp@nypl.org for
      assistance.
    </Text>
  )
  useEffect(() => {
    resetCountdown()
    // to avoid a reference error on document in the modal, wait to render it
    // until we are on the client side
    setDisplayLogoutModal(true)
  })
  try {
    return (
      <>
        <Head>
          <title>My Account</title>
        </Head>

        <Layout isAuthenticated={isAuthenticated} activePage="account">
          {displayLogoutModal && (
            <TimedLogoutModal
              stayLoggedIn={resetCountdown}
              expirationTime={expirationTime}
            />
          )}
          {renderAuthServerError ? (
            authError
          ) : errorRetrievingPatronData ? (
            serverError
          ) : (
            <PatronDataProvider value={{ ...accountData }}>
              <ProfileContainer tabsPath={tabsPath} />
            </PatronDataProvider>
          )}
        </Layout>
      </>
    )
  } catch (e) {
    return serverError
  }
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
      `nyplAccountRedirects=${
        redirectCount + 1
      }; Max-Age=10; path=/; domain=.nypl.org;`
    )
    const redirect = getLoginRedirect(req, "/account")
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
    const { checkouts, holds, patron, fines, pickupLocations } =
      await getPatronData(id)
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
        accountData: { checkouts, holds, patron, fines, pickupLocations },
        tabsPath,
        isAuthenticated,
        renderAuthServerError: !redirectBasedOnNyplAccountRedirects,
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
