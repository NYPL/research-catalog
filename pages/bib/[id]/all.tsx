import BibPage from "./index"
import { fetchBib } from "../../../src/server/api/bib"
import initializePatronTokenAuth from "../../../src/server/auth"

export default BibPage

export async function getServerSideProps({ params, query, req }) {
  const { id } = params
  const { discoveryBibResult, annotatedMarc, status, redirectUrl } =
    await fetchBib(id, { ...query, all_items: true })
  const patronTokenResponse = await initializePatronTokenAuth(req.cookies)
  const isAuthenticated = patronTokenResponse.isTokenValid

  switch (status) {
    case 307:
      return {
        redirect: {
          destination: redirectUrl,
          permanent: false,
        },
      }
    case 404:
      return {
        props: {
          notFound: true,
        },
      }
    default:
      return {
        props: {
          discoveryBibResult,
          annotatedMarc,
          isAuthenticated,
          viewAllItems: true,
        },
      }
  }
}
