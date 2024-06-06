import { Heading } from "@nypl/design-system-react-components"
import styles from "../../../styles/components/MyAccount.module.scss"

const modalHeading = (inner) => {
  let className = styles.modalHeading
  // most modal headings have an icon. the few that don't need extra padding to make up for the space the icon takes up.
  if (typeof inner === "string") {
    className = className + " " + styles["string-only"]
  }
  return (
    <Heading className={className} size="heading5">
      {inner}
    </Heading>
  )
}

export default modalHeading
