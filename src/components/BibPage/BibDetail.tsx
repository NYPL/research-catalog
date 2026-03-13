import { Heading, List } from "@nypl/design-system-react-components"
import { kebabCase } from "lodash"
import styles from "../../../styles/components/BibDetails.module.scss"
import Link from "../Link/Link"
import type {
  BibDetail,
  BibDetailURL,
  LinkedBibDetail,
  AnyBibDetail,
} from "../../types/bibDetailsTypes"
import { rtlOrLtr } from "../../utils/bibUtils"
import { Fragment, type ReactNode } from "react"
import type { BrowseType } from "../../types/browseTypes"

interface BibDetailsProps {
  details: AnyBibDetail[]
  heading?: string
}

const BibDetails = ({ details, heading }: BibDetailsProps) =>
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
      {details.map((detail: BibDetail | LinkedBibDetail) => {
        if (!detail) return
        if ("link" in detail)
          if (
            detail.label === "Subject" ||
            detail.label === "Additional authors" ||
            detail.label === "Author"
          )
            return BrowseLinkDetailElement({
              field: detail as LinkedBibDetail,
              browseType:
                detail.label === "Subject" ? "subjects" : "contributors",
            })
          else return LinkedDetailElement(detail as LinkedBibDetail)
        return PlainTextElement(detail as BibDetail)
      })}
    </List>
  )

const DetailElement = (label: string, listChildren: ReactNode[]) => (
  <Fragment key={kebabCase(label)}>
    <dt>{label}</dt>
    <dd>
      <List noStyling data-testid={kebabCase(label)} variant="ol">
        {listChildren}
      </List>
    </dd>
  </Fragment>
)

export const PlainTextElement = ({ label, value }: BibDetail) =>
  DetailElement(
    label,
    value?.map((val, i) => (
      <li dir={rtlOrLtr(val)} key={`${kebabCase(label)}-${i}`}>
        {val}
      </li>
    ))
  )

export const LinkedDetailElement = (field: LinkedBibDetail) =>
  DetailElement(
    field.label,
    field.value.map((urlInfo, i) => (
      <li key={`${kebabCase(field.label)}-${i}`}>
        {LinkElement(urlInfo, field.link)}
      </li>
    ))
  )

export const BrowseLinkDetailElement = ({
  field,
  browseType,
}: {
  field: LinkedBibDetail
  browseType: BrowseType
}) => {
  const indexLinkLabel = `Browse in ${
    browseType === "subjects" ? "subject" : "author"
  } index`
  return DetailElement(
    field.label,
    field.value.map((urlInfo, i) => (
      <li key={`${kebabCase(field.label)}-${i}`}>
        {LinkElement(urlInfo, field.link)}
        <>
          {" - "}
          {LinkElement(
            {
              url: `/browse${browseType === "subjects" ? "" : "/authors/"}?q=${
                urlInfo.urlLabel
              }&search_scope=starts_with`,
              urlLabel: `[${indexLinkLabel}]`,
            },
            "internal",
            true,
            `${indexLinkLabel} for "${urlInfo.urlLabel}"`
          )}
        </>
      </li>
    ))
  )
}

const LinkElement = (
  url: BibDetailURL,
  linkType: "internal" | "external",
  isBold = false,
  ariaLabel?: string
) => {
  return (
    <>
      <Link
        dir={rtlOrLtr(url.urlLabel)}
        href={url.url}
        key={url.url}
        isExternal={linkType === "external"}
        fontWeight={isBold ? "700" : "400"}
        textDecoration="none"
        aria-label={ariaLabel}
      >
        {url.urlLabel}
      </Link>
      {url.text && <span>{url.text}</span>}
    </>
  )
}

export default BibDetails
