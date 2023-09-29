import { Card, CardContent, Text } from "@nypl/design-system-react-components"

import RCLink from "../RCLink/RCLink"
import type DRBResult from "../../models/DRBResult"
import styles from "../../../styles/components/DRB.module.scss"

interface DRBCardProps {
  drbResult: DRBResult
}

/**
 * The DRBContainer fetches and displays DRBContainer search results
 */
const DRBCard = ({ drbResult }: DRBCardProps) => {
  return (
    <Card
      backgroundColor="var(--nypl-colors-ui-bg-default)"
      className={styles.drbContainer}
    >
      <CardContent>
        <RCLink href={drbResult.urlWithSourceParam}>
          <Text size="body2" noSpace>
            {drbResult.title}
          </Text>
        </RCLink>
      </CardContent>
    </Card>
  )
}

export default DRBCard
