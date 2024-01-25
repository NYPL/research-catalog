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
} from "../../types/bibDetailsTypes"
import { rtlOrLtr, isItTheLastElement } from "../../utils/bibUtils"
import type { ReactNode } from "react"

interface BibDetailsProps {
  details: BibDetail[] | LinkedBibDetail[]
  heading?: string
}

const BibDetails = ({ details, heading }: BibDetailsProps) => {
  return (
    details?.length > 0 && (
      <List
        title={heading && <Heading level="three">{heading}</Heading>}
        noStyling
        type="dl"
        className={styles.bibDetails}
        sx={{ borderBottom: "none" }}
      >
        {details.map(
          (detail: BibDetail | LinkedBibDetail | SubjectHeadingDetail) => {
            if (!detail) return
            if (detail.label === "Subjects") {
              return CompoundSubjectHeadingElement(
                detail as SubjectHeadingDetail
              )
            } else if ("link" in detail) {
              return LinkedDetailElement(detail as LinkedBibDetail)
            } else {
              return PlainTextElement(detail as BibDetail)
            }
          }
        )}
      </List>
    )
  )
}

const DetailElement = (label: string, listChildren: ReactNode[]) => {
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

const PlainTextElement = (field: BibDetail) => {
  const values = field.value.map((val: string, i: number) => {
    const stringDirection = rtlOrLtr(val)
    return (
      <li dir={stringDirection} key={`${field}-${i}`}>
        {val}
      </li>
    )
  })
  return DetailElement(field.label, values)
}

const CompoundSubjectHeadingElement = (field: SubjectHeadingDetail) => {
  const subjectHeadingLinksPerSubject = field.value.map(
    (subjectHeadingUrls: Url[]) => {
      return SingleSubjectHeadingElement(subjectHeadingUrls)
    }
  )
  const values = subjectHeadingLinksPerSubject.map((subject, i) => (
    <li key={`subject-heading-${i}`} data-testid="subjectLinksPer">
      {subject}
    </li>
  ))
  return DetailElement(field.label, values)
}

const SingleSubjectHeadingElement = (subjectHeadingUrls: Url[]) => {
  const urls = subjectHeadingUrls.reduce((linksPerSubject, url: Url, index) => {
    const divider = (
      // this span will render as > in between the divided subject heading links
      <span data-testid="divider" key={`divider-${index}`}>
        {" "}
        &gt;{" "}
      </span>
    )
    const link = LinkElement(url, "internal")
    linksPerSubject.push(link)
    if (!isItTheLastElement(index, subjectHeadingUrls)) {
      linksPerSubject.push(divider)
    }
    return linksPerSubject
  }, [] as React.JSX.Element[])
  return urls
}

const LinkedDetailElement = (field: LinkedBibDetail) => {
  const internalOrExternal = field.link
  const values = field.value.map((urlInfo: Url, i) => {
    return (
      <li key={`${field}-${i}`}>{LinkElement(urlInfo, internalOrExternal)}</li>
    )
  })
  return DetailElement(field.label, values)
}

const LinkElement = (url: Url, linkType: string) => {
  let Link
  if (linkType === "internal") Link = RCLink
  else if (linkType === "external") Link = DSLink
  const stringDirection = rtlOrLtr(url.urlLabel)
  return (
    <Link dir={stringDirection} href={url.url} key={url.url}>
      {url.urlLabel}
    </Link>
  )
}

export default BibDetails
