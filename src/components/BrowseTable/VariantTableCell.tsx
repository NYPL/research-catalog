import { Flex, List, Text } from "@nypl/design-system-react-components"
import type { TermLink, Variant } from "../../types/browseTypes"
import { BASE_URL } from "../../config/constants"

const VariantTableCell = ({ record }: { record: Variant }) => {
  const PreferredTermLink = (prefTerm: TermLink) => (
    <Text size="body2" mt="-23px">
      <span style={{ fontWeight: "bold" }}>See:</span>{" "}
      {/* Using standard link instead of CSR, to trigger full reload */}
      <a href={`${BASE_URL}${prefTerm.url}`}>{prefTerm.termLabel}</a>{" "}
    </Text>
  )

  return (
    <Flex flexDir="column" gap="xs">
      <Text>{record.termLabel}</Text>
      <List
        sx={{ "li::before": { color: "ui.black" } }}
        variant="ul"
        m="0"
        listItems={record.preferredTerms.slice(0, 5).map((term) => (
          <PreferredTermLink key={term.termLabel} {...term} />
        ))}
      />
    </Flex>
  )
}

export default VariantTableCell
