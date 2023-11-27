import Head from "next/head"
import "@nypl/design-system-react-components/dist/styles.css"

// eslint-disable-next-line @typescript-eslint/naming-convention
function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default App
