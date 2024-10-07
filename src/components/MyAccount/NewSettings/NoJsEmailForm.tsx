import { Button, Icon, TextInput } from "@nypl/design-system-react-components"

const NoJsEmailForm = ({ patronData }) => {
  const tempEmails = patronData?.emails || []

  return (
    <>
      <form
        action={`/research/research-catalog/api/account/settings/${patronData.id}`}
        method="POST"
        style={{ width: "100%" }}
      >
        <input type="hidden" name="_method" value="PUT" />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <h3
            style={{
              display: "flex",
              fontWeight: "500",
              flexDirection: "row",
              gap: "8px",
              alignItems: "center",
            }}
          >
            <Icon name="communicationEmail" size="medium" /> Email
          </h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingLeft: "24px",
              paddingRight: "8px",
              width: "30%",
              gap: "8px",
            }}
          >
            {tempEmails.map((email, index) => (
              <TextInput
                key={index}
                type="email"
                name={"emails"}
                defaultValue={email}
                required
                id={`email-${index}`}
                showLabel={false}
                showHelperInvalidText={false}
                labelText={"Email"}
              />
            ))}
          </div>
          <Button type="submit" sx={{ marginLeft: "32px" }} id={""}>
            Save changes
          </Button>
        </div>
      </form>
    </>
  )
}

export default NoJsEmailForm
