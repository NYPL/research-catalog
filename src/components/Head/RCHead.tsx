import { appConfig } from "../../config/appConfig"
import Head from "next/head"

export default function RCHead({ metadataTitle }) {
  return (
    <Head>
      {appConfig.environment !== "production" && (
        <meta name="robots" content="noindex"></meta>
      )}
      <meta property="og:title" content={metadataTitle} key="og-title" />
      <meta
        property="og:site_name"
        content={metadataTitle}
        key="og-site-name"
      />
      <meta name="twitter:title" content={metadataTitle} key="tw-title" />
      <title key="main-title">{metadataTitle}</title>
    </Head>
  )
}
