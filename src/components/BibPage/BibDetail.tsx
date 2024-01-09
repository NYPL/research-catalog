import {
  Link as DSLink,
  DSProvider,
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

const buildDetailElement = (field: BibDetail) => {
  return (
    <>
      <dt>{field.label}</dt>
      <dd>
        <List data-testId={`${field.label}`} type="ol">
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
      <>
        <span data-testid="divider" key={`divider-${index}`}>
          {" "}
          &gt;{" "}
        </span>
      </>
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

const buildCompoundSubjectHeadingElement = (field: SubjectHeadingDetail) => {
  const subjectHeadingLinksPerSubject = field.value.map(
    (subjectHeadingUrls: Url[]) => {
      return buildSingleSubjectHeadingElement(subjectHeadingUrls)
    }
  )

  return (
    <>
      <dt>{field.label}</dt>
      <dd data-testid="subjectLinksPer">
        {subjectHeadingLinksPerSubject.map((subject, i) => (
          <>
            {subject}
            {!isItTheLastElement(i, subjectHeadingLinksPerSubject) && <br />}
          </>
        ))}
      </dd>
    </>
  )
}

const buildLinkedElement = (field: LinkedBibDetail) => {
  const internalOrExternal = field.link
  return (
    <>
      <dt>{field.label}</dt>
      <dd>
        {field.value.map((urlInfo: Url, i: number) => {
          return (
            <>
              {linkElement(urlInfo, internalOrExternal)}
              {!isItTheLastElement(i, field.value) && <br />}
            </>
          )
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
    <DSProvider>
      <List
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
              return buildDetailElement(detail as BibDetail)
            }
          }
        )}
      </List>
    </DSProvider>
  )
}

export default BibDetails
