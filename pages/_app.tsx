import Head from "next/head"
import { useEffect } from "react"
import { useRouter } from "next/router"
import "@nypl/design-system-react-components/dist/styles.css"
import { trackVirtualPageView } from "../src/utils/appUtils"

// eslint-disable-next-line @typescript-eslint/naming-convention
function App({ Component, pageProps }) {
  const router = useRouter()

  // Track page view events to Adobe Analytics
  useEffect(() => {
    trackVirtualPageView(router.asPath)
  })

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
