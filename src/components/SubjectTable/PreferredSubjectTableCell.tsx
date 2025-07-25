import { Flex, List } from "@nypl/design-system-react-components"
import RCLink from "../Links/RCLink/RCLink"
import type { PreferredSubject } from "../../types/browseTypes"

const PreferredSubjectTableCell = ({
  subject,
}: {
  subject: PreferredSubject
}) => {
  return (
    <Flex flexDir="column" gap="s">
      <RCLink isUnderlined={false} href={subject.url}>
        {subject.preferredTerm}
      </RCLink>
      <List
        type="ul"
        listItems={[
          ...(subject.broaderTerms?.length > 0
            ? [`Broader term: ${subject.broaderTerms[0]?.term}`]
            : []),
          ...(subject.narrowerTerms?.length > 0
            ? [`Narrower term: ${subject.narrowerTerms[0]?.term}`]
            : []),
        ]}
      />
    </Flex>
  )
}

export default PreferredSubjectTableCell
