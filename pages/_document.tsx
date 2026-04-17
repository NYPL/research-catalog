import Document, { Html, Head, Main, NextScript } from "next/document"
import type { DocumentInitialProps, DocumentContext } from "next/document"
import { appConfig } from "../src/config/appConfig"
import QABanner from "../src/components/QABanner/QABanner"
import Script from "next/script"
import newrelic from "newrelic"

interface MyDocumentProps extends DocumentInitialProps {
  browserTimingHeader: string
}

class MyDocument extends Document<MyDocumentProps> {
  static async getInitialProps(ctx: DocumentContext): Promise<MyDocumentProps> {
    const browserTimingHeader = newrelic.getBrowserTimingHeader({
      hasToRemoveScriptWrapper: true,
    })

    const initialProps = await Document.getInitialProps(ctx)
    return {
      ...initialProps,
      browserTimingHeader,
    }
  }

  render() {
    return (
      <Html lang="en">
        <style>
          {`
          #Header-Placeholder {
          min-height: 62px;
        }
        @media screen and (min-width: 832px) {
          #Header-Placeholder {
            min-height: 114px;
          }
        }
      `}
        </style>
        <Head>
          {/* New Relic SPA browser agent */}
          <Script
            id="new-relic-browser-agent"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: this.props.browserTimingHeader,
            }}
          />
          <meta name="description" content="Research Catalog | NYPL" />
        </Head>
        <body>
          {/* QA only banner */}
          {appConfig.environment === "qa" && <QABanner />}
          {/* Google tag manager: <noscript> */}
          <noscript>
            <iframe
              src={"https://www.googletagmanager.com/ns.html?id=GTM-RKWC"}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>

          {/* NYPL Header container */}
          <div id="Header-Placeholder" className="no-print">
            <div id="nypl-header"></div>
          </div>

          <Main />
          <NextScript />

          {/* NYPL Footer container */}
          <div id="nypl-footer" className="no-print"></div>
        </body>
      </Html>
    )
  }
}

export default MyDocument
