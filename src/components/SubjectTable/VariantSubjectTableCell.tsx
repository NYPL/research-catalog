import { Flex, List, Text } from "@nypl/design-system-react-components"
import RCLink from "../Links/RCLink/RCLink"
import type { SubjectLink, VariantSubject } from "../../types/browseTypes"

const VariantSubjectTableCell = ({ subject }: { subject: VariantSubject }) => {
  const PreferredTermLink = (prefTerm: SubjectLink) => (
    <Text size="body2" noSpace mt="-23px">
      See:{" "}
      <RCLink
        href={`/browse?q=${prefTerm.termLabel}&search_scope=starts_with`}
        isUnderlined={false}
      >
        {prefTerm.termLabel}
      </RCLink>{" "}
    </Text>
  )

  return (
    <Flex flexDir="column" gap="xs">
      <Text noSpace>{subject.termLabel}</Text>
      <List
        type="ul"
        m="0"
        listItems={subject.preferredTerms.slice(0, 5).map((term) => (
          <PreferredTermLink key={term.termLabel} {...term} />
        ))}
      />
    </Flex>
  )
}

export default VariantSubjectTableCell
