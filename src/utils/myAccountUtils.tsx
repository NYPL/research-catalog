import { Link, Text } from "@nypl/design-system-react-components"

export function getTitle(checkout) {
  const href = checkout.isResearch
    ? `https://nypl.org/research/research-catalog/bib/b${checkout.bibId}`
    : `https://nypl.na2.iiivega.com/search/card?recordId=${checkout.bibId}`
  return checkout.isNyplOwned ? (
    <Link href={href}>{checkout.title}</Link>
  ) : (
    <Text>{checkout.title}</Text>
  )
}
