import { Heading, List } from "@nypl/design-system-react-components"
import { kebabCase } from "lodash"
import { type ReactElement } from "react"

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
            <Heading level="three" border="none">
              {heading}
            </Heading>
          )
        }
        noStyling
        type="dl"
        showRowDividers={false}
        className={styles.bibDetails + styles.inBibPage}
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
    <>
      <dt>{label}</dt>
      <dd>
        <List noStyling data-testid={kebabCase(label)} type="ol">
          {listChildren}
        </List>
      </dd>
    </>
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
  const subjectHeadingLinksPerSubject = field.value.map(
    (subjectHeadingUrls: BibDetailURL[]) => {
      return SingleSubjectHeadingElement(subjectHeadingUrls)
    }
  )
  const values = subjectHeadingLinksPerSubject.map((subject, i) => (
    <li key={`subject-heading-${i}`} data-testid="subject-links-per">
      {subject}
    </li>
  ))
  return DetailElement(field.label, values)
}

const SingleSubjectHeadingElement = (subjectHeadingUrls: BibDetailURL[]) => {
  return subjectHeadingUrls.reduce(
    (linksPerSubject, url: BibDetailURL, index) => {
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
      includeBaseUrl={true}
      textDecoration="none"
    >
      {url.urlLabel}
    </Link>
  )
}

export default BibDetails
