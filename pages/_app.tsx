import Head from "next/head"
import Layout from "@/components/Layout/Layout"
import "@nypl/design-system-react-components/dist/styles.css"

function activePage(pathname) {
  if (pathname === "/") {
    return "search"
  } else if (/subject_headings/.test(pathname)) {
    return "shep"
  } else if (/account/.test(pathname)) {
    return "account"
  } else {
    return "search"
  }
}

function App({ Component, pageProps, router }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout activePage={activePage(router.pathname)}>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default App
