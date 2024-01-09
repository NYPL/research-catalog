import { Html, Head, Main, NextScript } from "next/document"

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
            min-height: 130px;
          }
        }
      `}
      </style>
      <Head>
        <meta name="description" content="Research Catalog | NYPL" />
        <script async src={process.env.ADOBE_EMBED_URL} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // First define the global variable for the entire data layer array
              window.adobeDataLayer = window.adobeDataLayer || [];
              // Then push in the variables required in the Initial Data Layer Definition
              window.adobeDataLayer.push({disable_page_view: true});
            `,
          }}
        />
      </Head>
      <body>
        {/* NYPL Header script and container */}
        <div id="Header-Placeholder">
          <div id="nypl-header"></div>
          <script
            src={`${process.env.NYPL_HEADER_URL}/header.min.js?containerId=nypl-header`}
            async
          />
        </div>
        <Main />
        <NextScript />
        {/* NYPL Footer script and container */}
        <script
          src={`${process.env.NYPL_HEADER_URL}/footer.min.js?containerId=nypl-footer`}
          async
        />
        <div id="nypl-footer"></div>
      </body>
    </Html>
  )
}
