import { Html, Head, Main, NextScript } from "next/document"
import { appConfig } from "../src/config/appConfig"
import QABanner from "../src/components/QABanner/QABanner"
import Script from "next/script"

export default function Document() {
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
            ;window.NREUM||(NREUM={});NREUM.init={distributed_tracing:{enabled:true},performance:{capture_measures:true},browser_consent_mode:{enabled:false},privacy:{cookies_enabled:true},ajax:{deny_list:["gov-bam.nr-data.net"],capture_payloads:'none'}};
            ;NREUM.loader_config={accountID:"121334",trustKey:"121334",agentID:"1589215804",licenseKey:"NRBR-652886ebb1f9416c1bb",applicationID:"1589215804"};
            ;NREUM.info={beacon:"gov-bam.nr-data.net",errorBeacon:"gov-bam.nr-data.net",licenseKey:"NRBR-652886ebb1f9416c1bb",applicationID:"1589215804",sa:1};`,
          }}
        />
        <Script
          src="https://js-agent.newrelic.com/nr-loader-spa-current.min.js"
          strategy="beforeInteractive"
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
