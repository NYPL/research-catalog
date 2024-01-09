import Head from "next/head"
import { useEffect } from "react"
import { useRouter } from "next/router"
import "@nypl/design-system-react-components/dist/styles.css"
import { trackVirtualPageView, extractQueryString } from "../src/utils/appUtils"

// eslint-disable-next-line @typescript-eslint/naming-convention
function App({ Component, pageProps }) {
  const router = useRouter()

  // Track analytics on initial page view
  useEffect(() => {
    const queryString = extractQueryString(router.asPath)
    trackVirtualPageView(router.pathname, queryString)
  }, [router])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default App
