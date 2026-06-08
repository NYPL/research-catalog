import { Flex, List, Text } from "@nypl/design-system-react-components"
import type { PreferredSubject } from "../../../types/browseTypes"
import { BASE_URL } from "../../../config/constants"
import { commaSeparatedTermLinks } from "../BrowseTable"

const PreferredSubjectTableCell = ({
  subject,
}: {
  subject: PreferredSubject
}) => {
  const relatedTerms = [
    subject.seeAlso,
    subject.broaderTerms,
    subject.narrowerTerms,
  ].filter(Boolean)

  return (
    <Flex flexDir="column" gap="xs">
      {/* Using standard link instead of CSR, to trigger back to index button */}
      <a href={`${BASE_URL}${subject.url}`}>{subject.termLabel}</a>
      {relatedTerms.length > 0 && (
        <List
          sx={{ "li::before": { color: "ui.black" } }}
          variant="ul"
          m="0"
          listItems={relatedTerms?.map(({ label, terms }) => (
            <Text size="body2" mt="-23px" key={label}>
              <span style={{ fontWeight: "bold" }}>{label}:</span>{" "}
              {commaSeparatedTermLinks(terms)}
            </Text>
          ))}
        />
      )}
    </Flex>
  )
}

export default PreferredSubjectTableCell
