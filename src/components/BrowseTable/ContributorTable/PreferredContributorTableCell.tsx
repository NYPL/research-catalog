import { Flex, List, Text } from "@nypl/design-system-react-components"
import Link from "../../Link/Link"
import type {
  TermLink,
  PreferredContributor,
  ContributorRole,
} from "../../../types/browseTypes"
import { BASE_URL } from "../../../config/constants"

export function commaSeparatedTermLinks(terms: TermLink[]) {
  return terms.map((term, i) => (
    <span key={term.url}>
      <Link href={term.url} isUnderlined={false}>
        {term.termLabel}
      </Link>
      {i < terms.length - 1 && ", "}
    </span>
  ))
}

const PreferredContributorTableCell = ({
  contributor,
}: {
  contributor: PreferredContributor
}) => {
  const contributorRoleLink = (role: ContributorRole) => (
    <span key={role.roleLabel}>
      <Link href={role.url} isUnderlined={false}>
        {role.roleLabel}
      </Link>{" "}
      ({role.count})
    </span>
  )

  const relatedTerms = [
    contributor.seeAlso,
    contributor.earlierHeadings,
    contributor.laterHeadings,
  ].filter(Boolean)

  return (
    <Flex flexDir="column" gap="xs">
      {/* Using standard link instead of CSR, to trigger back to index button */}
      <a href={`${BASE_URL}${contributor.url}`}>{contributor.termLabel}</a>
      {contributor.roles?.length > 0 && (
        <List
          variant="ul"
          m="0"
          listItems={contributor.roles.map((role) => (
            <Text size="body2" mt="-23px" key={role.roleLabel}>
              <span style={{ fontWeight: "bold" }}>As:</span>{" "}
              {contributorRoleLink(role)}
            </Text>
          ))}
        />
      )}
      {relatedTerms.length > 0 && (
        <List
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

export default PreferredContributorTableCell
