import {
  Link as DSLink,
  Heading,
  List,
} from "@nypl/design-system-react-components"
import styles from "../../../styles/components/BibDetails.module.scss"
import RCLink from "../RCLink/RCLink"
import type {
  BibDetail,
  Url,
  LinkedBibDetail,
  SubjectHeadingDetail,
} from "../../types/bibTypes"
import { displayRtl, isItTheLastElement } from "../../utils/bibDetailUtils"
import { ReactNode } from "react"

interface BibDetailsProps {
  details: BibDetail[] | LinkedBibDetail[]
  heading?: string
}

const BibDetails = ({ details, heading }: BibDetailsProps) => {
  return (
    details?.length > 0 && (
      <>
        {heading && <Heading level="three">{heading}</Heading>}
        <List
          noStyling
          type="dl"
          className={styles.bibDetails}
          sx={{ borderBottom: "none" }}
        >
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
                return buildNoLinkElement(detail as BibDetail)
              }
            }
          )}
        </List>
      </>
    )
  )
}

const buildDetailElement = (label: string, listChildren: ReactNode[]) => {
  return (
    <>
      <dt>{label}</dt>
      <dd>
        <List noStyling data-testId={label} type="ol">
          {listChildren}
        </List>
      </dd>
    </>
  )
}

const buildNoLinkElement = (field: BibDetail) => {
  const values = field.value.map((val: string, i: number) => {
    const stringDirection = displayRtl(val)
    return (
      <li dir={stringDirection} key={i}>
        {val}
      </li>
    )
  })
  return buildDetailElement(field.label, values)
}

const buildCompoundSubjectHeadingElement = (field: SubjectHeadingDetail) => {
  const subjectHeadingLinksPerSubject = field.value.map(
    (subjectHeadingUrls: Url[]) => {
      return buildSingleSubjectHeadingElement(subjectHeadingUrls)
    }
  )
  const values = subjectHeadingLinksPerSubject.map((subject, i) => (
    <li key={`subject-heading-${i}`} data-testid="subjectLinksPer">
      {subject}
    </li>
  ))
  return buildDetailElement(field.label, values)
}

const buildSingleSubjectHeadingElement = (subjectHeadingUrls: Url[]) => {
  const urls = subjectHeadingUrls.reduce((linksPerSubject, url: Url, index) => {
    const divider = (
      <span data-testid="divider" key={`divider-${index}`}>
        {" "}
        &gt;{" "}
      </span>
    )
    const link = linkElement(url, "internal")
    linksPerSubject.push(link)
    if (!isItTheLastElement(index, subjectHeadingUrls)) {
      linksPerSubject.push(divider)
    }
    return linksPerSubject
  }, [] as React.JSX.Element[])
  return urls
}

const buildLinkedElement = (field: LinkedBibDetail) => {
  const internalOrExternal = field.link
  const values = field.value.map((urlInfo: Url, i) => {
    return <li key={i}>{linkElement(urlInfo, internalOrExternal)}</li>
  })
  return buildDetailElement(field.label, values)
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

export default BibDetails
