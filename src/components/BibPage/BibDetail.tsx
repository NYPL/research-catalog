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
  AnyBibDetail,
} from "../../types/bibDetailsTypes"
import { rtlOrLtr } from "../../utils/bibUtils"
import type { ReactNode } from "react"

interface BibDetailsProps {
  details: AnyBibDetail[]
  heading?: string
}

const BibDetails = ({ details, heading }: BibDetailsProps) => {
  console.log(details)
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
        className={`${styles.bibDetails} ${styles.inBibPage}`}
      >
        {details.map((detail: BibDetail | LinkedBibDetail) => {
          if (!detail) return
          if (detail.label === "Subject") {
            return LinkedDetailElement(detail as LinkedBibDetail)
          } else if ("link" in detail) {
            return LinkedDetailElement(detail as LinkedBibDetail)
          } else {
            return PlainTextElement(detail as BibDetail)
          }
        })}
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

const SubjectHeadingElement = (field: LinkedBibDetail) => {
  // console.log(field)
  // const values = subjectHeadingLinksPerSubject.map((subject, i) => (
  //   <li
  //     style={{ outline: "2px green solid" }}
  //     key={`subject-heading-${i}`}
  //     data-testid="subject-links-per"
  //   >
  //     {subject} - [Browse in index]
  //   </li>
  // ))
  return DetailElement(field.label, [<></>])
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
