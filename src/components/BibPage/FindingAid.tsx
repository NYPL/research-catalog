import {
  Card,
  CardContent,
  CardHeading,
  Icon,
  Text,
  Flex,
} from "@nypl/design-system-react-components"
import Link from "../Link/Link"

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
        <Link
          isExternal
          href={findingAidURL}
          variant="standalone"
          fontSize={{
            base: "mobile.body.body2",
            md: "desktop.body.body2",
          }}
        >
          Finding aid
        </Link>
        <Flex justifyContent="center" gap="xxs" mt="xs">
          <Icon name="errorOutline" iconRotation="rotate180" size="medium" />
          <Text size="caption" mb="0">
            The finding aid is a document containing details about the
            organization and contents of this archival collection. Archival
            collections{" "}
            <Link
              isExternal
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
