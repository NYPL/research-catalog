import Head from "next/head"
import nyplApiClient from "@/src/server/nyplApiClient"

export default function Home() {
  return (
    <>
      <Head>
        <title>NYPL Research Catalog</title>
      </Head>
      <main>
        <h1>NYPL Research Catalog</h1>
      </main>
    </>
  )
}

export async function getServerSideProps() {
  await nyplApiClient();
  await nyplApiClient({ apiName: 'discovery' })
    .then(client => {
      return client.get(
        `/discovery/resources`
      )
    })
    .then(response => console.log({response}));
  return {
    props: {
      data: "data"
    }
  }
}