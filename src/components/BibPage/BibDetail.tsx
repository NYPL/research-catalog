import { Link as DSLink, List } from "@nypl/design-system-react-components"

import type { BibDetail, Url, LinkedBibDetail } from "../../models/Bib"

import RCLink from "../RCLink/RCLink"

const buildDetailElement = (field: BibDetail) => {
  return (
    <>
      <dt>{field.label}</dt>
      {field.value.map((val: string, i: number) => {
        return <dd key={i}>{val}</dd>
      })}
    </>
  )
}

const buildLinkedElement = (field: LinkedBibDetail) => {
  let Link
  if (field.link === "internal") Link = RCLink
  else if (field.link === "external") Link = DSLink
  return (
    <>
      <dt>{field.label}</dt>
      {field.value.map((val: Url, i: number) => {
        return (
          <Link href={val.url} key={i}>
            {val.urlLabel}
          </Link>
        )
      })}
    </>
  )
}

interface BibDetailsProps {
  details: BibDetail[] | LinkedBibDetail[]
}
const BibDetails = ({ details }: BibDetailsProps) => {
  return (
    <List type="dl">
      {details.map((detail: BibDetail | LinkedBibDetail) => {
        if ("link" in detail) {
          return buildLinkedElement(detail as LinkedBibDetail)
        } else {
          return buildDetailElement(detail as BibDetail)
        }
      })}
    </List>
  )
}

export default BibDetails
