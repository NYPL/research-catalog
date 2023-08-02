import "@nypl/design-system-react-components/dist/styles.css"
import Head from "next/head"
import Layout from "../src/components/Layout/Layout"
import { getActivePage } from "../src/utils/appUtils"

function App({ Component, pageProps, router }) {
  const activePage = getActivePage(router.pathname)
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout activePage={activePage}>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default App
