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
      </Head>
      <body>
        {/* NYPL Header container */}
        <div id="Header-Placeholder">
          <div id="nypl-header"></div>
        </div>
        <Main />
        <NextScript />
        {/* NYPL Footer container */}
        <div id="nypl-footer"></div>
      </body>
    </Html>
  )
}
