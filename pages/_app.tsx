import Head from "next/head"
import { useEffect } from "react"
import { useRouter } from "next/router"
import Script from "next/script"
import "@nypl/design-system-react-components/dist/styles.css"

import { trackVirtualPageView } from "../src/utils/appUtils"
import { appConfig } from "../src/config/config"
import { BASE_URL, SITE_NAME } from "../src/config/constants"

import { FeedbackProvider } from "../src/context/FeedbackContext"

// eslint-disable-next-line @typescript-eslint/naming-convention
function App({ Component, pageProps }) {
  const router = useRouter()

  // TODO: The code below is a verbose solution for page view tracking
  // in Adobe Analytics that guarantees that page views will only be sent
  // on the first app render or on Next route changes.
  // We should determine if the simple useEffect solution is reliable enough for
  // page view tracking.

  // // Prevents double-firing of useEffect on initial page load
  // const initialized = useRef(false)

  // // Track initial page view to Adobe Analytics
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
      <Script
        async
        src={appConfig.apiEndpoints.adobeEmbedUrl[appConfig.environment]}
      />
      <Script id="adobeDataLayerDefinition">
        {`
              // First define the global variable for the entire data layer array
              window.adobeDataLayer = window.adobeDataLayer || [];
              // Then push in the variables required in the Initial Data Layer Definition
              window.adobeDataLayer.push({
                disable_page_view: true
              });
           `}
      </Script>
      {/* NYPL Header script */}
      <Script
        src={`${
          appConfig.apiEndpoints.nyplHeaderUrl[appConfig.environment]
        }/header.min.js?containerId=nypl-header`}
      />
      {/* NYPL Footer script */}
      <Script
        src={`${
          appConfig.apiEndpoints.nyplHeaderUrl[appConfig.environment]
        }/footer.min.js?containerId=nypl-footer`}
      />

      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <link
          rel="icon"
          type="image/png"
          href="https://ux-static.nypl.org/images/favicon.ico"
        />

        <meta property="og:title" content={SITE_NAME} key="og-title" />
        <meta property="og:site_name" content={SITE_NAME} key="og-site-name" />
        <meta property="og:url" content={`https://www.nypl.org${BASE_URL}`} />
        <meta property="og:description" content="" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="" />
        <meta name="twitter:title" content={SITE_NAME} key="tw-title" />
        <meta name="twitter:description" content="" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@nypl" />
        <meta name="twitter:creator" content="@nypl" />
        <meta name="twitter:image" content="" />

        <title key="main-title">{SITE_NAME}</title>
      </Head>
      <FeedbackProvider value={null}>
        <Component {...pageProps} />
      </FeedbackProvider>
    </>
  )
}
export default App
