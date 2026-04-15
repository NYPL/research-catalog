import { Flex, List, Text } from "@nypl/design-system-react-components"
import type {
  PreferredContributor,
  ContributorRole,
} from "../../../types/browseTypes"
import { BASE_URL } from "../../../config/constants"
import { commaSeparatedTermLinks } from "../BrowseTable"

const PreferredContributorTableCell = ({
  contributor,
}: {
  contributor: PreferredContributor
}) => {
  const contributorRoleLink = (role: ContributorRole) => (
    <span key={role.roleLabel}>
      <a href={`${BASE_URL}${role.url}`}>{role.roleLabel}</a> ({role.count})
    </span>
  )

  const relatedTerms = [
    contributor.seeAlso,
    contributor.earlierHeadings,
    contributor.laterHeadings,
  ].filter(Boolean)

  const roleItems =
    contributor.roles
      ?.filter((role) => role.roleLabel?.trim())
      .map((role) => (
        <Text size="body2" mt="-23px" key={role.roleLabel}>
          <strong>As:</strong> {contributorRoleLink(role)}
        </Text>
      )) ?? []

  const relatedItems = relatedTerms.map(({ label, terms }) => (
    <Text size="body2" mt="-23px" key={label}>
      <strong>{label}:</strong> {commaSeparatedTermLinks(terms)}
    </Text>
  ))
  const listItems = [...roleItems, ...relatedItems]

  return (
    <Flex flexDir="column">
      {/* Using standard link instead of CSR, to trigger back to index button */}
      <a style={{ marginTop: "xs" }} href={`${BASE_URL}${contributor.url}`}>
        {contributor.termLabel}
      </a>
      {listItems.length > 0 && (
        <Flex flexDir="column" mt="xs">
          <List variant="ul" m="0" listItems={listItems} />
        </Flex>
      )}
    </Flex>
  )
}

export default PreferredContributorTableCell
