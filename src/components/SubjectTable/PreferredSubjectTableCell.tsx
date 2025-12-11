import { Flex, List, Text } from "@nypl/design-system-react-components"
import Link from "../Link/Link"
import type { PreferredSubject, SubjectLink } from "../../types/browseTypes"
import { BASE_URL } from "../../config/constants"

const PreferredSubjectTableCell = ({
  subject,
}: {
  subject: PreferredSubject
}) => {
  const commaSeparatedSubjectLinks = (terms: SubjectLink[]) =>
    terms.map((term, i) => (
      <span key={term.url}>
        <Link href={term.url} isUnderlined={false}>
          {term.termLabel}
        </Link>
        {i < terms.length - 1 && ", "}
      </span>
    ))

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
          variant="ul"
          m="0"
          listItems={relatedTerms?.map(({ label, terms }) => (
            <Text size="body2" mt="-23px" key={label}>
              {label}: {commaSeparatedSubjectLinks(terms)}
            </Text>
          ))}
        />
      )}
    </Flex>
  )
}

export default PreferredSubjectTableCell
