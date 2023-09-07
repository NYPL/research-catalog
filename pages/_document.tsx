import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang="en">
      <style>{`
        #Header-Placeholder {
        min-height: 62px;
      }
      @media screen and (min-width: 832px) {
        #Header-Placeholder {
          min-height: 130px;
        }
      }
      `}</style>
      <Head>
        <meta name="description" content="Research Catalog | NYPL" />
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
