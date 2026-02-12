import { Flex, Link, List, Text } from "@nypl/design-system-react-components"
import { TermLink, Variant } from "../../types/browseTypes"

const VariantTableCell = ({ record }: { record: Variant }) => {
  const PreferredTermLink = (prefTerm: TermLink) => (
    <Text size="body2" mt="-23px">
      <span style={{ fontWeight: "bold" }}>See:</span>{" "}
      <Link href={prefTerm.url} isUnderlined={false}>
        {prefTerm.termLabel}
      </Link>{" "}
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
