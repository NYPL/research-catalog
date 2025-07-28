import { Flex, List, Text } from "@nypl/design-system-react-components"
import RCLink from "../Links/RCLink/RCLink"
import type {
  PreferredSubject,
  PreferredTerm,
  SubjectLink,
} from "../../types/browseTypes"

const PreferredSubjectTableCell = ({
  subject,
}: {
  subject: PreferredSubject
}) => {
  const RelatedSubjectLink = (subject: SubjectLink) => (
    <RCLink key={subject.url} href={subject.url} isUnderlined={false}>
      {subject.term}
    </RCLink>
  )

  const renderCommaSeparatedLinks = (subjects: SubjectLink[]) => {
    return subjects.map((s, i) => (
      <span key={s.url}>
        {RelatedSubjectLink(s)}
        {i < subjects.length - 1 && ", "}
      </span>
    ))
  }

  return (
    <Flex flexDir="column" gap="xs">
      <RCLink isUnderlined={false} href={subject.url}>
        {subject.preferredTerm}
      </RCLink>
      <List
        type="ul"
        m="0"
        listItems={[
          ...(subject.seeAlso?.length
            ? [
                <Text size="body2" noSpace mt="-24px" key="seeAlso">
                  See also: {renderCommaSeparatedLinks(subject.seeAlso)}
                </Text>,
              ]
            : []),
          ...(subject.broaderTerms?.length
            ? [
                <Text size="body2" noSpace mt="-24px" key="broader">
                  Broader term:{" "}
                  {renderCommaSeparatedLinks(subject.broaderTerms)}
                </Text>,
              ]
            : []),
          ...(subject.narrowerTerms?.length
            ? [
                <Text size="body2" noSpace mt="-24px" key="narrower">
                  Narrower term:{" "}
                  {renderCommaSeparatedLinks(subject.narrowerTerms)}
                </Text>,
              ]
            : []),
        ]}
      />
    </Flex>
  )
}

export default PreferredSubjectTableCell
