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
      bg="ui.bg.default"
      data-testid="collection-information"
      p="s"
      marginBottom="s"
      borderRadius="8px"
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
        <Flex justifyContent="center" gap="xxs" mt="xs" direction="column">
          <Flex gap="xxs" mt="xs">
            <Icon name="errorOutline" iconRotation="rotate180" size="medium" />
            <Text size="caption" mb="0">
              The finding aid is a document containing details about the
              organization and contents of this archival collection.
            </Text>
          </Flex>
          <Text size="caption" mb="0" ml="24px">
            Archival collections{" "}
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
