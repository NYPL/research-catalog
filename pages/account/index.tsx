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
  // const patronTokenResponse = await initializePatronTokenAuth(req)
  // console.log("patronTokenResponse is", patronTokenResponse)
  // const isAuthenticated = true
  // if (!isAuthenticated) {
  //   console.log("no", patronTokenResponse)
  //   // return {
  //   //   redirect: {
  //   //     destination: "https://ilsstaff.nypl.org/iii/cas/login",
  //   //     permanent: false,
  //   //   },
  //   // }
  // }

  // // if (patronTokenResponse.isTokenValid) {
  const wrapper = await sierraClient()
  const id = "2772226"
  //"9130737"
  //patronTokenResponse.decodedPatron.sub
  console.log(id)
  const checkoutData = await wrapper.get(
    `/patrons/${id}/checkouts?fields=barcode,dueDate,callNumber`
  )

  const holdsData = await wrapper.get(`/patrons/${id}/holds`)
  //?fields=barcode,pickUpByDate,callNumber,canFreeze,pickUpLocation,status

  const patronData = await wrapper.get(
    `/patrons/${id}?fields=names,barcodes,expirationDate,homeLibrary,emails,phones`
  )

  //fines: {total, itemized: []}

  const finesData = await wrapper.get(`/patrons/${id}/fines`)
  console.log(checkoutData, holdsData, patronData, finesData)

  //const accountData = {}
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

  return {
    props: {},
  }
}
