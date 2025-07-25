import { Box, Flex, List, Text } from "@nypl/design-system-react-components"
import RCLink from "../Links/RCLink/RCLink"
import type { VariantSubject } from "../../types/browseTypes"

const VariantSubjectTableCell = ({ subject }: { subject: VariantSubject }) => {
  return (
    <Flex flexDir="column" gap="s">
      <Text>{subject.variantTerm}</Text>
      <List
        type="ul"
        listItems={[
          ...(subject.preferredTerms.length > 0
            ? [`See: ${subject.preferredTerms[0]?.preferredTerm}`]
            : []),
        ]}
      />
    </Flex>
  )
}

export default VariantSubjectTableCell
