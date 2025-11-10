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

interface FindingAidProps {
  findingAidURL: string
  hasElectronicResources: boolean
}

const FindingAid = ({
  findingAidURL,
  hasElectronicResources,
}: FindingAidProps) => {
  return (
    <Card
      isBordered
      data-testid="collection-information"
      sx={{
        borderBottom: hasElectronicResources ? "0px" : "1px ui.gray solid",
      }}
      marginBottom="s"
    >
      <CardHeading level="four" size="body1" mb="xs">
        Collection information
      </CardHeading>
      <CardContent>
        <ExternalLink
          href={findingAidURL}
          variant="standalone"
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
              href={
                "https://libguides.nypl.org/special-collections-account-tutorial"
              }
            >
              may require an appointment
            </Link>{" "}
            to view and use onsite.
          </Text>
        </Flex>
      </CardContent>
    </Card>
  )
}

export default FindingAid
