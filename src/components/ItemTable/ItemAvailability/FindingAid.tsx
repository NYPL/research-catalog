import Link from "../../Link/Link"

const FindingAid = ({ url }: { url: string }) => {
  return (
    <>
      {" See the\u00A0"}
      <Link isExternal href={url} translate="no">
        {"finding aid"}
      </Link>
      {"\u00A0for details."}
    </>
  )
}

export default FindingAid
