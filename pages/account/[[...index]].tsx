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
import { bootstrapConfig } from "../../lib/bootstrap"
import { generateListSlug } from "../../src/utils/listUtils"

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

export async function getServerSideProps({ req, res, query = {} }: any) {
  // Ensure config is loaded before initializing Sierra client.
  await bootstrapConfig()
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
  const index = query.index as string[] | undefined
  const tabsPath = index ? index.join("/") : null
  const id = patronTokenResponse.decodedPatron.sub

  try {
    const patronData = await getPatronData(id)
    const { checkouts, holds, patron, fines, pickupLocations, lists } =
      patronData

    // Redirecting invalid paths and cleaning extra parts off valid paths.
    if (tabsPath) {
      const allowedPaths = [
        "items",
        "requests",
        "overdues",
        "settings",
        "lists",
      ]
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
          if (!tabsPath.startsWith("lists/")) {
            return {
              redirect: {
                destination: "/account/" + matchedPath,
                permanent: false,
              },
            }
          } else {
            // Handle list URLs (match on the list ID)
            const listId = tabsPath.split("/")[1]
            const list = lists?.find((l: any) => l.id === listId)
            if (list) {
              // Get a human-readable slug from the list's name and construct the id + slug URL
              const slug = generateListSlug(list.listName)
              const canonicalPath = `lists/${listId}${slug ? `/${slug}` : ""}`
              if (tabsPath !== canonicalPath) {
                const queryParams = new URLSearchParams()
                for (const [key, value] of Object.entries(query)) {
                  if (key === "index") continue
                  if (Array.isArray(value))
                    value.forEach((v: string) => queryParams.append(key, v))
                  else if (value !== undefined)
                    queryParams.append(key, value as string)
                }
                const queryString = queryParams.toString()
                const formattedQueryString = queryString
                  ? `?${queryString}`
                  : ""
                return {
                  redirect: {
                    destination: `/account/${canonicalPath}${formattedQueryString}`,
                    permanent: false,
                  },
                }
              }
            } else {
              // If the requested list ID does not exist in the user's account, fallback to all lists
              return {
                redirect: {
                  destination: "/account/lists",
                  permanent: false,
                },
              }
            }
          }
        }
      }
    }

    return {
      props: {
        accountData: {
          checkouts,
          holds,
          patron,
          fines,
          pickupLocations,
          lists,
        },
        tabsPath: tabsPath ? tabsPath.split("/")[0] : null,
        isAuthenticated,
        renderAuthServerError: !redirectBasedOnNyplAccountRedirects,
      },
    }
  } catch (e) {
    console.log(e.message)
    return {
      props: {
        tabsPath: tabsPath ? tabsPath.split("/")[0] : null,
        isAuthenticated,
      },
    }
  }
}
