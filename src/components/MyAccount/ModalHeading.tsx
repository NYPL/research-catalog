import { Heading } from "@nypl/design-system-react-components"
import styles from "../../../styles/components/MyAccount.module.scss"

// this method is a workaround because the size of the heading can't be updated
// from the css module. it's a method because the headingText prop of the modal
// props object requires ONLY a Heading component and won't accept a custom
// component to be passed in.
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
