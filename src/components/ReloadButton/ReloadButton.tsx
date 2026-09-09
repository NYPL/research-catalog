import { Button } from "@nypl/design-system-react-components"

/* Button (styled as link) that reloads the page. */
const ReloadButton = () => {
  return (
    <Button
      id="reload-link"
      onClick={() => window.location.reload()}
      variant="text"
      sx={{
        display: "inline",
        fontWeight: "inherit",
        fontSize: "inherit",
        p: 0,
        height: "auto",
        minHeight: "auto",
        textDecoration: "underline",
        textDecorationStyle: "dotted",
        textDecorationThickness: "1px",
        textUnderlineOffset: "2px",
      }}
    >
      reloading the page
    </Button>
  )
}

export default ReloadButton
