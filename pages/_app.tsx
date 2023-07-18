import Head from "next/head"
import Layout from "@/components/Layout/Layout"

function App({ Component, pageProps, router }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout showSearch={router.pathname === "/"}>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default App
