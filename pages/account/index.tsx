import Head from "next/head"
import { Heading } from "@nypl/design-system-react-components"
import Layout from "../../src/components/Layout/Layout"
import initializePatronTokenAuth, {
  getLoginRedirect,
} from "../../src/server/auth"
import { fetchAccount } from "../api/account"
import MyAccountModel from "../../src/models/MyAccount"

export default function MyAccount({ sierraAccountData, isAuthenticated }) {
  const { checkouts, holds, patron, fines } = new MyAccountModel(
    sierraAccountData
  )
  console.log(checkouts, holds, patron, fines)
  return (
    <>
      <Head>
        <title>My Account</title>
      </Head>
      <Layout isAuthenticated={isAuthenticated} activePage="account">
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
  const id = patronTokenResponse.decodedPatron.sub
  const sierraAccountData = await fetchAccount(id)
  console.log("sierra Account Data", sierraAccountData)

  return {
    props: { sierraAccountData, isAuthenticated },
  }
}
