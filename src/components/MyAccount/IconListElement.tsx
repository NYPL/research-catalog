import { Icon } from "@nypl/design-system-react-components"
import type { IconNames } from "@nypl/design-system-react-components"

import styles from "../../../styles/components/MyAccount.module.scss"

interface IconListElementPropType {
  icon: IconNames
  term: string
  description: string
}

const IconListElement = ({
  icon,
  term,
  description,
}: IconListElementPropType) => {
  const removeTrailingColon = (term: string) => {
    return term.replace(/:$/, "")
  }
  return (
    <>
      <dt className={styles.iconDt}>
        <Icon
          size="large"
          name={icon}
          title={`account profile ${removeTrailingColon(term)} icon`}
        />
        {term}
      </dt>
      <dd>{description}</dd>
    </>
  )
}

export const buildListElementsWithIcons = ({
  icon,
  term,
  description,
}: {
  icon: IconNames
  term: string
  description: string
}) => (
  <IconListElement
    key={term}
    term={term}
    icon={icon}
    description={description}
  />
)

export default IconListElement
