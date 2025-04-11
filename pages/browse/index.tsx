import { List, Spacer, Text } from "@nypl/design-system-react-components"
import RCLink from "../../src/components/Links/RCLink/RCLink"
import { run } from "./sierraUtils"
import SubjectHeading from "../../src/models/Heading"

export default function Browse({ subjectHeadingsFromSierra }) {
  const subjectHeadings = subjectHeadingsFromSierra.map(
    (heading) => new SubjectHeading(heading)
  )
  return (
    <List type="ul">
      {subjectHeadings?.map(({ label, url, type }, i) => {
        return (
          <li key={i}>
            <RCLink href={url}>{label}</RCLink>
            <Spacer />
            <Text>{type}</Text>
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
