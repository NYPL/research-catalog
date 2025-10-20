import { Heading, List } from "@nypl/design-system-react-components"
import { kebabCase } from "lodash"
import { Fragment, type ReactElement } from "react"

import styles from "../../../styles/components/BibDetails.module.scss"
import RCLink from "../Links/RCLink/RCLink"
import ExternalLink from "../Links/ExternalLink/ExternalLink"
import type {
  BibDetail,
  BibDetailURL,
  LinkedBibDetail,
  SubjectHeadingDetail,
  AnyBibDetail,
} from "../../types/bibDetailsTypes"
import { rtlOrLtr, isItTheLastElement } from "../../utils/bibUtils"
import type { ReactNode } from "react"

interface BibDetailsProps {
  details: AnyBibDetail[]
  heading?: string
}

const BibDetails = ({ details, heading }: BibDetailsProps) => {
  return (
    details?.length > 0 && (
      <List
        title={
          heading && (
            <Heading level="h3" size="heading4" border="none">
              {heading}
            </Heading>
          )
        }
        noStyling
        variant="dl"
        showRowDividers={false}
        className={`${styles.bibDetails} ${styles.inBibPage}`}
      >
        {details.map(
          (detail: BibDetail | LinkedBibDetail | SubjectHeadingDetail) => {
            if (!detail) return
            if (detail.label === "Subject") {
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
    <Fragment key={kebabCase(label)}>
      <dt>{label}</dt>
      <dd>
        <List noStyling data-testid={kebabCase(label)} variant="ol">
          {listChildren}
        </List>
      </dd>
    </Fragment>
  )
}

export const PlainTextElement = (field: BibDetail) => {
  const values = field?.value?.map((val: string, i: number) => {
    const stringDirection = rtlOrLtr(val)
    return (
      <li dir={stringDirection} key={`${kebabCase(field.label)}-${i}`}>
        {val}
      </li>
    )
  })
  return DetailElement(field.label, values)
}

const CompoundSubjectHeadingElement = (field: SubjectHeadingDetail) => {
  if (!field?.value?.length) return null

  // If subjects came from the annotated MARC, they won't and
  // shouldn't have associated search filter URLs
  const isLinkedData = (
    val: SubjectHeadingDetail["value"]
  ): val is BibDetailURL[][] =>
    Array.isArray(val[0]) && !!(val[0] as BibDetailURL[])[0]?.urlLabel

  if (!isLinkedData(field.value)) {
    const values = (field.value as string[]).map((val, i) => (
      <li dir={rtlOrLtr(val)} key={`${kebabCase(field.label)}-${i}`}>
        {val}
      </li>
    ))
    return DetailElement(field.label, values)
  }

  const subjectHeadingLinksPerSubject = field.value.map(
    (subjectHeadingUrls, i) => (
      <li key={`subject-heading-${i}`} data-testid="subject-links-per">
        {SingleSubjectHeadingElement(subjectHeadingUrls)}
      </li>
    )
  )

  return DetailElement(field.label, subjectHeadingLinksPerSubject)
}

const SingleSubjectHeadingElement = (subjectHeadingUrls: BibDetailURL[]) => {
  return subjectHeadingUrls.reduce(
    (linksPerSubject, url: BibDetailURL, index) => {
      const divider = (
        // this span will render as > in between the divided subject heading links
        <span data-testid="divider" key={`divider-${index}`}>
          {" -- "}
        </span>
      )
      const link = LinkElement(url, "internal")
      linksPerSubject.push(link)
      if (!isItTheLastElement(index, subjectHeadingUrls)) {
        linksPerSubject.push(divider)
      }
      return linksPerSubject
    },
    [] as ReactElement[]
  )
}

export const LinkedDetailElement = (field: LinkedBibDetail) => {
  const internalOrExternal = field.link
  const values = field.value.map((urlInfo: BibDetailURL, i) => {
    return (
      <li key={`${kebabCase(field.label)}-${i}`}>
        {LinkElement(urlInfo, internalOrExternal)}
      </li>
    )
  })
  return DetailElement(field.label, values)
}

const LinkElement = (url: BibDetailURL, linkType: string) => {
  let Link: typeof RCLink | typeof ExternalLink
  if (linkType === "internal") Link = RCLink
  else if (linkType === "external") Link = ExternalLink
  const stringDirection = rtlOrLtr(url.urlLabel)
  return (
    <Link
      dir={stringDirection}
      href={url.url}
      key={url.url}
      // external link does not include this prop
      {...(linkType === "internal" ? { includeBaseUrl: true } : {})}
      textDecoration="none"
    >
      {url.urlLabel}
    </Link>
  )
}

export default BibDetails
