import { Flex, List, Text } from "@nypl/design-system-react-components"
import RCLink from "../Links/RCLink/RCLink"
import type { PreferredSubject, SubjectLink } from "../../types/browseTypes"

const PreferredSubjectTableCell = ({
  subject,
}: {
  subject: PreferredSubject
}) => {
  const commaSeparatedSubjectLinks = (terms: SubjectLink[]) =>
    terms.map((term, i) => (
      <span key={term.url}>
        <RCLink
          href={`/browse?q=${term.termLabel}&search_scope=starts_with`}
          isUnderlined={false}
        >
          {term.termLabel}
        </RCLink>
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
      <RCLink isUnderlined={false} href={subject.url}>
        {subject.termLabel}
      </RCLink>
      {relatedTerms.length > 0 && (
        <List
          type="ul"
          m="0"
          listItems={relatedTerms?.map(({ label, terms }) => (
            <Text size="body2" mt="-23px" noSpace key={label}>
              {label}: {commaSeparatedSubjectLinks(terms)}
            </Text>
          ))}
        />
      )}
    </Flex>
  )
}

export default PreferredSubjectTableCell
