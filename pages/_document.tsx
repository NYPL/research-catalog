import { Html, Head, Main, NextScript } from "next/document"
import { appConfig } from "../src/config/config"

export default function Document() {
  const isQA = appConfig.environment === "qa"

  return (
    <Html lang="en">
      <style>
        {`
            #Header-Placeholder {
              min-height: 62px;
            }
            @media screen and (min-width: 832px) {
              #Header-Placeholder {
                min-height: 130px;
              }
            }
            /* QA banner */
            #qa-banner {
              background: var(--nypl-colors-ui-link-primary-10);
              color: black;
              font-size: 14px;
              text-align: left;
              padding: 16px;
              border-left: 4px solid var(--nypl-colors-ui-link-primary);
              a { text-decoration: underline; }
            }
          `}
      </style>
      <Head>
        <meta name="description" content="Research Catalog | NYPL" />
      </Head>
      <body>
        {/* QA banner */}
        {isQA && (
          <div id="qa-banner">
            This is the QA version of the Research Catalog website, used for
            internal testing purposes. To request items, go to the live website{" "}
            <a href="https://www.nypl.org/research/research-catalog">here</a>.
          </div>
        )}

        {/* Google tag manager: <noscript> */}
        <noscript>
          <iframe
            src={"https://www.googletagmanager.com/ns.html?id=GTM-RKWC"}
            height={0}
            width={0}
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
