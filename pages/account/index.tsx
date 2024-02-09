import Head from "next/head"
import { Heading } from "@nypl/design-system-react-components"
import Layout from "../../src/components/Layout/Layout"
import initializePatronTokenAuth, {
  getLoginRedirect,
} from "../../src/server/auth"
import MyAccountModel from "../../src/models/MyAccount"

export default function MyAccount({ checkouts, holds, patron, fines }) {
  console.log(checkouts, holds, patron, fines)
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
  if (!patronTokenResponse.isTokenValid) {
    const redirect = getLoginRedirect(req)
    return {
      redirect: {
        destination: redirect,
        permanent: false,
      },
    }
  }
  const id = patronTokenResponse.decodedPatron.sub
  const { checkouts, holds, patron, fines } = await MyAccountModel.fetchAll(id)
  console.log("sierra Account Data", { checkouts, holds, patron, fines })

  return {
    props: { checkouts, holds, patron, fines },
  }
}
