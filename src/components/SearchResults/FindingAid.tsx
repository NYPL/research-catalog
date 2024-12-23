import { Box, Icon, Text } from "@nypl/design-system-react-components"
import ExternalLink from "../Links/ExternalLink/ExternalLink"
import { appConfig } from "../../config/config"
import styles from "../../../styles/components/Search.module.scss"

const FindingAid = ({ url }) => {
  return (
    <Box>
      <Text
        mb="xs"
        fontSize={{ base: "mobile.body.body1", md: "desktop.body.body1" }}
        fontWeight="bold"
      >
        Collection information
      </Text>
      <ExternalLink
        mb="xs"
        mt="xs"
        href={url}
        rel="noreferrer"
        type="standalone"
        fontSize={{ base: "mobile.body.body2", md: "desktop.body.body2" }}
        fontWeight="bold"
        isUnderlined={false}
      >
        Finding aid
      </ExternalLink>
      <Box className={styles.searchTip}>
        <Icon size="medium" name="errorOutline" iconRotation="rotate180" />
        <Text
          fontSize={{ base: "mobile.body.body2", md: "desktop.body.body2" }}
        >
          The finding aid is a document containing details about the
          organization and contents of this archival collection. Archival
          collections{" "}
          <ExternalLink href={appConfig.requireAnAppointmentUrl}>
            require an appointment
          </ExternalLink>{" "}
          to view and use on-site.
        </Text>
      </Box>
    </Box>
  )
}

export default FindingAid
