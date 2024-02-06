import Head from "next/head"
import { Heading } from "@nypl/design-system-react-components"
import Layout from "../../src/components/Layout/Layout"
import initializePatronTokenAuth from "../../src/server/auth"
import sierraClient from "../../src/server/sierraClient"

export default function MyAccount({ props }) {
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
  // Every page that needs patron data must call initializePatronTokenAuth
  // to find if the token is valid and what the patron id is.
  const patronTokenResponse = await initializePatronTokenAuth(req)
  // // Now it can be used to get patron data from Sierra or Platform API
  // // or use `isTokenValid` to redirect to login page if it's not valid.
  console.log("patronTokenResponse is", patronTokenResponse)
  //if (patronTokenResponse.isTokenValid) {
  // const wrapper = await sierraClient()
  // const id = patronTokenResponse.decodedPatron.sub
  // console.log(id)
  // // const checkoutData = await wrapper.get(
  // //   `/patrons/${id}/checkouts?fields=barcode,dueDate,callNumber`
  // // )
  // const holdsData = await wrapper.get(`/patrons/${id}`)
  // //?fields=barcode,pickUpByDate,callNumber,canFreeze,pickUpLocation,status
  // // pickupLocations: [cached pickup locations],
  // // const patronData: await wrapper.get(
  // //   `/patrons/${id}/checkouts?fields={name, barcode, expiration date, emails, phoneNumbers, notificationPreference, homeLibrary, patronId},
  // // fines: {total, itemized: []}
  //console.log(holdsData)
  // return props object
  //}
  return {
    props: {},
  }
}
