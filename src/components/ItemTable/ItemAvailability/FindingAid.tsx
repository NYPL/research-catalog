import Link from "../../Link/Link"

const FindingAid = ({ url }: { url: string }) => {
  return (
    <>
      {" See the "}
      <Link isExternal href={url} translate="no">
        {"finding aid"}
      </Link>
      {" for details."}
    </>
  )
}

export default FindingAid
