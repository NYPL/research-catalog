import {
  Flex,
  List,
  SearchBar,
  Table,
  Text,
} from "@nypl/design-system-react-components"
import RCLink from "../../src/components/Links/RCLink/RCLink"
import { run } from "../../src/utils/sierraUtils"
import Heading from "../../src/models/Headings/Heading"
import type AuthorityVarfield from "../../src/models/Headings/AuthorityVarfield"
import { kmsDecryptCreds } from "../../src/server/kms"
import Layout from "../../src/components/Layout/Layout"
import { SyntheticEvent, useState } from "react"
import { useRouter } from "next/router"

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
    (url ? <RCLink href={url}>{label}</RCLink> : <Text>label</Text>)
    // <Text>{` (${type})}`}</Text>
    // </Flex>
    // </li>
  )
}

export default function Browse({ subjectHeadingsWithCounts }) {
  const subjectHeadings = subjectHeadingsWithCounts.map(
    (heading) => new Heading(heading)
  )
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
  const router = useRouter()
  const [browseScope, setBrowseScope] = useState("has")
  const columnHeaders = ["Subject", "Count", "See also", "Broader terms"]
  const [query, setQuery] = useState(router.query.q)
  return (
    <Layout>
      <SearchBar
        id="subject-browse-search-input"
        labelText="Subject browse search input"
        selectProps={{
          onChange: (e) => {
            setBrowseScope(e.target.value)
          },
          value: browseScope,
          name: "selectBrowseOption",
          optionsData: [
            { text: "Contains", value: "has" },
            { text: "Starts with", value: "starts_with" },
          ],
        }}
        onSubmit={(e: SyntheticEvent) => {
          router.push(`/browse?scope=${browseScope}&q=${query}`)
        }}
        textInputProps={{
          labelText: "searchinput",
          onChange: (e: SyntheticEvent) => {
            setQuery(e.target.value)
          },
          value: query,
          name: "q",
        }}
      />
      <Table
        showRowDividers
        useRowHeaders
        columnHeaders={columnHeaders}
        tableData={tableData}
      />
    </Layout>
  )
}

export async function getServerSideProps({ query }) {
  const { q, scope } = query
  const subjectHeadingsFromSierra = await run({
    query: q,
    operator: scope || "has",
  })
  const [esUri, esIndex, esApiKey] = await kmsDecryptCreds([
    process.env.NEXT_PUBLIC_ES_URI,
    process.env.NEXT_PUBLIC_ES_INDEX,
    process.env.NEXT_PUBLIC_ES_API_KEY,
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
