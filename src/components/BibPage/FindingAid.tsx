import {
  Box,
  CardContent,
  CardHeading,
  List,
} from "@nypl/design-system-react-components"
import ExternalLink from "../Links/ExternalLink/ExternalLink"

const FindingAid = ({ url }) => {
  return (
    <>
      <CardHeading level="three" size="body1" mb="s">
        Finding aid available
      </CardHeading>
      <CardContent>
        <ExternalLink key="spaghetti" href={url}>
          <Box
            as="span"
            display="inline-block"
            fontSize={{
              base: "mobile.body.body2",
              md: "desktop.body.body2",
            }}
          >
            Finding aid
          </Box>
        </ExternalLink>
      </CardContent>
    </>
  )
}

export default FindingAid
