import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang="en">
      <style>{`
        #nypl-header {
          min-height: 70px;
         }
        @media screen and (min-width: 1024px) {
          #nypl-header {
            min-height: 230px;
          }
        }
      `}</style>
      <Head>
        <meta name="description" content="Research Catalog | NYPL" />
      </Head>
      <body>
        {/* NYPL Header script and container */}
        <script
          src={`${process.env.NYPL_HEADER_URL}/header.min.js?containerId=nypl-header`}
          async
        />
        <div id="nypl-header"></div>
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
