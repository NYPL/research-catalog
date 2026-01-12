import Document, { Html, Head, Main, NextScript } from "next/document"
import type { DocumentContext, DocumentInitialProps } from "next/document"
import { appConfig } from "../src/config/config"
import QABanner from "../src/components/QABanner/QABanner"

interface MyDocumentProps extends DocumentInitialProps {
  externalTemplates: any
}

class MyDocument extends Document<MyDocumentProps> {
  static async getInitialProps(ctx: DocumentContext): Promise<MyDocumentProps> {
    const EXTERNAL_TEMPLATES_URL =
      "https://nypl-demo.bibliocommons.com/widgets/external_templates.json"
    const initialProps = await Document.getInitialProps(ctx)
    const response = await fetch(EXTERNAL_TEMPLATES_URL, {
      // Revalidate every 5 minutes
      next: { revalidate: 300 },
    })
    const externalTemplates = await response.json()

    return {
      ...initialProps,
      externalTemplates,
    }
  }

  render() {
    const { css, js, header, footer } = this.props.externalTemplates

    return (
      <Html lang="en">
        <Head>
          <meta name="description" content="Research Catalog | NYPL" />
          {css && <div dangerouslySetInnerHTML={{ __html: css }} />}
          {js && (
            <div
              dangerouslySetInnerHTML={{
                __html: `<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script><script src="https://s3.amazonaws.com/builds.handlebarsjs.com/handlebars.min-v4.7.8.js"></script>${js}`,
              }}
            />
          )}
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

          {header && <div dangerouslySetInnerHTML={{ __html: header }} />}

          {/* NYPL Header container */}
          {/* <div id="Header-Placeholder" className="no-print">
            <div id="nypl-header"></div>
          </div> */}

          <Main />
          <NextScript />

          {/* NYPL Footer container */}
          {/* <div id="nypl-footer" className="no-print"></div> */}

          {footer && <div dangerouslySetInnerHTML={{ __html: footer }} />}
        </body>
      </Html>
    )
  }
}

export default MyDocument
