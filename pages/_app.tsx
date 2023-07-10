import Head from "next/head"
import Script from "next/script";
import styles from "../styles/components/App.module.scss"

function App({Component, pageProps}) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Head>
      {/* NYPL Header script and container */}
      <Script strategy="lazyOnload"
              src={`${process.env.NEXT_PUBLIC_NYPL_HEADER_URL}/header.min.js?containerId=nypl-header`}/>
      <div id="nypl-header" className={styles.nyplHeader}></div>

      <div className={styles.appContainer}>
        <Component {...pageProps} />
      </div>

      {/* NYPL Footer script and container */}
      <Script strategy="lazyOnload"
              src={`${process.env.NEXT_PUBLIC_NYPL_HEADER_URL}/footer.min.js?containerId=nypl-footer`}/>
      <div id="nypl-footer"></div>
    </>
  )
}

export default App
