import { Flex, List, Table, Text } from "@nypl/design-system-react-components"
import RCLink from "../../src/components/Links/RCLink/RCLink"
import { run } from "../../src/utils/sierraUtils"
import Heading from "../../src/models/Headings/Heading"
import type AuthorityVarfield from "../../src/models/Headings/AuthorityVarfield"
import { kmsDecryptCreds } from "../../src/server/kms"

function HeadingDisplay({
  url = null,
  label,
  type,
  display,
  count,
}: AuthorityVarfield) {
  return (
    display && (
      // <li>
      <Flex flexDirection="row" alignItems="center">
        {url ? <RCLink href={url}>{label}</RCLink> : label}
        <Text>{` (${type}) ${count ? count : ""}`}</Text>
      </Flex>
      // </li>
    )
  )
}

export default function Browse({ subjectHeadingsWithCounts }) {
  const subjectHeadings = subjectHeadingsWithCounts.map(
    (heading) => new Heading(heading)
  )

  return (
    <List type="ul">
      {subjectHeadings.map(
        ({ primary, seeAlso, fourHundreds, broaderTerms }, i) => {
          return (
            <li key={i}>
              <HeadingDisplay {...primary} />
              {broaderTerms.filter(({ display }) => display).length > 0 && (
                <Flex>
                  {"Broader terms"}
                  {/* <List type="ul"> */}
                  {broaderTerms.map((field, i) => {
                    return <HeadingDisplay {...field} key={i} />
                  })}
                  {/* </List> */}
                </Flex>
              )}
              {seeAlso.filter(({ display }) => display).length > 0 && (
                <Flex>
                  {"See also"}
                  {/* <List type="ul"> */}
                  {seeAlso.map((field, i) => {
                    return <HeadingDisplay {...field} key={i} />
                  })}
                  {/* </List> */}
                </Flex>
              )}
              {/* {fourHundreds.filter(({ display }) => display).length > 0 && (
                <Flex>
                  {
                    "See 4xx fields (unauthorized but recognized variants in spelling, etc)"
                  }
                  <List type="ul">
                    {fourHundreds.map((field, i) => {
                      return <HeadingDisplay {...field} key={i} />
                    })}
                  </List>
                </Flex>
              )} */}
            </li>
          )
        }
      )}
    </List>
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
      console.log(count)
      return { ...sh, count }
    })
  )
  return {
    props: {
      subjectHeadingsWithCounts,
    },
  }
}
