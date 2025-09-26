import { Flex, List, Text } from "@nypl/design-system-react-components"
import RCLink from "../Links/RCLink/RCLink"
import type { SubjectLink, VariantSubject } from "../../types/browseTypes"

const VariantSubjectTableCell = ({ subject }: { subject: VariantSubject }) => {
  const PreferredTermLink = (prefTerm: SubjectLink) => (
    <Text size="body2" mt="-23px">
      See:{" "}
      <RCLink href={prefTerm.url} isUnderlined={false}>
        {prefTerm.termLabel}
      </RCLink>{" "}
      ({prefTerm.count})
    </Text>
  )

  return (
    <Flex flexDir="column" gap="xs">
      <Text>{subject.termLabel}</Text>
      <List
        variant="ul"
        m="0"
        listItems={subject.preferredTerms.slice(0, 5).map((term) => (
          <PreferredTermLink key={term.termLabel} {...term} />
        ))}
      />
    </Flex>
  )
}

export default VariantSubjectTableCell
