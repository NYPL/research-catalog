import { Icon } from "@nypl/design-system-react-components"
import type { IconNames } from "@nypl/design-system-react-components"

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
  return (
    <>
      <dt>
        <Icon size="large" name={icon} title={`account profile ${term} icon`} />
        {term}
      </dt>
      <dd>{description}</dd>
    </>
  )
}

export default IconListElement
