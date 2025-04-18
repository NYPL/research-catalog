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
  const initialScope = router.query.scope
    ? (router.query.scope as string)
    : "has"
  const [browseScope, setBrowseScope] = useState(initialScope)
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
          value: browseScope as string,
          name: "selectBrowseOption",
          optionsData: [
            { text: "Contains", value: "has" },
            { text: "Starts with", value: "starts_with" },
          ],
        }}
        onSubmit={() => {
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
  const [esUri, esBibIndex, esApiKey] = await kmsDecryptCreds([
    process.env.NEXT_PUBLIC_ES_URI,
    process.env.NEXT_PUBLIC_ES_INDEX,
    process.env.NEXT_PUBLIC_ES_API_KEY,
  ])
  const startsWithQuery = {
    prefix: {
      "label.keyword": { value: q, case_insensitive: true },
    },
  }
  const hasQuery = {
    match: {
      label: q,
    },
  }

  const esQuery = scope === "has" ? hasQuery : startsWithQuery
  const body = {
    size: 100,
    query: esQuery,
  }
  const esHeaders = {
    Authorization: `apiKey ${esApiKey}`,
    "Content-type": "application/json",
  }
  const subjectHeadingsFromSubjectEs = await fetch(
    esUri + "/subjects-test/_search",
    {
      method: "POST",
      headers: esHeaders,
      body: JSON.stringify(body),
    }
  )
  const subjectHeadings = await subjectHeadingsFromSubjectEs
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

  const subjectHeadingsWithCounts = await Promise.all(
    subjectHeadings.map(async (sh) => {
      const esResponse = await fetch(`${esUri}/${esBibIndex}/_count`, {
        method: "POST",
        headers: esHeaders,
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
