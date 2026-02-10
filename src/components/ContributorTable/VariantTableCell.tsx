import { Flex, List, Text } from "@nypl/design-system-react-components"
import Link from "../Link/Link"
import type {
  SubjectLink,
  VariantContributor,
  VariantSubject,
} from "../../types/browseTypes"

const VariantTableCell = ({
  record,
}: {
  record: VariantSubject | VariantContributor
}) => {
  const PreferredTermLink = (prefTerm: SubjectLink) => (
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
