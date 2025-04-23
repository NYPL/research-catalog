import {
  Card,
  CardContent,
  CardHeading,
  Icon,
  Text,
  Link,
  Flex,
} from "@nypl/design-system-react-components"
import ExternalLink from "../Links/ExternalLink/ExternalLink"
import type { BibDetailURL } from "../../types/bibDetailsTypes"

interface FindingAidProps {
  findingAid: BibDetailURL
  hasElectronicResources: boolean
}

const FindingAid = ({
  findingAid,
  hasElectronicResources,
}: FindingAidProps) => {
  return (
    <Card
      isBordered
      mt="m"
      data-testid="collection-information"
      sx={{
        borderBottom: hasElectronicResources ? "0px" : "1px ui.gray solid",
      }}
    >
      <CardHeading level="three" size="body1" mb="xs">
        Collection information
      </CardHeading>
      <CardContent>
        <ExternalLink
          href={findingAid.url}
          type="standalone"
          fontSize={{
            base: "mobile.body.body2",
            md: "desktop.body.body2",
          }}
        >
          Finding aid
        </ExternalLink>
        <Flex justifyContent="center" gap="xxs" mt="xs">
          <Icon name="errorOutline" iconRotation="rotate180" size="medium" />
          <Text size="caption" mb="0">
            The finding aid is a document containing details about the
            organization and contents of this archival collection. Archival
            collections{" "}
            <Link
              hasVisitedState={false}
              href={"https://libguides.nypl.org/c.php?g=1184379&p=9157736"}
            >
              require an appointment
            </Link>{" "}
            to view and use on-site.
          </Text>
        </Flex>
      </CardContent>
    </Card>
  )
}

export default FindingAid
