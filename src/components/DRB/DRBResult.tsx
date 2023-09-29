import { Card, CardContent, Text } from "@nypl/design-system-react-components"

import RCLink from "../RCLink/RCLink"
import type { DRBWork } from "../../types/drbTypes"
import styles from "../../../styles/components/DRB.module.scss"

interface DRBItemProps {
  work: DRBWork
}

/**
 * The DRBContainer fetches and displays DRBContainer search results
 */
const DRBResult = ({ work }: DRBItemProps) => {
  const { title, editions } = work
  console.log(editions)

  // const editions = work.editions
  //
  // // Get authors from `authors` property (DRB v4) or `agents` property (DRB v3)
  // const authors = work.authors
  //   ? work.authors
  //   : work.agents.filter((agent) => agent.roles.includes("author"))

  return (
    <Card
      backgroundColor="var(--nypl-colors-ui-bg-default)"
      className={styles.drbContainer}
    >
      <CardContent>
        <RCLink href="/">
          <Text size="body2" noSpace>
            {title}
          </Text>
        </RCLink>
      </CardContent>
    </Card>
  )
}

export default DRBResult
