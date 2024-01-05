import { Link as DSLink, List } from "@nypl/design-system-react-components"

import RCLink from "../RCLink/RCLink"

import type {
  BibDetail,
  Url,
  LinkedBibDetail,
  SubjectHeadingDetail,
} from "../../types/bibDetail"
import { displayRtl } from "../../utils/bibDetailUtils"

const buildDetailElement = (field: BibDetail) => {
  return (
    <>
      <dt>{field.label}</dt>
      <dd>
        <List data-testId={`${field.label}`} type="ol" noStyling>
          {field.value.map((val: string, i: number) => {
            const stringDirection = displayRtl(val)
            return (
              <li dir={stringDirection} key={i}>
                {val}
              </li>
            )
          })}
        </List>
      </dd>
    </>
  )
}

const buildSingleSubjectHeadingElement = (subjectHeadingUrls: Url[]) => {
  const urls = subjectHeadingUrls.reduce((linksPerSubject, url: Url, index) => {
    // Push a divider in between the link elements
    const divider = (
      <span data-testid="divider" key={`divider-${index}`}>
        {" "}
        &gt;{" "}
      </span>
    )
    const link = linkElement(url, "internal")
    linksPerSubject.push(link)
    if (index < subjectHeadingUrls.length - 1) linksPerSubject.push(divider)
    return linksPerSubject
  }, [] as React.JSX.Element[])
  return urls
}

const buildCompoundSubjectHeadingElement = (field: SubjectHeadingDetail) => {
  const subjectHeadingLinksPerSubject = field.value.map(
    (subjectHeadingUrls: Url[]) => {
      return buildSingleSubjectHeadingElement(subjectHeadingUrls)
    }
  )
  return (
    <>
      <dt>{field.label}</dt>
      {subjectHeadingLinksPerSubject.map((subject, i) => (
        <dd data-testid="subjectLinksPer" key={"subject-" + i}>
          {subject}
        </dd>
      ))}
    </>
  )
}

const buildLinkedElement = (field: LinkedBibDetail) => {
  const internalOrExternal = field.link
  return (
    <>
      <dt>{field.label}</dt>
      <dd>
        {field.value.map((urlInfo: Url) => {
          return linkElement(urlInfo, internalOrExternal)
        })}
      </dd>
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
      {details.map(
        (detail: BibDetail | LinkedBibDetail | SubjectHeadingDetail) => {
          if (!detail) return
          if (detail.label === "Subjects") {
            return buildCompoundSubjectHeadingElement(
              detail as SubjectHeadingDetail
            )
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
