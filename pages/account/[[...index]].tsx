import { Text } from "@nypl/design-system-react-components"
import Head from "next/head"

import Layout from "../../src/components/Layout/Layout"
import initializePatronTokenAuth, {
  doRedirectBasedOnNyplAccountRedirects,
  getLoginRedirect,
} from "../../src/server/auth"
import { MyAccountFactory } from "../../src/models/MyAccount"
import ProfileContainer from "../../src/components/MyAccount/ProfileContainer"
import sierraClient from "../../src/server/sierraClient"
import type {
  MyAccountPatronData,
  SierraCodeName,
} from "../../src/types/myAccountTypes"
import { useContext } from "react"
import { PatronDataProvider } from "../../src/context/PatronDataContext"
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
  const errorRetrievingPatronData = !accountData?.patron
  return (
    <>
      <Head>
        <title>My Account</title>
      </Head>

      <Layout isAuthenticated={isAuthenticated} activePage="account">
        {renderAuthServerError ? (
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
          <PatronDataProvider value={{ ...accountData }}>
            <ProfileContainer tabsPath={tabsPath} />
          </PatronDataProvider>
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
        accountData: { checkouts, holds, patron, fines },
        tabsPath,
        isAuthenticated,
        pickupLocations,
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
