import { Flex, List, Text } from "@nypl/design-system-react-components"
import RCLink from "../../src/components/Links/RCLink/RCLink"
import { run } from "./sierraUtils"
import Heading from "../../src/models/Headings/Heading"
import type AuthorityVarfield from "../../src/models/Headings/AuthorityVarfield"

function HeadingDisplay({
  url = null,
  label,
  type,
  display,
}: AuthorityVarfield) {
  return (
    display && (
      <li>
        <Flex flexDirection="row" alignItems="center">
          {url ? <RCLink href={url}>{label}</RCLink> : label}
          <Text>{"(" + type + ")"}</Text>
        </Flex>
      </li>
    )
  )
}

export default function Browse({ subjectHeadingsFromSierra }) {
  const subjectHeadings = subjectHeadingsFromSierra.map(
    (heading) => new Heading(heading)
  )
  return (
    <List type="ul">
      {subjectHeadings.map(({ primary, fiveHundreds, fourHundreds }, i) => {
        return (
          <li key={i}>
            <HeadingDisplay {...primary} />
            <Flex>
              {"See also 5xx fields (Links to browse search)"}
              <List type="ul">
                {fiveHundreds.map((field, i) => {
                  return <HeadingDisplay {...field} key={i} />
                })}
              </List>
            </Flex>
            <Flex>
              {
                "See 4xx fields (unauthorized but recognized variants in spelling, etc)"
              }
              <List type="ul">
                {fourHundreds.map((field, i) => {
                  return (
                    <HeadingDisplay
                      label={field.label}
                      type={field.type}
                      key={i}
                    />
                  )
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
