import { Card, CardContent, Text } from "@nypl/design-system-react-components"

import RCLink from "../RCLink/RCLink"
import type { DRBWork } from "../../types/drbTypes"
import styles from "../../../styles/components/DRB.module.scss"

interface DRBItemProps {
  drbWork: DRBWork
}

/**
 * The DRBContainer fetches and displays DRBContainer search results
 */
const DRBItem = ({ drbWork }: DRBItemProps) => {
  return (
    <Card
      key={drbWork.uuid}
      backgroundColor="var(--nypl-colors-ui-bg-default)"
      className={styles.drbContainer}
    >
      <CardContent>
        <RCLink href="/">
          <Text size="body2" noSpace>
            {drbWork.title}
          </Text>
        </RCLink>
      </CardContent>
    </Card>
  )
}

export default DRBItem
