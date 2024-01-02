import { Link as DSLink, List } from "@nypl/design-system-react-components"

import type { BibDetail, Url, LinkedBibDetail } from "../../models/Bib"
import RCLink from "../RCLink/RCLink"

const isRtl = (value: string) => value.substring(0, 1) === "\u200F"

const displayRtl = (value: string) => {
  return isRtl(value) ? "rtl" : "ltr"
}

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
  return (
    <>
      <dt>{field.label}</dt>
      {field.value.map((urlInfo: Url) => {
        return linkElement(urlInfo, field.link)
      })}
    </>
  )
}

const linkElement = (url: Url, link: string) => {
  let Link
  if (link === "internal") Link = RCLink
  else if (link === "external") Link = DSLink
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
