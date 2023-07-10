import {Html, Head, Main, NextScript} from "next/document"
import Script from "next/script";

export default function Document() {
  return (

    <Html lang="en">
      <style>{`
        #Header-Placeholder {
          min-height: 70px;
         }
        @media screen and (min-width: 1024px) {
          #Header-Placeholder {
            min-height: 230px;
          }
        }
      `}</style>
      <Head>
        <meta name="description" content="NYPL Research Catalog"/>
      </Head>
      <body>
      {/* NYPL Header script and container */}
      <Script strategy="lazyOnload"
              src={`${process.env.NEXT_PUBLIC_NYPL_HEADER_URL}/header.min.js?containerId=nypl-header`}/>
      <div id="nypl-header" ></div>
      <Main/>
      <NextScript/>
      {/* NYPL Footer script and container */}
      <Script strategy="lazyOnload"
              src={`${process.env.NEXT_PUBLIC_NYPL_HEADER_URL}/footer.min.js?containerId=nypl-footer`}/>
      <div id="nypl-footer"></div>
      </body>
    </Html>
  )
}
