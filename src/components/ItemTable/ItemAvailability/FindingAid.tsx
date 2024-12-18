import ExternalLink from "../../Links/ExternalLink/ExternalLink"

const FindingAid = ({ url }: { url: string }) => {
  return (
    <>
      {". See the "}
      <ExternalLink href={url}>{"Finding aid"}</ExternalLink>
      {" for details"}
    </>
  )
}

export default FindingAid
