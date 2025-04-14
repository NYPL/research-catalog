import { Flex, List, Table, Text } from "@nypl/design-system-react-components"
import RCLink from "../../src/components/Links/RCLink/RCLink"
import { run } from "../../src/utils/sierraUtils"
import Heading from "../../src/models/Headings/Heading"
import type AuthorityVarfield from "../../src/models/Headings/AuthorityVarfield"
import { kmsDecryptCreds } from "../../src/server/kms"
import Layout from "../../src/components/Layout/Layout"

function HeadingDisplay({
  url = null,
  label,
  // type,
  display,
}: // count,
{
  url: string
  label: string
  display: boolean
}) {
  return (
    display &&
    // <li>
    // <Flex flexDirection="row" alignItems="center">
    (url ? <RCLink href={url}>{label}</RCLink> : label)
    // <Text>{` (${type})}`}</Text>
    // </Flex>
    // </li>
  )
}

export default function Browse({ subjectHeadingsWithCounts }) {
  const subjectHeadings = subjectHeadingsWithCounts.map(
    (heading) => new Heading(heading)
  )
  console.log(subjectHeadings)
  const tableData = subjectHeadings.map((heading: Heading) => {
    return [
      <HeadingDisplay key={heading.primary.label} {...heading.primary} />,
      heading.count,
      heading.seeAlso.map((h, i) => (
        <List key={i} type="ul">
          <HeadingDisplay {...h} />
        </List>
      )),
      heading.broaderTerms.map((h, i) => (
        <List key={i} type="ul">
          <HeadingDisplay {...h} />
        </List>
      )),
    ]
  })
  const columnHeaders = ["Subject", "Count", "See also", "Broader terms"]
  return (
    <Layout>
      <Table columnHeaders={columnHeaders} tableData={tableData} />
    </Layout>
  )
}

export async function getServerSideProps({ query }) {
  const { q } = query
  const subjectHeadingsFromSierra = await run({ query: q, operator: "has" })
  const [esUri, esIndex, esApiKey] = await kmsDecryptCreds([
    process.env.ES_URI,
    process.env.ES_INDEX,
    process.env.ES_API_KEY,
  ])

  const subjectHeadingsWithCounts = await Promise.all(
    subjectHeadingsFromSierra.map(async (sh) => {
      const esResponse = await fetch(`${esUri}/${esIndex}/_count`, {
        method: "POST",
        headers: {
          Authorization: `apiKey ${esApiKey}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          query: {
            bool: {
              filter: [
                {
                  term: {
                    subjectLiteral_exploded: new Heading(
                      sh
                    ).primary.getSubjectLiteral(),
                  },
                },
              ],
            },
          },
        }),
      })
      const count = await esResponse.json().then((json) => json.count)
      return { ...sh, count }
    })
  )
  return {
    props: {
      subjectHeadingsWithCounts,
    },
  }
}
