import ExternalLink from "../../Links/ExternalLink/ExternalLink"

const FindingAid = ({ url }: { url: string }) => {
  return (
    <>
      {" See the "}
      <ExternalLink href={url}>{"finding aid"}</ExternalLink>
      {" for details."}
    </>
  )
}

export default FindingAid
