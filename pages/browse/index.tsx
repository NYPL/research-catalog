import { Flex, List, Text } from "@nypl/design-system-react-components"
import RCLink from "../../src/components/Links/RCLink/RCLink"
import { run } from "./sierraUtils"
import Heading from "../../src/models/Headings/Heading"
import type AuthorityVarfield from "../../src/models/Headings/AuthorityVarfield"

function HeadingDisplay({ url, label, type }: AuthorityVarfield) {
  return (
    <li>
      <Flex flexDirection="row" alignItems="center">
        <RCLink href={url}>{label}</RCLink>
        <Text>{"(" + type + ")"}</Text>
      </Flex>
    </li>
  )
}

export default function Browse({ subjectHeadingsFromSierra }) {
  const subjectHeadings = subjectHeadingsFromSierra.map(
    (heading) => new Heading(heading)
  )
  return (
    <List type="ul">
      {subjectHeadings.map(({ primary, fiveHundreds }, i) => {
        return (
          <li key={i}>
            <HeadingDisplay {...primary} />
            <Flex>
              See also 5xx fields
              <List type="ul">
                {fiveHundreds.map((field, i) => {
                  return <HeadingDisplay {...field} key={i} />
                })}
              </List>
            </Flex>
          </li>
        )
      })}
    </List>
  )
}

export async function getServerSideProps({ query }) {
  const { q } = query
  const subjectHeadingsFromSierra = await run({ query: q, operator: "has" })
  return {
    props: {
      subjectHeadingsFromSierra,
    },
  }
}
