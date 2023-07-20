import Head from "next/head"
import Layout from "@/components/Layout/Layout"
import "@nypl/design-system-react-components/dist/styles.css"
import { getActivePage } from "@/utils/utils"

function App({ Component, pageProps, router }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout activePage={getActivePage(router.pathname)}>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default App
