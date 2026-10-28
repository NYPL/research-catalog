import {
  Flex,
  Heading,
  Table,
  Text,
} from "@nypl/design-system-react-components"
import Image from "next/image"
import RCHead from "../src/components/Head/RCHead"
import Layout from "../src/components/Layout/Layout"
import Link from "../src/components/Link/Link"
import accountError from "../src/assets/accountError.png"
import listsError from "../src/assets/listsError.png"
import holdRequestError from "../src/assets/holdRequestError.png"

// Temporary page to collect all our error paths
const appErrors = [
  {
    links: [{ href: "/testError?mode=render", label: "Rendering error" }],
    code: "200",
    description: "Rendering error, clientside navigation/server side page load",
  },
  {
    links: [
      {
        href: "/testError?mode=render&breakErrorPage=1",
        label: "Rendering error (double fault)",
      },
    ],
    code: "200",
    description:
      "Rendering error that also errors as it tries to fall back to the error page. To ensure this can always render, it must be dependency-free (no imported DS styles/components)",
  },
  {
    links: [{ href: "/testError", label: "Clientside error" }],
    code: "200",
    description: "Uncaught clientside error (after page mounts)",
  },
  {
    links: [
      {
        href: "/testError?mode=gssp",
        label: "Uncaught serverside error",
      },
    ],
    code: "500",
    description: "Data fetching in getServerSideProps error",
  },

  {
    links: [
      { href: "/this-route-does-not-exist", label: "Unmatched route 404" },
    ],
    code: "404",
    description: "Page that doesn't exist (404 internally)",
  },
]
const apiErrors = [
  {
    links: [
      {
        href: "/search?q=__FORCE_500__",
        label: 'Search results "500"',
      },
    ],
    code: "200",
    description: "General API error:  ES rejections, timeouts",
    codeDA: "500",
  },
  {
    links: [
      { href: "/bib/does-not-exist-xyz", label: 'Bib page "404"' },
      { href: "/bib/does-not-exist-xyz/marc", label: 'MARC page "404"' },
    ],
    code: "200",
    description: "Bib or MARC that we don't recognize as research or circ",
    codeDA: "404",
  },
  {
    links: [
      {
        href: "/search?q=ewlkqdmn;jnrfljewfnr",
        label: 'Search results "404"',
      },
      {
        href: "/browse?q=ewlkqdmn;jnrfljewfnr",
        label: 'Browse results "404"',
      },
    ],
    code: "200",
    description:
      "No results found for that request (totalResults = 0 from Discovery API)",
    codeDA: "200",
  },
  {
    links: [
      {
        href: "/search?q=xxxx&search_scope=cql",
        label: 'Search results "422"',
      },
    ],
    code: "200",
    description: "Invalid NYQL query syntax",
    codeDA: "422",
  },
  {
    links: [
      { href: '/search?q=unclosed quote"', label: 'Search results "400"' },
    ],
    code: "200",
    description:
      "Catch all for 4xx errors from Discovery API. Mainly seen for non-NYQL invalid query syntax, like unclosed quotes in search",
    codeDA: "400 (401, 403)",
  },
]

export default function ErrorExamples() {
  return (
    <>
      <RCHead metadataTitle={"Error examples"} />
      <Layout activePage={"404"} isAuthenticated={false}>
        <Flex flexDir="column" marginBottom="xxl">
          <h1>
            RC errors: <b>E</b>rror <b>M</b>eaning & <b>M</b>anagement <b>A</b>
            ppendix
          </h1>
          <Heading level="h2" size="heading5" mt="m" mb="xs">
            App errors
          </Heading>
          <Text mb="s">
            Issues in the RC code: a page crashes while rendering or a route
            doesn&apos;t exist. Caught by internal error boundaries.
          </Text>
          <Table
            columnHeaders={["Link", "Description", "RC status code"]}
            border="1px solid"
            borderColor="ui.gray.medium"
            showRowDividers
            sx={{
              "th, td": {
                borderRight: "1px solid",
                borderColor: "ui.gray.medium",
                _last: { borderRight: "none" },
              },
              "tbody tr:last-child td": {
                borderBottom: "none",
              },
            }}
            columnStyles={[
              { width: "30%", minWidth: 100 },
              { width: "40%", minWidth: 100 },
              { width: "30%", minWidth: 100 },
            ]}
            tableData={appErrors.map(({ links, code, description }) => [
              <Flex
                key={links.map((l) => l.href).join(",")}
                flexDir="column"
                gap="xs"
              >
                {links.map(({ href, label }) => (
                  <Link key={href} href={href}>
                    {label}
                  </Link>
                ))}
              </Flex>,
              description,
              code,
            ])}
          />
        </Flex>
        <Heading level="h2" size="heading5" mt="m" mb="xs">
          Discovery API errors
        </Heading>
        <Text mb="s">
          Discovery API returns a non-200 status (no results, bad query,
          upstream failure). Handled as a normal 200 page showing an error
          message, not a crash.
        </Text>
        <Table
          columnHeaders={[
            "Link",
            "Description",
            "RC status code",
            "Discovery API status code",
          ]}
          border="1px solid"
          borderColor="ui.gray.medium"
          showRowDividers
          sx={{
            "th, td": {
              borderRight: "1px solid",
              borderColor: "ui.gray.medium",
              _last: { borderRight: "none" },
            },
            "tbody tr:last-child td": {
              borderBottom: "none",
            },
          }}
          columnStyles={[
            { width: "20%", minWidth: 100 },
            { width: "40%", minWidth: 100 },
            { width: "20%", minWidth: 100 },
            { width: "20%", minWidth: 100 },
          ]}
          tableData={apiErrors.map(({ links, code, description, codeDA }) => [
            <Flex
              key={links.map((l) => l.href).join(",")}
              flexDir="column"
              gap="xs"
            >
              {links.map(({ href, label }) => (
                <Link key={href} href={href}>
                  {label}
                </Link>
              ))}
            </Flex>,
            description,
            code,
            codeDA,
          ])}
        />
        <Heading level="h2" size="heading5" mt="xl" mb="xs">
          Account errors
        </Heading>
        <Text mb="s">
          Lists, hold requests (Platform API), and Sierra API errors display as
          error banners within the page. Some examples (not comprehensive):
        </Text>
        <Flex flexDir="row" gap="m" mt="s" mb="m">
          <Image src={accountError} alt="Account data error" width={650} />
          <Image src={holdRequestError} alt="Hold request error" width={500} />
        </Flex>
        <Image src={listsError} alt="List loading error" width={400} />
      </Layout>
    </>
  )
}

export async function getServerSideProps() {
  if (
    process.env.VERCEL_ENV ||
    process.env.NEXT_PUBLIC_APP_ENV != "development"
  ) {
    return { notFound: true }
  }
  return { props: {} }
}
