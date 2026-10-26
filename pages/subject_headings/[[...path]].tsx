import type { GetServerSideProps } from "next"
import { getBrowseDestination } from "../../src/utils/redirectUtils"

// Handles legacy SHEP URLs not covered by the static redirects in
// next.config.js (filter/label query params and any unmatched path)
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const url = new URL(req.url, `https://${req.headers.host}`)

  return {
    redirect: {
      destination: getBrowseDestination(url),
      permanent: true,
    },
  }
}

// This page always redirects server-side
export default function SubjectHeadingsRedirect() {
  return null
}
