import Link from "../../Link/Link"

const FindingAid = ({ url }: { url: string }) => {
  return (
    <>
      {" See the "}
      <Link isExternal href={url}>
        {"finding aid"}
      </Link>
      {" for details."}
    </>
  )
}

export default FindingAid
