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
import FormValidationMessage from "../../src/components/MyAccount/NewSettings/NoJsFormValidationMessage"
interface MyAccountPropsType {
  accountData: MyAccountPatronData
  isAuthenticated: boolean
  tabsPath?: string
  renderAuthServerError?: boolean
  storedQueryString?
}

export default function MyAccount({
  renderAuthServerError,
  accountData,
  isAuthenticated,
  tabsPath,
  storedQueryString,
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
              {storedQueryString && (
                <FormValidationMessage storedQueryString={storedQueryString} />
              )}
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

  // Parsing path and query from URL
  const tabsPathRegex = /\/account\/(.+)/
  const match = req.url.match(tabsPathRegex)
  const queryString = req.url.split("?")[1] || null
  const tabsPath = match ? match[1] : null
  const id = patronTokenResponse.decodedPatron.sub

  try {
    const { checkouts, holds, patron, fines, pickupLocations } =
      await getPatronData(id)
    // Collect query string from non-JS form submission.
    if (queryString) {
      res.setHeader(
        "Set-Cookie",
        `queryParams=${encodeURIComponent(queryString)}; Path=/; HttpOnly`
      )
    }
    // Redirecting invalid paths and cleaning extra parts off valid paths.
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

    // Saving the string and removing the cookie so it doesn't persist on reload.
    const storedQueryString = req.cookies.queryParams || ""
    res.setHeader("Set-Cookie", "queryParams=; Path=/; HttpOnly; Max-Age=0")
    return {
      props: {
        accountData: { checkouts, holds, patron, fines, pickupLocations },
        tabsPath,
        isAuthenticated,
        storedQueryString,
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
