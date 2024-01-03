import { Link as DSLink, List } from "@nypl/design-system-react-components"

import type { BibDetail, Url, LinkedBibDetail } from "../../types/bibDetail"
import RCLink from "../RCLink/RCLink"
import { displayRtl } from "../../utils/bibDetailUtils"

const buildDetailElement = (field: BibDetail) => {
  return (
    <>
      <dt>{field.label}</dt>
      {field.value.map((val: string, i: number) => {
        const stringDirection = displayRtl(val)
        return (
          <dd dir={stringDirection} key={i}>
            {val}
          </dd>
        )
      })}
    </>
  )
}

const buildLinkedElement = (field: LinkedBibDetail) => {
  const internalOrExternal = field.link
  return (
    <>
      <dt>{field.label}</dt>
      {field.value.map((urlInfo: Url) => {
        return linkElement(urlInfo, internalOrExternal)
      })}
    </>
  )
}

const linkElement = (url: Url, linkType: string) => {
  let Link
  if (linkType === "internal") Link = RCLink
  else if (linkType === "external") Link = DSLink
  const stringDirection = displayRtl(url.urlLabel)
  return (
    <Link dir={stringDirection} href={url.url} key={url.url}>
      {url.urlLabel}
    </Link>
  )
}

interface BibDetailsProps {
  details: BibDetail[] | LinkedBibDetail[]
}
const BibDetails = ({ details }: BibDetailsProps) => {
  return (
    <List type="dl">
      {details.map((detail: BibDetail | LinkedBibDetail) => {
        if (!detail) return
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
