import { Text } from "@nypl/design-system-react-components"
import Layout from "../../src/components/Layout/Layout"
import initializePatronTokenAuth, {
  doRedirectBasedOnNyplAccountRedirects,
  getLoginRedirect,
} from "../../src/server/auth"
import ProfileContainer from "../../src/components/MyAccount/ProfileContainer"
import type { MyAccountPatronData } from "../../src/types/myAccountTypes"
import { PatronDataProvider } from "../../src/context/PatronDataContext"
import { getPatronData } from "../api/account/[id]"
import RCHead from "../../src/components/Head/RCHead"
import TimedLogoutModal from "../../src/components/MyAccount/TimedLogoutModal"

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

  try {
    return (
      <>
        <RCHead metadataTitle={"My Account"} />
        <Layout isAuthenticated={isAuthenticated} activePage="account">
          <TimedLogoutModal />
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

  // Parsing path from URL
  const tabsPathRegex = /\/account\/(.+)/
  const match = req.url.match(tabsPathRegex)
  const tabsPath = match ? match[1] : null
  const id = patronTokenResponse.decodedPatron.sub

  try {
    const { checkouts, holds, patron, fines, pickupLocations } =
      await getPatronData(id)
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
