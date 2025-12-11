import BibPage from "./index"
import { fetchBib } from "../../../src/server/api/bib"
import initializePatronTokenAuth from "../../../src/server/auth"

export default BibPage

export async function getServerSideProps({ params, query, req }) {
  const { id } = params
  const patronTokenResponse = await initializePatronTokenAuth(req.cookies)
  const isAuthenticated = patronTokenResponse.isTokenValid
  const results = await fetchBib(id, { ...query, all_items: true })
  if (results.status === 307)
    return {
      redirect: {
        destination: results.redirectUrl,
        permanent: false,
      },
    }
  else if (results.status !== 200) {
    return {
      props: {
        errorStatus: results.status,
      },
    }
  }

  return {
    props: {
      discoveryBibResult: (results as any).discoveryBibResult,
      annotatedMarc: (results as any).annotatedMarc,
      isAuthenticated,
      viewAllItems: true,
    },
  }
}
