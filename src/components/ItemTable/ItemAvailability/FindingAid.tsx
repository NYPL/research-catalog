import RCLink from "../../Link/Link"

const FindingAid = ({ url }: { url: string }) => {
  return (
    <>
      {" See the "}
      <RCLink isExternal href={url}>
        {"finding aid"}
      </RCLink>
      {" for details."}
    </>
  )
}

export default FindingAid
