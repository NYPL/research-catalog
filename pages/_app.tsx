import Head from "next/head"
import { Component, useEffect, type ReactNode } from "react"
import Script from "next/script"
import { useRouter } from "next/router"
import "@nypl/design-system-react-components/dist/styles.css"
import "../public/styles/globals.css"
import { appConfig } from "../src/config/appConfig"
import { BASE_URL, SITE_NAME } from "../src/config/constants"
import { FeedbackProvider } from "../src/context/FeedbackContext"
import { FocusProvider } from "../src/context/FocusContext"
import { BrowseProvider } from "../src/context/BrowseContext"

// Catches render errors and loads static error display
// before Next.js tries to load _error.js (which WAF may have also blocked)
class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "96px 24px",
            fontFamily: "system-ui, sans-serif",
            color: "#1b1b1b",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              width: "68px",
              height: "68px",
              borderRadius: "50%",
              background: "#00838A ",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              fontWeight: 700,
              color: "#FFF",
              marginBottom: "48px",
              flexShrink: 0,
            }}
          >
            !
          </div>
          <h2
            style={{ fontSize: "2rem", fontWeight: 600, marginBottom: "8px" }}
          >
            Something went wrong on our end
          </h2>
          <p
            style={{
              fontSize: "1rem",
              lineHeight: 1.5,
              maxWidth: "480px",
              margin: "0 auto 4px",
            }}
          >
            We encountered an error while trying to load the page.
          </p>
          <p
            style={{
              fontSize: "1rem",
              lineHeight: 1.5,
              maxWidth: "480px",
              margin: "0 auto",
            }}
          >
            Try{" "}
            <button
              onClick={() => window.location.reload()}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                textDecoration: "underline",
                textDecorationThickness: "1px",
                font: "inherit",
                padding: 0,
                color: "inherit",
              }}
            >
              reloading the page
            </button>{" "}
            or{" "}
            <a
              href="https://www.nypl.org/get-help/contact-us"
              style={{ color: "inherit" }}
            >
              contact us
            </a>{" "}
            if the error persists.
          </p>
        </div>
      )
    }
    return this.props.children
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
function App({ Component, pageProps }) {
  const router = useRouter()

  // If WAF returns 200+HTML for /_next/data requests = throw here
  useEffect(() => {
    const originalFetch = window.fetch
    window.fetch = async (...args) => {
      const response = await originalFetch(...args)
      const url =
        typeof args[0] === "string" ? args[0] : (args[0] as Request).url
      if (url?.includes("/_next/data/")) {
        const contentType = response.headers.get("content-type")
        if (
          response.ok &&
          !response.redirected &&
          contentType?.includes("text/html")
        ) {
          throw new Error("Non-JSON response for data route")
        }
      }
      return response
    }
    return () => {
      window.fetch = originalFetch
    }
  }, [])

  if (typeof window !== "undefined") {
    const current = sessionStorage.getItem("currentPath")

    if (current !== router.asPath) {
      const currentBasePath = current?.split(/[?#]/)[0]
      const newBasePath = router.asPath.split(/[?#]/)[0]

      if (currentBasePath !== newBasePath) {
        sessionStorage.setItem("previousPath", current || "")
      }

      sessionStorage.setItem("currentPath", router.asPath)
    }
  }

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
        strategy="afterInteractive"
      />
      {/* NYPL Footer script */}
      <Script
        src={`${
          appConfig.apiEndpoints.nyplHeaderUrl[appConfig.environment]
        }/footer.min.js?containerId=nypl-footer`}
        strategy="afterInteractive"
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
      <ErrorBoundary>
        <FeedbackProvider value={null}>
          <FocusProvider>
            <BrowseProvider>
              <Component {...pageProps} />
            </BrowseProvider>
          </FocusProvider>
        </FeedbackProvider>
      </ErrorBoundary>
    </>
  )
}
export default App
