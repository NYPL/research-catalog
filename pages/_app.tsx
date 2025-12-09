import Head from "next/head"
import { useEffect } from "react"
import Script from "next/script"
import "@nypl/design-system-react-components/dist/styles.css"
import "../public/styles/globals.css"
import { appConfig } from "../src/config/config"
import { BASE_URL, SITE_NAME } from "../src/config/constants"
import { FeedbackProvider } from "../src/context/FeedbackContext"
import { FocusProvider } from "../src/context/FocusContext"

// eslint-disable-next-line @typescript-eslint/naming-convention
function App({ Component, pageProps }) {
  // Remove header and footer injections before print
  useEffect(() => {
    const handleBeforePrint = () => {
      const header = document.getElementById("nypl-header")
      const footer = document.getElementById("nypl-footer")

      if (header) header.style.display = "none"
      if (footer) footer.style.display = "none"
    }

    const handleAfterPrint = () => {
      const header = document.getElementById("nypl-header")
      const footer = document.getElementById("nypl-footer")

      if (header) header.style.display = ""
      if (footer) footer.style.display = ""
    }

    window.addEventListener("beforeprint", handleBeforePrint)
    window.addEventListener("afterprint", handleAfterPrint)

    return () => {
      window.removeEventListener("beforeprint", handleBeforePrint)
      window.removeEventListener("afterprint", handleAfterPrint)
    }
  }, [])

  return (
    <>
      {/* Google tag manager */}
      <Script
        id="ga4-gtm"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-RKWC');
          `,
        }}
      />
      {/*  NYPL Advocacy Snippet for Marketing Campaigns */}
      <Script
        src="https://assets.nypl.org/js/advocacy.js"
        strategy="afterInteractive"
      />
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
        <FocusProvider>
          <Component {...pageProps} />
        </FocusProvider>
      </FeedbackProvider>
    </>
  )
}
export default App
