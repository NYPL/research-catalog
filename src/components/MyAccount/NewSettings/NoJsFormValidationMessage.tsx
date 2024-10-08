import { Banner } from "@nypl/design-system-react-components"

const FormValidationMessage = ({ storedQueryString }) => {
  const queryString = decodeURIComponent(storedQueryString)
  const type = queryString.split("=")[0] || ""
  const message = queryString.split("=")[1] || ""
  if (type === "success") {
    return (
      <Banner
        sx={{ paddingBottom: "24px", paddingTop: "24px" }}
        content={"Successfully updated settings."}
        type="positive"
      />
    )
  } else {
    return (
      <Banner
        sx={{ paddingBottom: "24px", paddingTop: "24px" }}
        content={message}
        type="warning"
      />
    )
  }
}

export default FormValidationMessage
