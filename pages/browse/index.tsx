import {
  List,
  SearchBar,
  Table,
  Text,
} from "@nypl/design-system-react-components"
import RCLink from "../../src/components/Links/RCLink/RCLink"
import Heading from "../../src/models/Headings/Heading"
import { kmsDecryptCreds } from "../../src/server/kms"
import Layout from "../../src/components/Layout/Layout"
import type { SyntheticEvent } from "react"
import { useState } from "react"
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
    display && (url ? <RCLink href={url}>{label}</RCLink> : <Text>label</Text>)
  )
}

export default function Browse({ subjectHeadingsWithCounts }) {
  const router = useRouter()
  const [browseScope, setBrowseScope] = useState(
    router.query.scope ? router.query.scope : "has"
  )
  let subjectHeadings = subjectHeadingsWithCounts.map(
    (heading) => new Heading(heading)
  )
  if (browseScope === "has") {
    subjectHeadings = subjectHeadings.sort((a, b) => {
      if (a.primary.label < b.primary.label) {
        return -1
      }
      if (a.primary.label > b.primary.label) {
        return 1
      }
      return 0
    })
  }

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
  const [query, setQuery] = useState(router.query.q)
  return (
    <Layout>
      <SearchBar
        id="subject-browse-search-input"
        labelText="Subject browse search input"
        selectProps={{
          onChange: (e: SyntheticEvent) => {
            setBrowseScope((e.target as HTMLInputElement).value)
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
            setQuery((e.target as HTMLInputElement).value)
          },
          value: query as string,
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
  // const operator = scope ? scope : "has"
  // let subjectHeadings = await run({
  //   query: q,
  //   operator,
  // })
  // if (subjectHeadings.length === 0) {
  const path = "/subjects/_search"

  const body = {
    size: 100,
    query: {
      match: {
        normalizedLabel: q,
      },
    },
  }
  const headers = {
    "Content-type": "application/json",
    Authorization:
      "apiKey cWRjaFA1WUJYX1R2bzVmRExUd2k6STR5Wl85b1F5NTRPYkZiN01VVDlDZw==",
  }
  const subjectHeadingsFromLocalEs = await fetch(
    "http://localhost:9200" + path,
    {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    }
  )
  const subjectHeadings = await subjectHeadingsFromLocalEs
    .json()
    .then((esResults) => {
      return esResults.hits.hits.map(({ _source: result }) => {
        try {
          return {
            varFields: [result.primaryMarc, ...result.fiveHundredsMarc],
          }
        } catch (e) {
          console.log("caught", result)
        }
      })
    })
  // }
  const [esUri, esIndex, esApiKey] = await kmsDecryptCreds([
    process.env.NEXT_PUBLIC_ES_URI,
    process.env.NEXT_PUBLIC_ES_INDEX,
    process.env.NEXT_PUBLIC_ES_API_KEY,
  ])
  const subjectHeadingsWithCounts = await Promise.all(
    subjectHeadings.map(async (sh) => {
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
