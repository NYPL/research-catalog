import { Flex, List, Text } from "@nypl/design-system-react-components"
import RCLink from "../Links/RCLink/RCLink"
import type { PreferredTerm, VariantSubject } from "../../types/browseTypes"

const VariantSubjectTableCell = ({ subject }: { subject: VariantSubject }) => {
  const PreferredTermLink = (prefTerm: PreferredTerm) => (
    <Text size="body2" noSpace mt="-24px">
      See:{" "}
      <RCLink href={prefTerm.url} isUnderlined={false}>
        {prefTerm.preferredTerm}
      </RCLink>{" "}
      ({prefTerm.count})
    </Text>
  )

  return (
    <Flex flexDir="column" gap="xs">
      <Text noSpace>{subject.variantTerm}</Text>
      <List
        type="ul"
        m="0"
        listItems={subject.preferredTerms.slice(0, 5).map((term) => (
          <PreferredTermLink key={term.preferredTerm} {...term} />
        ))}
      />
    </Flex>
  )
}

export default VariantSubjectTableCell
