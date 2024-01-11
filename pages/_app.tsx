import Head from "next/head"
import { useEffect } from "react"
import { useRouter } from "next/router"
import "@nypl/design-system-react-components/dist/styles.css"
import { trackVirtualPageView } from "../src/utils/appUtils"

// eslint-disable-next-line @typescript-eslint/naming-convention
function App({ Component, pageProps }) {
  const router = useRouter()
  // Prevents double-firing of useEffect on initial page load
  // const initialized = useRef(false)

  // Track initial page view to Adobe Analytics
  // useEffect(() => {
  //   if (!initialized.current) {
  //     initialized.current = true
  //     trackVirtualPageView(router.asPath)
  //   }
  // }, [router.asPath])
  //
  // // Track subsequent page views to Adobe Analytics
  // useEffect(() => {
  //   const handleRouteChange = (url: string) => {
  //     trackVirtualPageView(url)
  //   }
  //   // When the component is mounted, subscribe to router changes
  //   // and track those page views
  //   router.events.on("routeChangeComplete", handleRouteChange)
  //
  //   // If the component is unmounted, unsubscribe
  //   // from the event with the "off" method
  //   return () => {
  //     router.events.off("routeChangeComplete", handleRouteChange)
  //   }
  // }, [router.events])

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
