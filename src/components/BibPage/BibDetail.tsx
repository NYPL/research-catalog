import { Link as DSLink, List } from "@nypl/design-system-react-components"

import type {
  BibDetail,
  Url,
  LinkedBibDetail,
  SubjectHeadingDetail,
} from "../../models/Bib"
import RCLink from "../RCLink/RCLink"

const isRtl = (value: string) => {
  if (!value) return "rtl"
  value.substring(0, 1) === "\u200F"
}

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

const buildSubjectHeadingElement = (field: SubjectHeadingDetail) => {
  ;[[{ url: "spaghetti", label: "something" }]]
  const links = field.value.reduce(
    (acc: JSX.Element[], subjectHeadingUrls, index) => {
      subjectHeadingUrls.forEach((url: Url) => {
        // Push a divider in between the link elements
        const divider = <span key={`divider-${index}`}> &gt; </span>
        const link = linkElement(url, "internal", true)
        acc.push(link)
        if (index < field.value.length) acc.push(divider)
      })
      return acc
    },
    [] as JSX.Element[]
  )
  // [<link><link/><span></><link><link/>]
  return (
    <>
      <dt>{field.label}</dt>
      {links}
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

const linkElement = (url: Url, link: string, x = false) => {
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
      {details.map(
        (detail: BibDetail | LinkedBibDetail | SubjectHeadingDetail) => {
          if (!detail) return
          if (detail.label === "Subjects") {
            return buildSubjectHeadingElement(detail as SubjectHeadingDetail)
          } else if ("link" in detail) {
            return buildLinkedElement(detail as LinkedBibDetail)
          } else {
            return buildDetailElement(detail as BibDetail)
          }
        }
      )}
    </List>
  )
}

export default BibDetails
