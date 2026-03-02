import { Icon } from "@nypl/design-system-react-components"
import type { IconNames } from "@nypl/design-system-react-components"

import styles from "../../../styles/components/MyAccount.module.scss"

export interface IconListElementPropType {
  icon: IconNames
  term: string
  description: string | JSX.Element
}

// This component is designed to centralize common styling patterns for a
// description type List with icons
export const IconListElement = ({
  icon,
  term,
  description,
}: IconListElementPropType) => {
  return (
    <>
      <dt className={styles.iconDt}>
        {icon && <Icon size="large" name={icon} />}
        {term}
      </dt>
      <dd data-testid={term} className={styles.iconDd}>
        {description}
      </dd>
    </>
  )
}

export const buildListElementsWithIcons = ({
  icon,
  term,
  description,
}: IconListElementPropType) => (
  <IconListElement
    key={term}
    term={term}
    icon={icon}
    description={description}
  />
)

export default IconListElement
