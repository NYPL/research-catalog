import Head from "next/head"
import { Heading } from "@nypl/design-system-react-components"
import Layout from "../../src/components/Layout/Layout"
import initializePatronTokenAuth, {
  getLoginRedirect,
} from "../../src/server/auth"
import sierraClient from "../../src/server/sierraClient"

export default function MyAccount() {
  return (
    <>
      <Head>
        <title>My Account</title>
      </Head>
      <Layout activePage="account">
        <Heading level="h1">my account</Heading>
      </Layout>
    </>
  )
}

export async function getServerSideProps({ req }) {
  const patronTokenResponse = await initializePatronTokenAuth(req)
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

  return {
    props: {},
  }
}
