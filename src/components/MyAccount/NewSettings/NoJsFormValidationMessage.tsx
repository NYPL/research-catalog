import { Banner } from "@nypl/design-system-react-components"

const FormValidationMessage = ({ storedQueryString }) => {
  const queryString = decodeURIComponent(storedQueryString)
  const type = queryString.split("=")[0] || ""
  const message = queryString.split("=")[1] || ""
  return (
    <Banner
      sx={{ paddingBottom: "16px", paddingTop: "16px", marginBottom: "16px" }}
      content={type === "success" ? "Your changes were saved." : message}
      type={type === "success" ? "positive" : "warning"}
    />
  )
}

export default FormValidationMessage
