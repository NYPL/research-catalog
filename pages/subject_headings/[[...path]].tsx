import type { GetServerSideProps } from "next"
import { getBrowseDestination } from "../../src/utils/redirectUtils"

export const getServerSideProps: GetServerSideProps = async ({
  req,
  resolvedUrl,
}) => {
  const url = new URL(resolvedUrl, `https://${req.headers.host}`)

  return {
    redirect: {
      destination: getBrowseDestination(url),
      permanent: true,
    },
  }
}

// Handles redirects for SHEP urls, this page never renders
// Workaround to avoid using middleware, which triggers a separate Next bug with index.tsx
export default function SubjectHeadingsRedirect() {
  return null
}
