import Document, { Html, Head, Main, NextScript } from "next/document"
import type { DocumentContext, DocumentInitialProps } from "next/document"
import { appConfig } from "../src/config/appConfig"
import QABanner from "../src/components/QABanner/QABanner"
import newrelic from "newrelic"
import Script from "next/script"

type DocumentProps = {
  browserTimingHeader: string
}
class MyDocument extends Document<DocumentProps> {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps & DocumentProps> {
    const initialProps = await Document.getInitialProps(ctx)

    const browserTimingHeader = newrelic.getBrowserTimingHeader({
      hasToRemoveScriptWrapper: true,
      allowTransactionlessInjection: true,
    })

    return {
      ...initialProps,
      browserTimingHeader,
    }
  }

  render() {
    const { browserTimingHeader } = this.props
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
          <meta name="description" content="Research Catalog | NYPL" />
          {/* New Relic browser agent */}
          <Script
            dangerouslySetInnerHTML={{ __html: browserTimingHeader }}
            id="nr-browser-agent"
            strategy="beforeInteractive"
          />
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
