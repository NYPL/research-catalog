import { Box, Banner } from "@nypl/design-system-react-components"

interface RCBannerProps {
  heading?: string | JSX.Element
  content: string | JSX.Element
  type?: "neutral" | "informative"
}

const RCBanner = ({ content, heading, type = "neutral" }: RCBannerProps) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Banner
        sx={{ maxWidth: "1248px", margin: "2em 2em .5em 2em" }}
        heading={heading}
        content={content}
        type={type}
      />
    </Box>
  )
}

export default RCBanner
